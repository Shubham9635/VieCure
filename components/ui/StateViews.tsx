import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { FontFamily, FontSize, Spacing } from '../../constants/theme';
import { Colors } from '../../constants/colors';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  description?: string;
  action?: { label: string; onPress: () => void };
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon,
  title,
  subtitle,
  description,
  action,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const { theme } = useTheme();
  const descText = description || subtitle;
  const btnLabel = action?.label || actionLabel;
  const btnAction = action?.onPress || onAction;

  return (
    <View style={styles.container}>
      {icon && <View style={styles.iconWrap}>{icon}</View>}
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      {descText && (
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>{descText}</Text>
      )}
      {btnLabel && btnAction && (
        <TouchableOpacity
          onPress={btnAction}
          style={[styles.btn, { backgroundColor: theme.primary }]}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>{btnLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

interface ErrorStateProps {
  title?: string;
  subtitle?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  subtitle = 'Please try again.',
  onRetry,
}: ErrorStateProps) {
  const { theme } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.errorIcon]}>⚠️</Text>
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>{subtitle}</Text>
      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          style={[styles.btn, { backgroundColor: theme.primary }]}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing[8],
    paddingVertical: Spacing[12],
    gap: Spacing[3],
  },
  iconWrap: {
    marginBottom: Spacing[2],
  },
  errorIcon: {
    fontSize: 40,
    marginBottom: Spacing[2],
  },
  title: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.lg,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.base,
    textAlign: 'center',
    lineHeight: FontSize.base * 1.6,
  },
  btn: {
    marginTop: Spacing[3],
    paddingHorizontal: Spacing[6],
    paddingVertical: Spacing[3],
    borderRadius: 12,
  },
  btnText: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.base,
    color: Colors.white,
  },
});
