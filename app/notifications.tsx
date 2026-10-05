import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Bell, CheckCheck, Sparkles, AlertCircle, Info } from 'lucide-react-native';
import { SafeScreen } from '../components/layout/SafeScreen';
import { Colors } from '../constants/colors';
import { FontFamily, FontSize, Radius, Spacing, Shadow } from '../constants/theme';
import { useTheme } from '../contexts/ThemeContext';

interface AppNotification {
  id: string;
  title: string;
  body: string;
  type: 'launch' | 'update' | 'notice';
  timestamp: string;
  read: boolean;
}

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: '1',
    title: 'New Clinical Sunscreen Range Released',
    body: 'Viecure Ultra Shield SPF 50+ Gel is now available for institutional stockists and clinical trials.',
    type: 'launch',
    timestamp: '2 hours ago',
    read: false,
  },
  {
    id: '2',
    title: 'GMP Quality Certification Updated',
    body: 'All manufacturing batches for Q3 adhere to the updated ISO 22716 standard benchmarks.',
    type: 'notice',
    timestamp: '1 day ago',
    read: false,
  },
  {
    id: '3',
    title: 'Wholesale Inquiries Portal Active',
    body: 'Healthcare providers and clinic owners can now request customized bulk formulation quotas directly in-app.',
    type: 'update',
    timestamp: '3 days ago',
    read: true,
  },
  {
    id: '4',
    title: 'Welcome to Viecure Lifesciences',
    body: 'Explore our complete dermatological and wellness portfolio designed with clinical precision.',
    type: 'notice',
    timestamp: '1 week ago',
    read: true,
  },
];

export default function NotificationsScreen() {
  const { isDark } = useTheme();
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'launch':
        return <Sparkles size={18} color={Colors.primary} />;
      case 'update':
        return <Info size={18} color={Colors.gold} />;
      case 'notice':
      default:
        return <AlertCircle size={18} color={Colors.sage} />;
    }
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
          Announcements & Updates
        </Text>

        <TouchableOpacity style={styles.markReadBtn} onPress={markAllAsRead}>
          <CheckCheck size={18} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => markAsRead(item.id)}
            style={[
              styles.notificationCard,
              {
                backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
                borderColor: !item.read
                  ? Colors.primary
                  : isDark
                  ? Colors.borderDark
                  : Colors.borderLight,
              },
            ]}
          >
            <View style={styles.iconCircle}>{getIcon(item.type)}</View>

            <View style={styles.contentWrap}>
              <View style={styles.titleRow}>
                <Text
                  style={[
                    styles.notificationTitle,
                    { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                    !item.read && { fontWeight: '700' },
                  ]}
                >
                  {item.title}
                </Text>
                {!item.read && <View style={styles.unreadDot} />}
              </View>

              <Text
                style={[
                  styles.notificationBody,
                  { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
                ]}
              >
                {item.body}
              </Text>

              <Text
                style={[
                  styles.timestamp,
                  { color: isDark ? Colors.textSecondaryDark : Colors.gray400 },
                ]}
              >
                {item.timestamp}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
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
  markReadBtn: {
    width: 38,
    height: 38,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing['3xl'],
    gap: Spacing.md,
  },
  notificationCard: {
    flexDirection: 'row',
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
    ...Shadow.sm,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(26,92,58,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  contentWrap: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: FontSize.sm + 1,
    fontFamily: FontFamily.bold,
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginLeft: 6,
  },
  notificationBody: {
    fontSize: FontSize.xs + 1,
    lineHeight: 18,
    fontFamily: FontFamily.regular,
    marginBottom: 6,
  },
  timestamp: {
    fontSize: FontSize.xs - 1,
    fontFamily: FontFamily.medium,
  },
});
