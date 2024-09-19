import type { RefObject } from 'react';
import type { Animated, Text, TextProps as RNTextProps, TextStyle } from 'react-native';
import type { ColorsModifiers, FlexModifiers, MarginModifiers, TypographyModifiers } from '../../commons';

export interface HighlightStringProps {
  /**
   * Substring to highlight
   */
  string: string;
  /**
   * Callback for when a highlighted substring is pressed
   */
  onPress?: () => void;
  /**
   * Custom highlight style for this specific highlighted substring. If not provided, the general `highlightStyle` prop style will be used
   */
  style?: TextStyle;
  testID?: string;
}

export type HighlightString = string | HighlightStringProps;

export type TextProps<
  As = Animated.AnimatedComponent<typeof Text> | typeof Text,
> = Omit<RNTextProps, 'style'> &
  TypographyModifiers &
  ColorsModifiers &
  MarginModifiers &
  FlexModifiers & {
    /**
     * color of the text
     */
    color?: string;
    /**
     * Whether to center the text (using textAlign)
     */
    center?: boolean;
    /**
     * Whether to change the text to uppercase
     */
    uppercase?: boolean;
    /**
     * Whether to add an underline
     */
    underline?: boolean;
    textAlign?: string;
    upperCase?: boolean;
    lowerCase?: boolean;
    animated?: boolean;
    as?: As;
    ref?: RefObject<Text>;
    style?:
      | RNTextProps['style']
      | Animated.WithAnimatedValue<RNTextProps['style']>;
  };
