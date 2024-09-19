import {StyleSheet, type TextStyle, type ViewStyle} from 'react-native';
import {Typography, Colors, DesignTokens, BorderRadiuses, Spacings, ThemeManager} from '../style';
import {BorderRadiusesLiterals} from '../style/borderRadiuses';
import { TypographyPresets } from '../style/typographyPresets';
import {SpacingLiterals} from '../style/spacings';
import {colorsPalette} from '../style/colorsPalette';
import type {Dictionary} from '../typings/common';

export const FLEX_KEY_PATTERN = /^flex(G|S)?(-\d*)?$/;
export const PADDING_KEY_PATTERN = new RegExp(`padding[LTRBHV]?-([0-9]*|${Spacings.getKeysPattern()})`);
export const MARGIN_KEY_PATTERN = new RegExp(`margin[LTRBHV]?-([0-9]*|${Spacings.getKeysPattern()})`);
export const ALIGNMENT_KEY_PATTERN = /(left|top|right|bottom|center|centerV|centerH|spread)/;
export const POSITION_KEY_PATTERN = /^abs([F|L|R|T|B|V|H])?$/;
const BACKGROUND_COLOR_KEYS_PATTERN = Colors.getBackgroundKeysPattern();
export const GAP_KEY_PATTERN = new RegExp(`gap-([0-9]*|${Spacings.getKeysPattern()})`);

export interface AlteredOptions {
  flex?: boolean;
  alignments?: boolean;
  paddings?: boolean;
  margins?: boolean;
  backgroundColor?: boolean;
  position?: boolean;
}

export interface ExtractedStyle {
  color?: string;
  typography?: TextStyle;
  backgroundColor?: string;
  borderRadius?: number;
  paddings?: Partial<Record<NativePaddingKeyType, number>>;
  margins?: Partial<Record<NativeMarginModifierKeyType, number>>;
  alignments?: ReturnType<typeof extractAlignmentsValues>;
  flexStyle?: Partial<Record<NativeFlexModifierKeyType, number>>
  positionStyle?: ViewStyle;
  gap?: number;
}

export type ModifiersOptions = {
  color?: boolean;
  typography?: boolean;
  backgroundColor?: boolean;
  borderRadius?: boolean;
  paddings?: boolean;
  margins?: boolean;
  alignments?: boolean;
  flex?: boolean;
  position?: boolean;
  gap?: boolean;
};

const PADDING_VARIATIONS = {
  padding: 'padding',
  paddingL: 'paddingLeft',
  paddingT: 'paddingTop',
  paddingR: 'paddingRight',
  paddingB: 'paddingBottom',
  paddingH: 'paddingHorizontal',
  paddingV: 'paddingVertical'
} as const;

const MARGIN_VARIATIONS = {
  margin: 'margin',
  marginL: 'marginLeft',
  marginT: 'marginTop',
  marginR: 'marginRight',
  marginB: 'marginBottom',
  marginH: 'marginHorizontal',
  marginV: 'marginVertical'
} as const;

const STYLE_KEY_CONVERTERS = {
  flex: 'flex',
  flexG: 'flexGrow',
  flexS: 'flexShrink'
} as const;

  const POSITION_CONVERSIONS = {
    F: 'Fill',
    T: 'Top',
    B: 'Bottom',
    L: 'Left',
    R: 'Right',
    H: 'Horizontal',
    V: 'Vertical'
  } as const;

export type PaddingLiterals = keyof typeof PADDING_VARIATIONS;
export type NativePaddingKeyType = (typeof PADDING_VARIATIONS)[PaddingLiterals];
export type MarginLiterals = keyof typeof MARGIN_VARIATIONS;
export type NativeMarginModifierKeyType = (typeof MARGIN_VARIATIONS)[MarginLiterals];
export type FlexLiterals = keyof typeof STYLE_KEY_CONVERTERS;
export type NativeFlexModifierKeyType = (typeof STYLE_KEY_CONVERTERS)[FlexLiterals];
export type ColorLiterals = keyof (typeof colorsPalette & typeof DesignTokens);
export type TypographyLiterals = keyof typeof TypographyPresets;
export type BorderRadiusLiterals = keyof typeof BorderRadiusesLiterals;
export type AlignmentLiterals =
  | 'row'
  | 'spread'
  | 'center'
  | 'centerH'
  | 'centerV'
  | 'left'
  | 'right'
  | 'top'
  | 'bottom';
export type PositionLiterals = 'absF' | 'absL' | 'absR' | 'absT' | 'absB' | 'absV' | 'absH';
export type GapLiterals = 'gap';

export type Modifier<T extends string> = Partial<Record<T, boolean>>;
export type CustomModifier = {[key: string]: boolean};

// TODO: migrate other modifiers to the same new structure as Margin modifier, using template literals
export type TypographyModifiers = Modifier<TypographyLiterals> | CustomModifier;
export type ColorsModifiers = Modifier<ColorLiterals> | CustomModifier;
export type BackgroundColorModifier = Modifier<`bg-${ColorLiterals}`>;
export type AlignmentModifiers = Modifier<AlignmentLiterals>;
export type PositionModifiers = Modifier<PositionLiterals>;
export type PaddingModifiers = Modifier<PaddingLiterals>;
export type MarginModifiers = Modifier<MarginLiterals>;
// TODO: This caused issue with with some typings that inherit this type
// export type MarginModifiers = Partial<{[key: `${MarginLiterals}-${number}`]: boolean}>;
export type FlexModifiers = Modifier<FlexLiterals>;
export type BorderRadiusModifiers = Modifier<BorderRadiusLiterals>;
export type GapModifiers = Modifier<GapLiterals>;

export type ContainerModifiers = AlignmentModifiers &
  PositionModifiers &
  PaddingModifiers &
  MarginModifiers &
  FlexModifiers &
  BorderRadiusModifiers &
  BackgroundColorModifier &
  GapModifiers;

export function extractAlignmentsValues(props: Dictionary<any>): ViewStyle {
  const {row, center} = props;
  const alignments: ViewStyle = row ? { flexDirection: 'row' } : {};

  const alignmentRules = row ? {
    justifyContent: ['left', 'right', 'centerH', 'spread'],
    alignItems: ['top', 'bottom', 'centerV']
  } : {
    justifyContent: ['top', 'bottom', 'centerV', 'spread'],
    alignItems: ['left', 'right', 'centerH']
  }

  for (const attr in alignmentRules) {
    const attribute = attr as keyof typeof alignmentRules;
    const positions = alignmentRules[attribute];
    for (const position of positions) {
      if (props[position]) {
        if (position === 'left' || position === 'top') {
          alignments[attribute] = 'flex-start';
        } else if (position === 'right' || position === 'bottom') {
          alignments[attribute] = 'flex-end';
        } else if (position === 'centerH' || position === 'centerV') {
          alignments[attribute] = 'center';
        } else if (position === 'spread') {
          alignments[attribute as 'justifyContent'] = 'space-between';
        }
      }
    }
  }

  if (center) {
    alignments.justifyContent = 'center';
    alignments.alignItems = 'center';
  }

  return alignments;
}

export function extractAccessibilityProps(props: Dictionary<any>) {
  const accessibilityProps = {} as Dictionary<any>;

  for (let i = 0, len = props.length; i < len; i++) {
    const [propKey, propValue] = props[i];
    if (propValue === undefined) {
      continue;
    }

    if (/.*ccessib.*/.test(propKey)) {
      accessibilityProps[propKey] = propValue;
    }
  }

  return accessibilityProps;
}

export const ANIMATION_PROPS = [
  'animation',
  'duration',
  'delay',
  'direction',
  'easing',
  'iterationCount',
  'transition',
  'onAnimationBegin',
  'onAnimationEnd',
  'useNativeDriver'
]

export function extractAnimationProps(props: Dictionary<any>) {
  const animationProps = {} as Dictionary<any>;
  ANIMATION_PROPS.forEach(prop => {
    if (props[prop]) {
      animationProps[prop] = props[prop];
    }
  });
  return animationProps;
}

export function extractModifierProps(props: Dictionary<any>): Dictionary<any> {
  const patterns = [
    FLEX_KEY_PATTERN,
    PADDING_KEY_PATTERN,
    MARGIN_KEY_PATTERN,
    ALIGNMENT_KEY_PATTERN,
    GAP_KEY_PATTERN,
    Colors.getBackgroundKeysPattern()
  ];

  const modifierProps = {} as Dictionary<any>;

  for (let i = 0, len = props.length; i < len; i++) {
    const [propKey, propValue] = props[i];
    if (propValue === undefined) {
      continue;
    }

    const isModifier = patterns.some(pattern => pattern.test(propKey));
    if (isModifier) {
      modifierProps[propKey] = propValue;
    }
  }

  return modifierProps;
}

export function extractComponentProps(component: any, props: Dictionary<any>, ignoreProps: string[] = []) {
  const componentPropTypes = component.propTypes;
  
  const componentPropKeys = Object.keys(componentPropTypes);

  const componentProps = Object.keys(props)
    .filter(key => componentPropKeys.includes(key) && !ignoreProps.includes(key))
    .reduce((acc, key) => {
      acc[key] = props[key];
      return acc;
    }, {} as Dictionary<any>);

  return componentProps;
}

export function getThemeProps<T extends object>(props: T, context: Dictionary<any>, componentDisplayName = ''): T {
  const componentName = componentDisplayName

  let themeProps;
  if (typeof ThemeManager.components[componentName] === 'function') {
    themeProps = ThemeManager.components[componentName](props, context);
  } else {
    themeProps = ThemeManager.components[componentName];
  }

  let forcedThemeProps;
  if (typeof ThemeManager.forcedThemeComponents[componentName] === 'function') {
    forcedThemeProps = ThemeManager.forcedThemeComponents[componentName](props, context);
  } else {
    forcedThemeProps = ThemeManager.forcedThemeComponents[componentName];
  }
  return {...themeProps, ...props, ...forcedThemeProps};
}

export function generateModifiersStyle(options: ModifiersOptions = {
  color: true,
  typography: true,
  backgroundColor: true,
  borderRadius: true,
  paddings: true,
  margins: true,
  alignments: true,
  flex: true,
  position: true,
  gap: false
},
props: Dictionary<any>): ExtractedStyle {
  const boundProps = props;
  const style: ExtractedStyle = {};

  for (const propKey in boundProps) {
    if (options.color) {
      const color = Colors[propKey]
      if (color) {
        style.color = color;
      }
    }

    if (options.typography) {
      if (Typography[propKey]) {
        style.typography = Object.assign({}, style.typography, Typography[propKey]);
      }
    }

    if (options.backgroundColor) {
      if (BACKGROUND_COLOR_KEYS_PATTERN.test(propKey)) {
        const key = propKey.replace(BACKGROUND_COLOR_KEYS_PATTERN, '');
        style.backgroundColor = Colors[key] as string;
      }
    }

    if (options.borderRadius) {
      if (BorderRadiuses.getKeysPattern().test(propKey)) {
        style.borderRadius = BorderRadiuses[propKey as BorderRadiusLiterals];
      }
    }

    if (options.paddings) {
      if (PADDING_KEY_PATTERN.test(propKey)) {
        const [paddingKey, paddingValue] = propKey.split('-') as [keyof typeof PADDING_VARIATIONS, string];
        const paddingVariation = PADDING_VARIATIONS[paddingKey];
        if (!isNaN(Number(paddingValue))) {
          style.paddings = {...style.paddings, [paddingVariation]: Number(paddingValue)};
        } else if (Spacings.getKeysPattern().test(paddingValue)) {
          style.paddings = {...style.paddings, [paddingVariation]: Spacings[paddingValue as keyof typeof SpacingLiterals]};
        }
      }
    }

    if (options.margins) {
      if (MARGIN_KEY_PATTERN.test(propKey)) {
        const [marginKey, marginValue] = propKey.split('-') as [keyof typeof MARGIN_VARIATIONS, string];
        const marginVariation = MARGIN_VARIATIONS[marginKey];
        if (!isNaN(Number(marginValue))) {
          style.margins = {...style.margins, [marginVariation]: Number(marginValue)};
        } else if (Spacings.getKeysPattern().test(marginValue)) {
          style.margins = {...style.margins, [marginVariation]: Spacings[marginValue as keyof typeof SpacingLiterals]};
        }
      }
    }

    if (options.flex) {
      if (FLEX_KEY_PATTERN.test(propKey)) {
        const [flexKey, flexValue] = propKey.split('-') as [keyof typeof STYLE_KEY_CONVERTERS, string];
        const convertedFlexKey = STYLE_KEY_CONVERTERS[flexKey];
        const flexValueAsNumber = isNaN(Number(flexValue)) ? 1 : Number(flexValue);

        style.flexStyle = {[convertedFlexKey]: flexValueAsNumber};
      }
    }

    if (options.position) {
      if (POSITION_KEY_PATTERN.test(propKey)) {
        const positionVariationKey = propKey.replace('abs', '') as keyof typeof POSITION_CONVERSIONS;
        if (positionVariationKey) {
          const positionVariation = POSITION_CONVERSIONS[positionVariationKey];
          const styleKey = `absolute${positionVariation}` as keyof typeof styles;
          style.positionStyle = Object.assign({}, style.positionStyle, styles[styleKey]);
        }
        style.positionStyle = Object.assign({}, style.positionStyle, styles.absolute);
      }
    }

    if (options.gap) {
      if (GAP_KEY_PATTERN.test(propKey)) {
        const [, gapValue] = propKey.split('-') as ['gap', 'string'];
        const parsedNumber = Number(gapValue);
        if (!isNaN(parsedNumber)) {
          style.gap = parsedNumber;
        } else if (Spacings.getKeysPattern().test(gapValue)) {
          style.gap = Spacings[gapValue as keyof typeof SpacingLiterals];
        }
      }   
    }
  }

  if (options.alignments) {
    style.alignments = extractAlignmentsValues(boundProps);
  }

  return style;
}

const styles = StyleSheet.create({
  absolute: {position: 'absolute'},
  absoluteFill: StyleSheet.absoluteFillObject,
  absoluteTop: {position: 'absolute', top: 0},
  absoluteBottom: {position: 'absolute', bottom: 0},
  absoluteLeft: {position: 'absolute', left: 0},
  absoluteRight: {position: 'absolute', right: 0},
  absoluteVertical: {position: 'absolute', top: 0, bottom: 0},
  absoluteHorizontal: {position: 'absolute', left: 0, right: 0}
});
