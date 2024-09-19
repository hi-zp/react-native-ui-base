import {useContext, createContext} from 'react';
import * as Modifiers from '../commons/modifiers';
import {ThemeManager, useTheme} from '../style';

const EmptyContext = createContext({});

export default function useThemeProps<T extends object>(props: T, componentName: string) {
  // Note: This adds a dependency on current color scheme and update theme props accordingly
  useTheme();
  const themeContext = ThemeManager.getThemeContext();
  const context = useContext(themeContext ?? EmptyContext);
  return Modifiers.getThemeProps(props, context, componentName);
};
