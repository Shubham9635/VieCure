import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { CheckCircle2, Home, ArrowRight, ShieldCheck } from 'lucide-react-native';
import { SafeScreen } from '../components/layout/SafeScreen';
import { Button } from '../components/ui/Button';
import { Colors } from '../constants/colors';
import { FontFamily, FontSize, Radius, Spacing, Shadow } from '../constants/theme';
import { useTheme } from '../contexts/ThemeContext';

export default function EnquirySuccessScreen() {
  const { isDark } = useTheme();
  const params = useLocalSearchParams<{
    enquiryId?: string;
    name?: string;
    productName?: string;
  }>();

  return (
    <SafeScreen>
      <View style={styles.container}>
        {/* Brand Logo */}
        <Image
          source={require('../assets/logo-circle.png')}
          style={styles.brandLogo}
          resizeMode="contain"
        />

        {/* Success Icon */}
        <View style={styles.iconRing}>
          <View style={styles.iconCircle}>
            <CheckCircle2 size={48} color="#FFFFFF" />
          </View>
        </View>

        <Text
          style={[
            styles.title,
            { color: isDark ? Colors.textPrimaryDark : Colors.primaryDark },
          ]}
        >
          Inquiry Received!
        </Text>

        <Text
          style={[
            styles.subtitle,
            { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
          ]}
        >
          Thank you{params.name ? `, ${params.name}` : ''}. Your inquiry for{' '}
          <Text style={{ fontWeight: '700', color: isDark ? '#FFFFFF' : Colors.primaryDark }}>
            {params.productName || 'Viecure Formulations'}
          </Text>{' '}
          has been logged in our enterprise portal.
        </Text>

        {/* Details Card */}
        <View
          style={[
            styles.detailsCard,
            {
              backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
              borderColor: isDark ? Colors.borderDark : Colors.borderLight,
            },
          ]}
        >
          <View style={styles.detailRow}>
            <Text
              style={[
                styles.detailLabel,
                { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
              ]}
            >
              REFERENCE ID
            </Text>
            <Text
              style={[
                styles.detailValue,
                { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
              ]}
            >
              {params.enquiryId ? `#${params.enquiryId.slice(0, 10).toUpperCase()}` : '#VC-ENQ-9281'}
            </Text>
          </View>

          <View
            style={[
              styles.divider,
              { backgroundColor: isDark ? Colors.borderDark : Colors.borderLight },
            ]}
          />

          <View style={styles.detailRow}>
            <Text
              style={[
                styles.detailLabel,
                { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
              ]}
            >
              ESTIMATED RESPONSE
            </Text>
            <Text style={[styles.detailValue, { color: Colors.primary }]}>
              Within 24 Business Hours
            </Text>
          </View>

          <View
            style={[
              styles.divider,
              { backgroundColor: isDark ? Colors.borderDark : Colors.borderLight },
            ]}
          />

          <View style={styles.trustStrip}>
            <ShieldCheck size={16} color={Colors.primary} />
            <Text
              style={[
                styles.trustNote,
                { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
              ]}
            >
              A designated representative from Viecure Lifesciences LLP will connect via phone or email.
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <Button
            title="Browse More Formulations"
            variant="primary"
            size="lg"
            onPress={() => router.replace('/(tabs)/products')}
            icon={<ArrowRight size={18} color="#FFFFFF" />}
          />

          <Button
            title="Return to Home Screen"
            variant="outline"
            size="md"
            onPress={() => router.replace('/(tabs)')}
            icon={<Home size={18} color={isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight} />}
            style={{ marginTop: Spacing.sm }}
          />
        </View>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandLogo: {
    width: 72,
    height: 72,
    marginBottom: Spacing.lg,
  },
  iconRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(26,92,58,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  iconCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.md,
  },
  title: {
    fontSize: FontSize['2xl'] + 2,
    fontFamily: FontFamily.serifBold,
    fontWeight: '700',
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FontSize.sm + 1,
    lineHeight: 22,
    fontFamily: FontFamily.regular,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    maxWidth: '92%',
  },
  detailsCard: {
    width: '100%',
    padding: Spacing.lg,
    borderRadius: Radius.xl,
    borderWidth: 1,
    marginBottom: Spacing.xl,
    ...Shadow.sm,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
  },
  detailLabel: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.bold,
    letterSpacing: 0.8,
  },
  detailValue: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.bold,
  },
  divider: {
    height: 1,
    marginVertical: Spacing.sm,
  },
  trustStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: Spacing.xs,
  },
  trustNote: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.medium,
    lineHeight: 16,
    flex: 1,
  },
  actions: {
    width: '100%',
    gap: Spacing.sm,
  },
});
