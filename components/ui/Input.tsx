import React, { forwardRef } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { FontFamily, FontSize, Radius, Spacing } from '../../constants/theme';
import { Colors } from '../../constants/colors';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  required?: boolean;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      onRightIconPress,
      containerStyle,
      required,
      style,
      ...rest
    },
    ref
  ) => {
    const { theme } = useTheme();

    return (
      <View style={[styles.wrapper, containerStyle]}>
        {label && (
          <Text style={[styles.label, { color: theme.textSecondary }]}>
            {label}
            {required && <Text style={{ color: Colors.error }}> *</Text>}
          </Text>
        )}
        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: theme.inputBg,
              borderColor: error ? Colors.error : theme.inputBorder,
            },
          ]}
        >
          {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
          <TextInput
            ref={ref}
            style={[
              styles.input,
              {
                color: theme.text,
                paddingLeft: leftIcon ? Spacing[1] : Spacing[4],
                paddingRight: rightIcon ? Spacing[1] : Spacing[4],
              },
              style,
            ]}
            placeholderTextColor={theme.placeholder}
            {...rest}
          />
          {rightIcon && (
            <TouchableOpacity
              onPress={onRightIconPress}
              style={styles.iconRight}
              activeOpacity={0.7}
            >
              {rightIcon}
            </TouchableOpacity>
          )}
        </View>
        {error && (
          <Text style={[styles.errorText, { color: Colors.error }]}>{error}</Text>
        )}
        {hint && !error && (
          <Text style={[styles.hintText, { color: theme.textTertiary }]}>{hint}</Text>
        )}
      </View>
    );
  }
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  wrapper: {
    gap: Spacing[2],
  },
  label: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.sm,
    letterSpacing: 0.2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.base,
    paddingVertical: Spacing[3] + 2,
    minHeight: 50,
  },
  iconLeft: {
    paddingLeft: Spacing[4],
    paddingRight: Spacing[2],
  },
  iconRight: {
    paddingRight: Spacing[4],
    paddingLeft: Spacing[2],
  },
  errorText: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.xs,
  },
  hintText: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.xs,
  },
});
