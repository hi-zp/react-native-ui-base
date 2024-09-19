import { forwardRef, useMemo } from 'react';
import { Text as RNText, StyleSheet, type StyleProp, type TextStyle } from 'react-native';
import type { TextProps } from './text.props';
import useThemeProps from '../../hooks/useThemeProps';
import useModifiers from '../../hooks/useModifiers';
import { Colors } from '../../style';
import { Constants } from '../../commons';

const modifiersOptions = {
  color: true,
  margins: true,
  typography: true,
  backgroundColor: true,
  flex: true
};

enum writingDirectionTypes {
  RTL = 'rtl',
  LTR = 'ltr'
}

/**
 * @description: A wrapper for Text component with extra functionality like modifiers support
 * @extends: Text
 * @extendsLink: https://reactnative.dev/docs/text
 * @modifiers: margins, color, typography
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TextScreen.tsx
 * @image: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Text/Modifiers.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Text/Transformation.png?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Text/Highlights.png?raw=true
 */
function Text(props: TextProps, ref: any) {
  const themeProps = useThemeProps(props, 'Text');

  const {
    style,
    flex: propsFlex,
    children,
    as,
    color: propsColor,
    center,
    uppercase,
    lowerCase,
    underline,
    ...others
  } = themeProps;

  const {
    typography,
    color: modifierColor,
    backgroundColor,
    margins,
    flexStyle,
  } = useModifiers(themeProps, modifiersOptions);

  const color = propsColor || modifierColor;

  const TextContainer = useMemo(() => {
    return as ?? RNText;
  }, [as]);

  const textStyle = [
    styles.container,
    typography,
    color && {color},
    backgroundColor && {backgroundColor},
    flexStyle,
    margins,
    center && styles.centered,
    uppercase && styles.uppercase,
    underline && styles.underline,
    style
  ] as StyleProp<TextStyle>;

  return (
    <TextContainer {...others} style={textStyle} ref={ref}>
      {children}
    </TextContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    color: Colors.$textDefault,
    ...(Constants.isIOS
      ? {
        writingDirection: Constants.isRTL ? writingDirectionTypes.RTL : writingDirectionTypes.LTR
      }
      : {
        textAlign: 'left'
      })
  },
  centered: {
    textAlign: 'center'
  },
  uppercase: {
    textTransform: 'uppercase'
  },
  underline: {
    textDecorationLine: 'underline'
  },
  highlight: {
    color: Colors.grey30
  },
  notHighlight: {
    color: undefined
  }
});

export default forwardRef<RNText, TextProps>(Text);