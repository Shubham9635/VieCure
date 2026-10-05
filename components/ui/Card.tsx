import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Radius, Shadow, Spacing } from '../../constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'flat' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ children, style, variant = 'elevated', padding = 'md' }: CardProps) {
  const { theme } = useTheme();

  const cardStyle: ViewStyle = {
    backgroundColor: theme.card,
    borderRadius: Radius.xl,
    ...(variant === 'elevated' ? Shadow.md : {}),
    ...(variant === 'bordered' ? { borderWidth: 1, borderColor: theme.border } : {}),
    ...(variant === 'flat' ? {} : {}),
    padding: paddingMap[padding],
  };

  return <View style={[cardStyle, style]}>{children}</View>;
}

const paddingMap = {
  none: 0,
  sm: Spacing[3],
  md: Spacing[4],
  lg: Spacing[6],
};
