import { colors } from './colors';
import { typography } from './typography';
import { icons, iconSizes } from './icons';

export const theme = {
  colors,
  typography,
  icons,
  iconSizes,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 4,
    },
  },
} as const;

export type Theme = typeof theme;

// Export everything for easy access
export * from './colors';
export * from './typography';
export * from './icons';
