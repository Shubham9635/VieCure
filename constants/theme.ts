import { Colors } from './colors';

export const FontFamily = {
  regular: 'DMSans_400Regular',
  medium: 'DMSans_500Medium',
  semiBold: 'DMSans_600SemiBold',
  bold: 'DMSans_700Bold',
  serifBold: 'DMSerifDisplay_400Regular',
  displayRegular: 'DMSerifDisplay_400Regular',
  displayItalic: 'DMSerifDisplay_400Regular_Italic',
} as const;

export const FontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 34,
  '5xl': 42,
  '6xl': 52,
} as const;

export const LineHeight = {
  tight: 1.2,
  snug: 1.35,
  normal: 1.5,
  relaxed: 1.65,
  loose: 1.9,
} as const;

export const Spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  // Semantic spacing aliases
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 999,
} as const;

export const Shadow = {
  xs: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 16,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 12,
  },
  green: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
} as const;

export interface ThemeType {
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  border: string;
  primary: string;
  primaryLight: string;
  sage: string;
  tabBar: string;
  tabBarBorder: string;
  inputBg: string;
  inputBorder: string;
  placeholder: string;
  skeleton: string;
  skeletonHighlight: string;
  overlay: string;
  statusBar: 'dark' | 'light';
}

export const Theme: { light: ThemeType; dark: ThemeType } = {
  light: {
    background: Colors.bgLight,
    surface: Colors.surfaceLight,
    card: Colors.cardLight,
    text: Colors.textPrimaryLight,
    textSecondary: Colors.textSecondaryLight,
    textTertiary: Colors.textTertiaryLight,
    border: Colors.borderLight,
    primary: Colors.primary,
    primaryLight: Colors.primaryLight,
    sage: Colors.sage,
    tabBar: Colors.white,
    tabBarBorder: Colors.borderLight,
    inputBg: Colors.lightGray,
    inputBorder: Colors.gray200,
    placeholder: Colors.gray400,
    skeleton: Colors.gray100,
    skeletonHighlight: Colors.white,
    overlay: Colors.overlayLight,
    statusBar: 'dark',
  },
  dark: {
    background: Colors.bgDark,
    surface: Colors.surfaceDark,
    card: Colors.cardDark,
    text: Colors.textPrimaryDark,
    textSecondary: Colors.textSecondaryDark,
    textTertiary: Colors.textTertiaryDark,
    border: Colors.borderDark,
    primary: Colors.primaryLight,
    primaryLight: Colors.sage,
    sage: Colors.sageDark,
    tabBar: Colors.surfaceDark,
    tabBarBorder: Colors.borderDark,
    inputBg: Colors.cardDark2,
    inputBorder: Colors.borderDark,
    placeholder: Colors.gray500,
    skeleton: Colors.cardDark2,
    skeletonHighlight: Colors.cardDark,
    overlay: Colors.overlayMedium,
    statusBar: 'light',
  },
};
