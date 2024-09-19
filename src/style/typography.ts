import type { TextStyle } from 'react-native';

import { TypographyPresets } from './typographyPresets';
import type { ExtendTypeWith } from '../typings/common';

export class Typography {
  [key: string]: any;

  keysPattern = this.generateKeysPattern();

  /**
   * Load custom set of typographies
   * arguments:
   * typographies - map of keys and typography values
   * e.g {text15: {fontSize: 58, fontWeight: '100', lineHeight: Math.floor(58 * 1.4)}}
   */
  loadTypographies(typographies: Record<string, TextStyle>) {
    Object.assign(this, typographies);
    this.keysPattern = this.generateKeysPattern();
  }

  getKeysPattern() {
    return this.keysPattern;
  }

  generateKeysPattern(): RegExp {
    return new RegExp(Object.keys(this).join('|'));
  }
}
type CustomTypographyPresets = { [custom: string]: TextStyle };
const TypedTypography = Typography as ExtendTypeWith<
  ExtendTypeWith<typeof Typography, typeof TypographyPresets>,
  CustomTypographyPresets
>;
const typography = new TypedTypography();
typography.loadTypographies(TypographyPresets);

export default typography;
