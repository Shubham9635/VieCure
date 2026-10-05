import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Bell } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';
import { FontFamily, FontSize, Spacing } from '../../constants/theme';

interface ScreenHeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  showNotification?: boolean;
  rightElement?: React.ReactNode;
  onBack?: () => void;
  transparent?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function ScreenHeader({
  title,
  subtitle,
  showBack = false,
  showNotification = false,
  rightElement,
  onBack,
  transparent = false,
  style,
}: ScreenHeaderProps) {
  const { theme, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top + (Platform.OS === 'android' ? 8 : 4),
            backgroundColor: transparent ? 'transparent' : theme.surface,
            borderBottomColor: transparent ? 'transparent' : theme.border,
            borderBottomWidth: transparent ? 0 : StyleSheet.hairlineWidth,
          },
          style,
        ]}
      >
        <View style={styles.row}>
          {showBack && (
            <TouchableOpacity
              onPress={handleBack}
              style={[styles.iconBtn, { backgroundColor: theme.inputBg }]}
              activeOpacity={0.7}
              hitSlop={8}
            >
              <ArrowLeft size={20} color={theme.text} />
            </TouchableOpacity>
          )}

          <View style={styles.titleWrap}>
            {title && (
              <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
                {title}
              </Text>
            )}
            {subtitle && (
              <Text style={[styles.subtitle, { color: theme.textSecondary }]} numberOfLines={1}>
                {subtitle}
              </Text>
            )}
          </View>

          <View style={styles.rightWrap}>
            {showNotification && (
              <TouchableOpacity
                style={[styles.iconBtn, { backgroundColor: theme.inputBg }]}
                onPress={() => router.push('/notifications')}
                activeOpacity={0.7}
                hitSlop={8}
              >
                <Bell size={20} color={theme.text} />
              </TouchableOpacity>
            )}
            {rightElement}
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing[5],
    paddingBottom: Spacing[3],
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrap: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.xl,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.sm,
  },
  rightWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
  },
});
