import { Appearance, PlatformColor } from 'react-native';
import Constants from '../commons/Constants';
import Config from '../commons/Config';

export type Schemes = {
  light: { [key: string]: string };
  dark: { [key: string]: string };
};
export type SchemeType = 'default' | 'light' | 'dark';
export type SchemeChangeListener = (schemeType?: 'light' | 'dark') => void;

class Scheme {
  private currentScheme: SchemeType = Config.appScheme;
  private schemes: Schemes = { light: {}, dark: {} };
  private changeListeners: SchemeChangeListener[] = [];

  constructor() {
    Appearance.addChangeListener(() => {
      if (this.currentScheme === 'default') {
        this.broadcastSchemeChange();
      }
    });
  }

  private broadcastSchemeChange() {
    this.changeListeners.forEach((listener) => listener(this.getSchemeType()));
  }

  /**
   * Get app's current color scheme
   */
  getSchemeType(): 'light' | 'dark' {
    const scheme =
      this.currentScheme === 'default'
        ? Appearance.getColorScheme()
        : this.currentScheme;
    return scheme ?? 'light';
  }

  /**
   * Whether the app's scheme is 'dark', i.e. is on dark mode
   */
  isDarkMode() {
    return this.getSchemeType() === 'dark';
  }

  /**
   * Set color scheme for app
   * arguments:
   * scheme - color scheme e.g light/dark/default
   */
  setScheme(scheme: SchemeType) {
    const prevSchemeType = this.getSchemeType();
    if (!['light', 'dark', 'default'].includes(scheme)) {
      throw new Error(
        `${scheme} is invalid colorScheme, please use 'light' | 'dark' | 'default'`
      );
    }
    this.currentScheme = scheme;

    if (prevSchemeType !== this.getSchemeType()) {
      this.broadcastSchemeChange();
    }
  }

  /**
   * Load set of schemes for light/dark mode
   * arguments:
   * schemes - two sets of map of colors e.g {light: {screen: 'white'}, dark: {screen: 'black'}}
   */
  loadSchemes(schemes: Schemes) {
    const lightSchemeKeys = Object.keys(schemes.light);
    const darkSchemeKeys = Object.keys(schemes.dark);

    const missingKeys = lightSchemeKeys.filter(
      (key) => !darkSchemeKeys.includes(key)
    );
    if (missingKeys.length > 0) {
      throw new Error(
        `There is a mismatch in scheme keys: ${missingKeys.join(', ')}`
      );
    }

    const platformColorsSchemes: Schemes = JSON.parse(JSON.stringify(schemes));

    for (const schemeKey in schemes) {
      const scheme = schemes[schemeKey as keyof Schemes];
      for (const colorKey in scheme) {
        Object.defineProperty(
          platformColorsSchemes[schemeKey as keyof Schemes],
          colorKey,
          {
            get: () => {
              let color: any = scheme[colorKey];
              if (Config.usePlatformColors) {
                if (Constants.isAndroid) {
                  // Remove the $ prefix cause it's not allowed in Android and add the @color prefix
                  color = PlatformColor(
                    `@color/${colorKey.replace(/^[$]/, '')}`
                  );
                } else {
                  color = PlatformColor(colorKey);
                }
                // Get the original hex string value by calling toString()
                color.toString = () => schemes[this.getSchemeType()][colorKey];
              }
              return color;
            },
          }
        );
      }
    }

    this.schemes = platformColorsSchemes;
  }

  /**
   * Retrieve scheme by current scheme type
   */
  getScheme() {
    return this.schemes[this.getSchemeType()];
  }

  /**
   * Add a change scheme event listener
   */
  addChangeListener(listener: SchemeChangeListener) {
    this.changeListeners.push(listener);
  }

  /**
   * Remove a change scheme event listener
   * arguments:
   * listener - listener reference to remove
   */
  removeChangeListener(listener: SchemeChangeListener) {
    this.changeListeners = this.changeListeners.filter(
      (changeListener) => changeListener !== listener
    );
  }
}

export default new Scheme();
