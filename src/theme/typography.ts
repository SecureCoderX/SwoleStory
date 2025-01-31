import { TextStyle } from 'react-native';

export const typography = {
  displayLarge: {
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: -1.0,
    lineHeight: 48,
  } as TextStyle,

  displayMedium: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.5,
    lineHeight: 38.4,
  } as TextStyle,

  headingLarge: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: -0.5,
    lineHeight: 31.2,
  } as TextStyle,

  headingMedium: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: -0.5,
    lineHeight: 26,
  } as TextStyle,

  bodyLarge: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  } as TextStyle,

  bodyMedium: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
  } as TextStyle,

  labelLarge: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
    lineHeight: 19.6,
  } as TextStyle,

  labelMedium: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    lineHeight: 16.8,
  } as TextStyle,
} as const;

export type AppTypography = typeof typography;
