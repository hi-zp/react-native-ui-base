import type { TextStyle } from 'react-native';

export const TypographyPresets = {
  h1: {
    fontFamily: 'System',
    fontSize: 48,
    lineHeight: 60,
    fontWeight: 'bold',
  } as TextStyle,
  h2: {
    fontFamily: 'System',
    fontSize: 40,
    lineHeight: 48,
    fontWeight: 'bold',
  } as TextStyle,
  h3: {
    fontFamily: 'System',
    fontSize: 32,
    lineHeight: 40,
    fontWeight: 'bold',
  } as TextStyle,
  h4: {
    fontFamily: 'System',
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
  } as TextStyle,
  h5: {
    fontFamily: 'System',
    fontSize: 20,
    lineHeight: 28,
    fontWeight: 'bold',
  } as TextStyle,
  h6: {
    fontFamily: 'System',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
  } as TextStyle,
  regular: {
    fontFamily: 'System',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  } as TextStyle,
  small: {
    fontFamily: 'System',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '500',
  } as TextStyle,
  tiny: {
    fontFamily: 'System',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
  } as TextStyle,
  button: {
    fontFamily: 'System',
    fontSize: 14,
    lineHeight: 19,
    fontWeight: 'bold',
  } as TextStyle,
  overline: {
    fontFamily: 'System',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  } as TextStyle,
} as const;
