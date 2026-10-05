import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import {
  User,
  Heart,
  FileText,
  Moon,
  Sun,
  Shield,
  HelpCircle,
  PhoneCall,
  Lock,
  ChevronRight,
  Sparkles,
} from 'lucide-react-native';
import { SafeScreen } from '../../components/layout/SafeScreen';
import { Colors } from '../../constants/colors';
import { FontFamily, FontSize, Radius, Spacing, Shadow } from '../../constants/theme';
import { useTheme } from '../../contexts/ThemeContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import { APP_CONFIG } from '../../constants/config';

export default function ProfileScreen() {
  const { isDark, themeMode, setThemeMode } = useTheme();
  const { favoritesCount } = useFavorites();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const toggleDarkMode = () => {
    setThemeMode(isDark ? 'light' : 'dark');
  };

  const handleOpenAdmin = () => {
    router.push('/admin');
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
        <Text
          style={[
            styles.title,
            { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
          ]}
        >
          My Profile & Settings
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* User Card */}
        <View
          style={[
            styles.userCard,
            {
              backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
              borderColor: isDark ? Colors.borderDark : Colors.borderLight,
            },
          ]}
        >
          <View style={styles.avatarWrap}>
            <User size={32} color={Colors.primary} />
          </View>

          <View style={styles.userInfo}>
            <Text
              style={[
                styles.userName,
                { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
              ]}
            >
              Guest Practitioner / Client
            </Text>
            <Text
              style={[
                styles.userRole,
                { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
              ]}
            >
              Browsing Viecure Medical Portfolio
            </Text>
          </View>
        </View>

        {/* Quick Stats Grid */}
        <View style={styles.statsRow}>
          <TouchableOpacity
            style={[
              styles.statCard,
              {
                backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
                borderColor: isDark ? Colors.borderDark : Colors.borderLight,
              },
            ]}
            onPress={() => router.push('/favorites')}
          >
            <View style={styles.statIconWrap}>
              <Heart size={20} color={Colors.primary} />
            </View>
            <Text
              style={[
                styles.statNumber,
                { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
              ]}
            >
              {favoritesCount}
            </Text>
            <Text
              style={[
                styles.statLabel,
                { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
              ]}
            >
              Saved Formulations
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.statCard,
              {
                backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
                borderColor: isDark ? Colors.borderDark : Colors.borderLight,
              },
            ]}
            onPress={() => router.push('/enquiry')}
          >
            <View style={styles.statIconWrap}>
              <FileText size={20} color={Colors.gold} />
            </View>
            <Text
              style={[
                styles.statNumber,
                { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
              ]}
            >
              Inquire
            </Text>
            <Text
              style={[
                styles.statLabel,
                { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
              ]}
            >
              New Inquiry
            </Text>
          </TouchableOpacity>
        </View>

        {/* Preferences Section */}
        <View style={styles.sectionWrap}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
            ]}
          >
            PREFERENCES
          </Text>

          <View
            style={[
              styles.menuCard,
              {
                backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
                borderColor: isDark ? Colors.borderDark : Colors.borderLight,
              },
            ]}
          >
            <View style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <View style={styles.menuIconCircle}>
                  {isDark ? (
                    <Moon size={18} color={Colors.sageLight} />
                  ) : (
                    <Sun size={18} color={Colors.gold} />
                  )}
                </View>
                <Text
                  style={[
                    styles.menuLabel,
                    { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                  ]}
                >
                  Dark Mode
                </Text>
              </View>
              <Switch
                value={isDark}
                onValueChange={toggleDarkMode}
                trackColor={{ false: Colors.gray300, true: Colors.primary }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View
              style={[
                styles.divider,
                { backgroundColor: isDark ? Colors.borderDark : Colors.borderLight },
              ]}
            />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push('/settings')}
            >
              <View style={styles.menuLeft}>
                <View style={styles.menuIconCircle}>
                  <Sparkles size={18} color={Colors.primary} />
                </View>
                <Text
                  style={[
                    styles.menuLabel,
                    { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                  ]}
                >
                  App Settings & Cache
                </Text>
              </View>
              <ChevronRight size={18} color={Colors.gray400} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Support & Legal */}
        <View style={styles.sectionWrap}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
            ]}
          >
            SUPPORT & REACH
          </Text>

          <View
            style={[
              styles.menuCard,
              {
                backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
                borderColor: isDark ? Colors.borderDark : Colors.borderLight,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push('/contact')}
            >
              <View style={styles.menuLeft}>
                <View style={styles.menuIconCircle}>
                  <PhoneCall size={18} color={Colors.primary} />
                </View>
                <Text
                  style={[
                    styles.menuLabel,
                    { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                  ]}
                >
                  Contact Commercial Desk
                </Text>
              </View>
              <ChevronRight size={18} color={Colors.gray400} />
            </TouchableOpacity>

            <View
              style={[
                styles.divider,
                { backgroundColor: isDark ? Colors.borderDark : Colors.borderLight },
              ]}
            />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() =>
                Alert.alert(
                  'Privacy & Security Standards',
                  'Viecure Lifesciences LLP strictly protects customer and client inquiry confidentiality in accordance with applicable data privacy guidelines.'
                )
              }
            >
              <View style={styles.menuLeft}>
                <View style={styles.menuIconCircle}>
                  <Shield size={18} color={Colors.primary} />
                </View>
                <Text
                  style={[
                    styles.menuLabel,
                    { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                  ]}
                >
                  Privacy & Data Policy
                </Text>
              </View>
              <ChevronRight size={18} color={Colors.gray400} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Administration Portal */}
        <View style={styles.sectionWrap}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
            ]}
          >
            MANAGEMENT
          </Text>

          <View
            style={[
              styles.menuCard,
              {
                backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
                borderColor: isDark ? Colors.borderDark : Colors.borderLight,
              },
            ]}
          >
            <TouchableOpacity style={styles.menuItem} onPress={handleOpenAdmin}>
              <View style={styles.menuLeft}>
                <View
                  style={[
                    styles.menuIconCircle,
                    { backgroundColor: 'rgba(184, 151, 106, 0.15)' },
                  ]}
                >
                  <Lock size={18} color={Colors.gold} />
                </View>
                <View>
                  <Text
                    style={[
                      styles.menuLabel,
                      { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                    ]}
                  >
                    Administrative Portal
                  </Text>
                  <Text
                    style={[
                      styles.menuSubLabel,
                      { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
                    ]}
                  >
                    Manage products, categories & inquiries
                  </Text>
                </View>
              </View>
              <ChevronRight size={18} color={Colors.gray400} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Image
            source={require('../../assets/logo-circle.png')}
            style={styles.footerLogo}
            resizeMode="contain"
          />
          <Text
            style={[
              styles.footerText,
              { color: isDark ? Colors.textSecondaryDark : Colors.gray400 },
            ]}
          >
            Viecure Lifesciences LLP • Version {APP_CONFIG.version}
          </Text>
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: FontSize['2xl'],
    fontFamily: FontFamily.serifBold,
    fontWeight: '700',
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing['3xl'],
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: Radius.xl,
    borderWidth: 1,
    marginBottom: Spacing.lg,
    ...Shadow.sm,
  },
  avatarWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.sageLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: FontSize.md,
    fontFamily: FontFamily.bold,
    fontWeight: '700',
    marginBottom: 2,
  },
  userRole: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.regular,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  statCard: {
    flex: 1,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
    alignItems: 'center',
    ...Shadow.sm,
  },
  statIconWrap: {
    marginBottom: Spacing.xs,
  },
  statNumber: {
    fontSize: FontSize.xl,
    fontFamily: FontFamily.serifBold,
    fontWeight: '700',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.medium,
  },
  sectionWrap: {
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
  menuCard: {
    borderRadius: Radius.xl,
    borderWidth: 1,
    overflow: 'hidden',
    ...Shadow.sm,
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
  menuIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(26,92,58,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    fontSize: FontSize.sm + 1,
    fontFamily: FontFamily.medium,
    fontWeight: '500',
  },
  menuSubLabel: {
    fontSize: FontSize.xs - 1,
    fontFamily: FontFamily.regular,
    marginTop: 1,
  },
  divider: {
    height: 1,
    marginLeft: 56,
  },
  footer: {
    paddingVertical: Spacing.lg,
    alignItems: 'center',
    gap: 8,
  },
  footerLogo: {
    width: 48,
    height: 48,
    opacity: 0.7,
  },
  footerText: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.regular,
  },
});
