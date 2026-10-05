export const Colors = {
  // Primary Brand Colors
  primary: '#1a5c3a',
  primaryLight: '#2d7a52',
  primaryDark: '#0d3d26',
  sage: '#7aaa8a',
  sageDark: '#5a8a6a',
  sageLight: '#a8c8b4',

  // Accent
  gold: '#b8976a',
  goldLight: '#d4b48a',
  goldDark: '#8a6838',
  cream: '#f4f6f4',
  forestMist: 'rgba(26, 92, 58, 0.08)',

  // Neutral
  white: '#ffffff',
  offWhite: '#f8f9f7',
  lightGray: '#f0f2f0',
  gray100: '#e8ebe8',
  gray200: '#d4d8d4',
  gray300: '#b8bdb8',
  gray400: '#8e948e',
  gray500: '#6a706a',
  gray600: '#4a504a',
  gray700: '#2e342e',

  // Text
  textPrimaryLight: '#1a2820',
  textSecondaryLight: '#5a7060',
  textTertiaryLight: '#8e9e8e',
  textPrimaryDark: '#e8f0e8',
  textSecondaryDark: '#a8baa8',
  textTertiaryDark: '#6a8070',

  // Background
  bgLight: '#f8f9f7',
  bgDark: '#0f1a14',
  surfaceLight: '#ffffff',
  surfaceDark: '#1a2820',
  cardLight: '#ffffff',
  cardDark: '#1e2e24',
  cardDark2: '#243028',

  // Status
  error: '#c0392b',
  errorLight: '#fdf2f2',
  success: '#27ae60',
  successLight: '#f0fdf4',
  warning: '#e67e22',
  warningLight: '#fef9f0',
  info: '#2980b9',
  infoLight: '#f0f7fe',

  // Transparent
  transparent: 'transparent',
  overlayLight: 'rgba(0,0,0,0.05)',
  overlayMedium: 'rgba(0,0,0,0.3)',
  overlayDark: 'rgba(0,0,0,0.6)',
  overlayGreen: 'rgba(26, 92, 58, 0.85)',

  // Border
  borderLight: '#e4e8e4',
  borderDark: '#2a3830',
} as const;

export type ColorKey = keyof typeof Colors;
