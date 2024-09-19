import React, {
  useContext,
  useEffect,
  createContext,
  useState,
} from 'react';
import Scheme from './scheme';

interface ThemeContext {
  colorScheme: ReturnType<typeof Scheme.getSchemeType>;
}

export const ThemeContext = createContext<ThemeContext>({
  colorScheme: Scheme.getSchemeType(),
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<any> = ({ children }) => {
  const [colorScheme, setColorScheme] = useState(Scheme.getSchemeType());

  useEffect(() => {
    Scheme.addChangeListener(() => {
      setColorScheme(Scheme.getSchemeType());
    });
  }, []);

  const values: ThemeContext = { colorScheme };

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};
