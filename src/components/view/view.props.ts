import type { RefObject } from 'react';
import type {
  Animated,
  View,
  ViewProps as IViewProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import type { ContainerModifiers } from '../../commons';

export type ViewProps<
  As = Animated.AnimatedComponent<typeof View> | typeof View,
> = Omit<IViewProps, 'style'> &
  ContainerModifiers & {
    /**
     * Experimental: Pass time in ms to delay render
     */
    renderDelay?: number;
    /**
     * Turn off accessibility for this view and its nested children
     */
    inaccessible?: boolean;
    /**
     * Set background color
     */
    backgroundColor?: string;
    /**
     * As component type
     */
    as?: As;
    /**
     * Custom style
     * @type ViewStyle
     * @see https://reactnative.dev/docs/view-style-props
     */
    style?: StyleProp<ViewStyle | Animated.AnimatedProps<ViewStyle>>;
    /**
     * Reference to the view
     * @type RefObject<View>
     * @example
     * const viewRef = useRef<View>(null);
     * <View ref={viewRef} />
     * viewRef.current // View component
     */
    ref?: RefObject<View>;
  };
