import Scheme, { type Schemes, type SchemeType } from './scheme';
import type { ExtendTypeWith } from '../typings/common';
import { colorsPalette } from './colorsPalette';
import { DesignTokens } from './designTokens';
import { DesignTokensDM } from './designTokensDM';

export type DesignToken = {
  semantic?: [string];
  resource_paths?: [string];
  toString: Function;
};
export type TokensOptions = { primaryColor: string };
export type GetColorTintOptions = { avoidReverseOnDark?: boolean };
export type GetColorByHexOptions = { validColors?: string[] };

export class Colors {
  [key: string]: any;

  constructor() {
    const colors = Object.assign(colorsPalette);
    Object.assign(this, colors);
    this.loadSchemes({ light: DesignTokens, dark: DesignTokensDM });

    Scheme.addChangeListener(() => {
      Object.assign(this, Scheme.getScheme());
    });
  }
  /**
   * Load custom set of colors
   * arguments:
   * colors - map of keys and colors values e.g {grey10: '#20303C', grey20: '#43515C'}
   */
  loadColors(colors: { [key: string]: string }) {
    Object.assign(this, colors);
  }
  /**
   * Load set of schemes for light/dark mode
   * arguments:
   * schemes - two sets of map of colors e.g {light: {screen: 'white'}, dark: {screen: 'black'}}
   */
  loadSchemes(schemes: Schemes) {
    Scheme.loadSchemes(schemes);
    Object.assign(this, Scheme.getScheme());
  }

  /**
   * Load light and dark schemes based on generated design tokens
   * @param color - palette color
   */
  loadDesignTokens(options: TokensOptions) {
    this.loadSchemes({
      light: this.generateDesignTokens(options.primaryColor),
      dark: this.generateDesignTokens(options.primaryColor, true),
    });
  }

  /**
   * Get app's current color scheme
   */
  getScheme(): 'light' | 'dark' {
    return Scheme.getSchemeType();
  }

  /**
   * Set color scheme for app
   * arguments:
   * scheme - color scheme e.g light/dark/default
   */
  setScheme(scheme: SchemeType) {
    Scheme.setScheme(scheme);
  }

  /**
   * Add alpha to hex or rgb color
   * arguments:
   * p1 - hex color / R part of RGB
   * p2 - opacity / G part of RGB
   * p3 - B part of RGB
   * p4 - opacity
   */
  rgba(p1: string, p2: number): string | undefined;
  rgba(p1: number, p2: number, p3: number, p4: number): string | undefined;
  rgba(
    p1: number | string,
    p2: number,
    p3?: number,
    p4?: number
  ): string | undefined {
    let hex;
    let opacity;
    let red;
    let green;
    let blue;

    // Handle design token PlatformColor object
    if (typeof p1 === 'object') {
      p1 = colorStringValue(p1);
    }

    if (arguments.length === 2 && typeof p1 === 'string') {
      hex = p1;
      opacity = p2;

      hex = validateHex(hex);
      red = parseInt(hex.substring(0, 2), 16);
      green = parseInt(hex.substring(2, 4), 16);
      blue = parseInt(hex.substring(4, 6), 16);
    } else if (arguments.length === 4 && typeof p1 === 'number') {
      red = validateRGB(p1);
      green = validateRGB(p2);
      blue = validateRGB(p3!);
      opacity = p4;
    } else {
      console.error('Colors.rgba fail due to invalid arguments');
      return undefined;
    }
    return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
  }

  getBackgroundKeysPattern() {
    return /^(bg-|background-)/;
  }
}

function colorStringValue(color: string | object) {
  return color?.toString();
}

function validateRGB(value: number) {
  if (isNaN(value) || value > 255 || value < 0) {
    throw new Error(
      `${value} is invalid rgb code, please use number between 0-255`
    );
  }
  return value;
}

function validateHex(value: string) {
  if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)) {
    throw new Error(`${value} is invalid hex color`);
  }
  value = value.replace('#', '');
  if (value.length === 3) {
    value = threeDigitHexToSix(value);
  }
  return value;
}

function threeDigitHexToSix(value: string) {
  return value.replace(/./g, '$&$&');
}

const TypedColors = Colors as ExtendTypeWith<typeof Colors, typeof colorsPalette & typeof DesignTokens>;
const colorObject = new TypedColors();
export default colorObject;