import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '../../constants/colors';
import { FontFamily, FontSize, Radius, Spacing } from '../../constants/theme';
import { useTheme } from '../../contexts/ThemeContext';

export type BadgeVariant = 'primary' | 'gold' | 'sage' | 'outline' | 'neutral' | 'success';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  size = 'md',
  style,
  textStyle,
  icon,
}) => {
  const { isDark } = useTheme();

  const getColors = () => {
    switch (variant) {
      case 'gold':
        return {
          bg: isDark ? 'rgba(184, 151, 106, 0.2)' : Colors.goldLight,
          border: Colors.gold,
          text: isDark ? Colors.goldLight : Colors.goldDark,
        };
      case 'sage':
        return {
          bg: isDark ? 'rgba(122, 170, 138, 0.2)' : Colors.sageLight,
          border: Colors.sage,
          text: isDark ? Colors.sageLight : Colors.primaryDark,
        };
      case 'outline':
        return {
          bg: 'transparent',
          border: isDark ? Colors.borderDark : Colors.borderLight,
          text: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight,
        };
      case 'neutral':
        return {
          bg: isDark ? 'rgba(255,255,255,0.08)' : Colors.cream,
          border: 'transparent',
          text: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight,
        };
      case 'success':
        return {
          bg: 'rgba(52, 199, 89, 0.15)',
          border: '#34C759',
          text: '#34C759',
        };
      case 'primary':
      default:
        return {
          bg: isDark ? 'rgba(26, 92, 58, 0.25)' : Colors.forestMist,
          border: Colors.primary,
          text: isDark ? Colors.sageLight : Colors.primary,
        };
    }
  };

  const colors = getColors();
  const isSmall = size === 'sm';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
          paddingHorizontal: isSmall ? Spacing.sm : Spacing.md,
          paddingVertical: isSmall ? 2 : 4,
          borderRadius: Radius.full,
        },
        style,
      ]}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text
        style={[
          styles.text,
          {
            color: colors.text,
            fontSize: isSmall ? FontSize.xs - 1 : FontSize.xs,
          },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
  },
  iconContainer: {
    marginRight: 4,
  },
  text: {
    fontFamily: FontFamily.medium,
    fontWeight: '600',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
});
