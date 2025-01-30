import { scale } from 'src/shared/utils/sizes';

export const theme = {
  colors: {
    primary: '#E50914',
    primaryDark: '#B20710',
    secondary: '#FFFFFF',
    background: '#0F0F0F',
    surface: '#1A1A1A',
    text: {
      primary: '#FFFFFF',
      secondary: '#CCCCCC',
      disabled: '#666666',
    },
    error: '#FF5252',
    success: '#4CAF50',
    divider: '#404040',
    overlay: 'rgba(0, 0, 0, 0.8)',
  },
  spacing: {
    none: 0,
    xs: scale(2),
    sm: scale(4),
    md: scale(8),
    'md-plus': scale(12),
    lg: scale(16),
    'lg-plus': scale(20),
    xl: scale(24),
    '2xl': scale(32),
    '3xl': scale(40),
    '4xl': scale(48),
    '5xl': scale(56),
    '6xl': scale(64),
    '7xl': scale(72),
    '8xl': scale(80),
  },
  typography: {
    h1: {
      fontSize: 24,
      fontWeight: '700',
      lineHeight: 32,
    },
    h2: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 28,
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
    },
    button: {
      fontSize: 16,
      fontWeight: '600',
      textTransform: 'uppercase',
    },
    caption: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
    },
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 5,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.4,
      shadowRadius: 10,
      elevation: 8,
    },
  },
};

export type AppTheme = typeof theme;
