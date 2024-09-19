import { forwardRef, useEffect, useMemo } from 'react';
import { View as RNView, type StyleProp, type ViewStyle } from 'react-native';
import type { ViewProps } from './view.props';
import useThemeProps from '../../hooks/useThemeProps';
import useModifiers from '../../hooks/useModifiers';
import { useSafeState } from '../../hooks';

const modifiersOptions = {
  backgroundColor: true,
  borderRadius: true,
  paddings: true,
  margins: true,
  alignments: true,
  flex: true,
  position: true,
  gap: true
};

/**
 * @description: An enhanced View component
 * @extends: View
 * @extendsLink: https://reactnative.dev/docs/view
 * @modifiers: margins, paddings, alignments, background, borderRadius
 */
function View(props: ViewProps, ref: any) {
  const themeProps = useThemeProps(props, 'View');

  const {
    renderDelay,
    style,
    left,
    top,
    right,
    bottom,
    flex: propsFlex,
    inaccessible,
    children,
    backgroundColor: backgroundColorProps,
    as,
    ...others
  } = themeProps;

  const {
    backgroundColor: backgroundColorModifiers,
    borderRadius,
    paddings,
    margins,
    alignments,
    flexStyle,
    positionStyle,
    gap
  } = useModifiers(themeProps, modifiersOptions);

  const [ready, setReady] = useSafeState(!renderDelay);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (renderDelay) {
      timer = setTimeout(() => {
        setReady(true);
      }, renderDelay);
    }
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const ViewContainer = useMemo(() => {
    return as ?? RNView;
  }, [as]);

  const _style = useMemo(() => {
    const backgroundColor = backgroundColorProps || backgroundColorModifiers;
    return [
      backgroundColor && {
        backgroundColor
      },
      borderRadius && {
        borderRadius
      },
      gap && {
        gap
      },
      flexStyle,
      positionStyle,
      paddings,
      margins,
      alignments,
      style,
    ] as StyleProp<ViewStyle>;
  }, [
    backgroundColorProps,
    backgroundColorModifiers,
    borderRadius,
    flexStyle,
    positionStyle,
    paddings,
    margins,
    alignments,
    gap,
    style,
  ]);

  if (!ready) {
    return null;
  }

  return (
    <ViewContainer
      accessibilityElementsHidden={inaccessible}
      importantForAccessibility={inaccessible ? 'no-hide-descendants' : undefined}
      {...others}
      style={_style}
      ref={ref}
    >
      {children}
    </ViewContainer>
  );
};

export default forwardRef<RNView, ViewProps>(View);
