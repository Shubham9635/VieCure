import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../../contexts/ThemeContext';
import { Colors } from '../../constants/colors';
import { FontFamily, FontSize, Radius, Spacing } from '../../constants/theme';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  label?: string;
  title?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  label,
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  style,
  textStyle,
  disabled,
  onPress,
  ...rest
}: ButtonProps) {
  const { theme, isDark } = useTheme();
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96, { damping: 20, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 20, stiffness: 400 });
  };

  const getContainerStyle = (): ViewStyle => {
    const base: ViewStyle = {
      ...styles.base,
      ...sizeStyles[size],
      ...(fullWidth && { width: '100%' }),
      ...(disabled || loading ? { opacity: 0.6 } : {}),
    };

    switch (variant) {
      case 'primary':
        return { ...base, backgroundColor: theme.primary };
      case 'secondary':
        return { ...base, backgroundColor: isDark ? Colors.cardDark2 : Colors.gray100 };
      case 'outline':
        return { ...base, backgroundColor: 'transparent', borderWidth: 1.5, borderColor: theme.primary };
      case 'ghost':
        return { ...base, backgroundColor: 'transparent' };
      case 'danger':
        return { ...base, backgroundColor: Colors.error };
      default:
        return { ...base, backgroundColor: theme.primary };
    }
  };

  const getTextStyle = (): TextStyle => {
    const base: TextStyle = {
      fontFamily: FontFamily.semiBold,
      fontSize: textSizes[size],
      letterSpacing: 0.3,
    };

    switch (variant) {
      case 'primary':
      case 'danger':
        return { ...base, color: Colors.white };
      case 'secondary':
        return { ...base, color: theme.text };
      case 'outline':
      case 'ghost':
        return { ...base, color: theme.primary };
      default:
        return { ...base, color: Colors.white };
    }
  };

  return (
    <AnimatedTouchable
      style={[animStyle, getContainerStyle(), style]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.9}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' || variant === 'ghost' ? theme.primary : Colors.white}
          size="small"
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          <Text style={[getTextStyle(), textStyle]}>{label || title}</Text>
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </AnimatedTouchable>
  );
}

const sizeStyles: Record<ButtonSize, ViewStyle> = {
  sm: { paddingHorizontal: Spacing[4], paddingVertical: Spacing[2], gap: Spacing[2] },
  md: { paddingHorizontal: Spacing[6], paddingVertical: Spacing[3] + 2, gap: Spacing[2] },
  lg: { paddingHorizontal: Spacing[8], paddingVertical: Spacing[4], gap: Spacing[3] },
};

const textSizes: Record<ButtonSize, number> = {
  sm: FontSize.sm,
  md: FontSize.base,
  lg: FontSize.md,
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },
});
