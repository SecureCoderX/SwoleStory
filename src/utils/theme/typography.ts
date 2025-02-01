export const typography = {
  // Font families
  families: {
    base: 'Inter',           // Main text font
    heading: 'Inter-Bold',    // Headings font
    mono: 'RobotoMono',       // For numbers and data
  },

  // Font sizes
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },

  // Font weights
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  // Line heights
  lineHeights: {
    tight: 1.2,
    base: 1.5,
    relaxed: 1.75,
  },

  // Letter spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  },

  // Predefined text styles
  styles: {
    h1: {
      fontSize: 30,
      fontFamily: 'Inter-Bold',
      lineHeight: 1.2,
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: 24,
      fontFamily: 'Inter-Bold',
      lineHeight: 1.2,
      letterSpacing: -0.5,
    },
    body: {
      fontSize: 16,
      fontFamily: 'Inter',
      lineHeight: 1.5,
      letterSpacing: 0,
    },
    caption: {
      fontSize: 12,
      fontFamily: 'Inter',
      lineHeight: 1.5,
      letterSpacing: 0.5,
    },
    data: {
      fontSize: 18,
      fontFamily: 'RobotoMono',
      lineHeight: 1.2,
      letterSpacing: -0.5,
    },
  },
};
