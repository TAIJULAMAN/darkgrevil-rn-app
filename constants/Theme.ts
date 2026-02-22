import { TextStyle } from 'react-native';

export const Colors = {
  background: '#000000',
  surface: '#121212',
  surfaceLight: '#1E1E1E',
  primary: '#A855F7',
  primaryDeep: '#7E22CE',
  text: '#FFFFFF',
  textSecondary: '#A1A1AA',
  textMuted: '#71717A',
  success: '#22C55E',
  overlay: 'rgba(0, 0, 0, 0.7)',
  cardGradient: ['rgba(168, 85, 247, 0.1)', 'rgba(0, 0, 0, 0.2)'],
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Typography: { [key: string]: TextStyle } = {
  h1: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
  },
  h2: {
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 32,
    color: Colors.text,
    fontFamily: 'System',
  },
  body: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
};
