import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import {
  ArrowLeft,
  Moon,
  Sun,
  Monitor,
  Trash2,
  RotateCcw,
  Shield,
  FileCheck,
  ChevronRight,
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeScreen } from '../components/layout/SafeScreen';
import { Colors } from '../constants/colors';
import { FontFamily, FontSize, Radius, Spacing, Shadow } from '../constants/theme';
import { useTheme } from '../contexts/ThemeContext';
import { ASYNC_STORAGE_KEYS, APP_CONFIG } from '../constants/config';
import { ThemeMode } from '../types';

export default function SettingsScreen() {
  const { isDark, themeMode, setThemeMode } = useTheme();

  const handleSetTheme = (mode: ThemeMode) => {
    setThemeMode(mode);
  };

  const handleClearCache = async () => {
    Alert.alert(
      'Clear Cache',
      'This will clear locally cached products, searches, and images. Fresh data will reload on next view.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.recentSearches);
            Alert.alert('Cache Cleared', 'Local search history and temp data have been reset.');
          },
        },
      ]
    );
  };

  const handleReplayOnboarding = async () => {
    await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.onboardingComplete);
    router.replace('/onboarding');
  };

  return (
    <SafeScreen scrollable={false}>
      {/* Header */}
      <View
        style={[
          styles.headerBar,
          {
            backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
            borderBottomColor: isDark ? Colors.borderDark : Colors.borderLight,
          },
        ]}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color={isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight} />
        </TouchableOpacity>
        <Text
          style={[
            styles.headerTitle,
            { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
          ]}
        >
          Preferences & Settings
        </Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Appearance Mode */}
        <View style={styles.sectionBlock}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
            ]}
          >
            APPEARANCE
          </Text>

          <View
            style={[
              styles.card,
              {
                backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
                borderColor: isDark ? Colors.borderDark : Colors.borderLight,
              },
            ]}
          >
            <View style={styles.themeRow}>
              {(['light', 'dark', 'system'] as ThemeMode[]).map((mode) => {
                const isActive = themeMode === mode;
                return (
                  <TouchableOpacity
                    key={mode}
                    style={[
                      styles.themeOption,
                      isActive && styles.themeOptionActive,
                      {
                        backgroundColor: isActive
                          ? Colors.primary
                          : isDark
                          ? 'rgba(255,255,255,0.06)'
                          : Colors.cream,
                        borderColor: isActive ? Colors.primary : 'transparent',
                      },
                    ]}
                    onPress={() => handleSetTheme(mode)}
                  >
                    {mode === 'light' ? (
                      <Sun size={18} color={isActive ? '#FFFFFF' : Colors.gold} />
                    ) : mode === 'dark' ? (
                      <Moon size={18} color={isActive ? '#FFFFFF' : Colors.sageLight} />
                    ) : (
                      <Monitor
                        size={18}
                        color={isActive ? '#FFFFFF' : isDark ? Colors.white : Colors.primaryDark}
                      />
                    )}
                    <Text
                      style={[
                        styles.themeOptionText,
                        {
                          color: isActive
                            ? '#FFFFFF'
                            : isDark
                            ? Colors.textPrimaryDark
                            : Colors.textPrimaryLight,
                          fontWeight: isActive ? '700' : '500',
                        },
                      ]}
                    >
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        {/* Data & Storage */}
        <View style={styles.sectionBlock}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
            ]}
          >
            STORAGE & DATA
          </Text>

          <View
            style={[
              styles.card,
              {
                backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
                borderColor: isDark ? Colors.borderDark : Colors.borderLight,
              },
            ]}
          >
            <TouchableOpacity style={styles.menuItem} onPress={handleClearCache}>
              <View style={styles.menuLeft}>
                <View style={styles.iconCircle}>
                  <Trash2 size={18} color={Colors.primary} />
                </View>
                <View>
                  <Text
                    style={[
                      styles.menuLabel,
                      { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                    ]}
                  >
                    Clear Search Cache & History
                  </Text>
                  <Text
                    style={[
                      styles.menuSub,
                      { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
                    ]}
                  >
                    Frees local storage memory
                  </Text>
                </View>
              </View>
              <ChevronRight size={18} color={Colors.gray400} />
            </TouchableOpacity>

            <View
              style={[
                styles.divider,
                { backgroundColor: isDark ? Colors.borderDark : Colors.borderLight },
              ]}
            />

            <TouchableOpacity style={styles.menuItem} onPress={handleReplayOnboarding}>
              <View style={styles.menuLeft}>
                <View style={styles.iconCircle}>
                  <RotateCcw size={18} color={Colors.primary} />
                </View>
                <View>
                  <Text
                    style={[
                      styles.menuLabel,
                      { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                    ]}
                  >
                    Replay Introduction Walkthrough
                  </Text>
                  <Text
                    style={[
                      styles.menuSub,
                      { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
                    ]}
                  >
                    View brand orientation slides
                  </Text>
                </View>
              </View>
              <ChevronRight size={18} color={Colors.gray400} />
            </TouchableOpacity>
          </View>
        </View>

        {/* About App & Build */}
        <View style={styles.sectionBlock}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
            ]}
          >
            ABOUT APPLICATION
          </Text>

          <View
            style={[
              styles.card,
              {
                backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
                borderColor: isDark ? Colors.borderDark : Colors.borderLight,
              },
            ]}
          >
            <View style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <View style={styles.iconCircle}>
                  <FileCheck size={18} color={Colors.primary} />
                </View>
                <Text
                  style={[
                    styles.menuLabel,
                    { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                  ]}
                >
                  Application Version
                </Text>
              </View>
              <Text style={{ color: Colors.primary, fontFamily: FontFamily.bold }}>
                v{APP_CONFIG.version} (Build 100)
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: FontSize.md + 1,
    fontFamily: FontFamily.bold,
    fontWeight: '700',
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing['3xl'],
  },
  sectionBlock: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.bold,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: Spacing.sm,
    paddingLeft: Spacing.xs,
  },
  card: {
    borderRadius: Radius.xl,
    borderWidth: 1,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  themeRow: {
    flexDirection: 'row',
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  themeOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: Spacing.md - 2,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
  },
  themeOptionActive: {},
  themeOptionText: {
    fontSize: FontSize.xs + 1,
    fontFamily: FontFamily.medium,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md + 2,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(26,92,58,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    fontSize: FontSize.sm + 1,
    fontFamily: FontFamily.medium,
    fontWeight: '600',
  },
  menuSub: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.regular,
  },
  divider: {
    height: 1,
    marginLeft: 56,
  },
});
