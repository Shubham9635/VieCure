import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';
import { FontFamily, FontSize, Radius, Spacing } from '../../constants/theme';
import { useTheme } from '../../contexts/ThemeContext';

interface CategoryPillProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
  style?: ViewStyle;
  icon?: React.ReactNode;
}

export const CategoryPill: React.FC<CategoryPillProps> = ({
  label,
  isSelected,
  onPress,
  style,
  icon,
}) => {
  const { isDark } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.pill,
        {
          backgroundColor: isSelected
            ? Colors.primary
            : isDark
            ? Colors.surfaceDark
            : Colors.surfaceLight,
          borderColor: isSelected
            ? Colors.primary
            : isDark
            ? Colors.borderDark
            : Colors.borderLight,
        },
        isSelected && styles.selectedShadow,
        style,
      ]}
    >
      {icon && <span style={{ marginRight: 6 }}>{icon}</span>}
      <Text
        style={[
          styles.label,
          {
            color: isSelected
              ? '#FFFFFF'
              : isDark
              ? Colors.textSecondaryDark
              : Colors.textSecondaryLight,
            fontFamily: isSelected ? FontFamily.bold : FontFamily.medium,
            fontWeight: isSelected ? '700' : '500',
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm + 2,
    borderRadius: Radius.full,
    borderWidth: 1,
    marginRight: Spacing.sm,
  },
  label: {
    fontSize: FontSize.sm,
    letterSpacing: 0.2,
  },
  selectedShadow: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
});
