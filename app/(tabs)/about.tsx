import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import {
  ShieldCheck,
  FlaskConical,
  Award,
  Globe,
  Mail,
  Phone,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
} from 'lucide-react-native';
import { SafeScreen } from '../../components/layout/SafeScreen';
import { Colors } from '../../constants/colors';
import { FontFamily, FontSize, Radius, Spacing, Shadow } from '../../constants/theme';
import { useTheme } from '../../contexts/ThemeContext';
import { APP_CONFIG } from '../../constants/config';

const { width } = Dimensions.get('window');

export default function AboutScreen() {
  const { isDark } = useTheme();

  const handleOpenWebsite = () => {
    Linking.openURL(APP_CONFIG.website);
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
          About VieCure
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
          ]}
        >
          Pioneering healthcare & skincare solutions with scientific rigor.
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Brand Crest & Intro Banner */}
        <View
          style={[
            styles.brandCard,
            {
              backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
              borderColor: isDark ? 'rgba(184,151,106,0.3)' : 'rgba(184,151,106,0.35)',
            },
          ]}
        >
          <Image
            source={require('../../assets/logo-circle.png')}
            style={styles.crestLogo}
            resizeMode="contain"
          />

          <Text
            style={[
              styles.brandName,
              { color: isDark ? Colors.textPrimaryDark : Colors.primaryDark },
            ]}
          >
            Viecure Lifesciences LLP
          </Text>

          <Text style={styles.tagline}>SCIENCE BEHIND BETTER CARE</Text>

          <Text
            style={[
              styles.brandDescription,
              { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
            ]}
          >
            Viecure Lifesciences LLP is an India-based healthcare and personal care company committed to formulating cutting-edge skincare, hair care, and pharmaceutical wellness products that meet uncompromising medical and aesthetic benchmarks.
          </Text>

          <TouchableOpacity
            style={styles.websiteLink}
            activeOpacity={0.8}
            onPress={handleOpenWebsite}
          >
            <Globe size={16} color={Colors.primary} />
            <Text style={styles.websiteLinkText}>viecurelifesciences.in</Text>
            <ExternalLink size={14} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Quality Commitments */}
        <View style={styles.sectionWrap}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
            ]}
          >
            Clinical Standards & Benchmarks
          </Text>

          <View style={styles.commitmentsGrid}>
            <View
              style={[
                styles.commitmentItem,
                {
                  backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
                  borderColor: isDark ? Colors.borderDark : Colors.borderLight,
                },
              ]}
            >
              <FlaskConical size={24} color={Colors.primary} />
              <Text
                style={[
                  styles.itemTitle,
                  { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                ]}
              >
                Evidence-Based
              </Text>
              <Text
                style={[
                  styles.itemDesc,
                  { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
                ]}
              >
                Every concentration is selected according to published dermatological and medical findings.
              </Text>
            </View>

            <View
              style={[
                styles.commitmentItem,
                {
                  backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
                  borderColor: isDark ? Colors.borderDark : Colors.borderLight,
                },
              ]}
            >
              <ShieldCheck size={24} color={Colors.primary} />
              <Text
                style={[
                  styles.itemTitle,
                  { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                ]}
              >
                GMP Compliant
              </Text>
              <Text
                style={[
                  styles.itemDesc,
                  { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
                ]}
              >
                Manufactured in certified cleanroom environments following global Good Manufacturing Practices.
              </Text>
            </View>

            <View
              style={[
                styles.commitmentItem,
                {
                  backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
                  borderColor: isDark ? Colors.borderDark : Colors.borderLight,
                },
              ]}
            >
              <Award size={24} color={Colors.primary} />
              <Text
                style={[
                  styles.itemTitle,
                  { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                ]}
              >
                Dermatology Tested
              </Text>
              <Text
                style={[
                  styles.itemDesc,
                  { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
                ]}
              >
                Safe for daily regimens, formulated for sensitive and compromised barrier skin types.
              </Text>
            </View>

            <View
              style={[
                styles.commitmentItem,
                {
                  backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
                  borderColor: isDark ? Colors.borderDark : Colors.borderLight,
                },
              ]}
            >
              <CheckCircle2 size={24} color={Colors.primary} />
              <Text
                style={[
                  styles.itemTitle,
                  { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                ]}
              >
                Clean Formulations
              </Text>
              <Text
                style={[
                  styles.itemDesc,
                  { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
                ]}
              >
                Free from hazardous chemicals, parabens, and micro-pollutants for peace of mind.
              </Text>
            </View>
          </View>
        </View>

        {/* Wholesale & Institutional Inquiries Action Card */}
        <View
          style={[
            styles.actionCard,
            {
              backgroundColor: isDark ? 'rgba(26,92,58,0.2)' : Colors.forestMist,
              borderColor: isDark ? 'rgba(122,170,138,0.3)' : Colors.sage,
            },
          ]}
        >
          <Text
            style={[
              styles.actionTitle,
              { color: isDark ? Colors.textPrimaryDark : Colors.primaryDark },
            ]}
          >
            Distributor & Clinic Network
          </Text>
          <Text
            style={[
              styles.actionDesc,
              { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
            ]}
          >
            Are you a pharmacy owner, medical practitioner, or regional stockist interested in distributing Viecure products?
          </Text>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/enquiry')}
          >
            <Text style={styles.actionButtonText}>Submit Wholesale Inquiry</Text>
            <ChevronRight size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Contact Links */}
        <View style={styles.contactCard}>
          <TouchableOpacity
            style={[
              styles.contactRow,
              {
                backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
                borderColor: isDark ? Colors.borderDark : Colors.borderLight,
              },
            ]}
            onPress={() => router.push('/contact')}
          >
            <View style={styles.contactLeft}>
              <View style={styles.contactIconCircle}>
                <Mail size={18} color={Colors.primary} />
              </View>
              <View>
                <Text
                  style={[
                    styles.contactTitle,
                    { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                  ]}
                >
                  Contact & Corporate Office
                </Text>
                <Text
                  style={[
                    styles.contactSub,
                    { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
                  ]}
                >
                  Get phone numbers, email and location
                </Text>
              </View>
            </View>
            <ChevronRight size={18} color={Colors.gray400} />
          </TouchableOpacity>
        </View>

        {/* Medical disclaimer note */}
        <View style={styles.disclaimerBox}>
          <Text
            style={[
              styles.disclaimerText,
              { color: isDark ? Colors.textSecondaryDark : Colors.gray500 },
            ]}
          >
            Notice: Information in this application is provided for commercial, institutional, and educational purposes by Viecure Lifesciences LLP. Always consult a certified dermatologist or healthcare professional regarding specific skin or medical conditions.
          </Text>
          <Text
            style={[
              styles.versionText,
              { color: isDark ? Colors.textSecondaryDark : Colors.gray400 },
            ]}
          >
            App Version {APP_CONFIG.version} (Build 100) • Made for Viecure Lifesciences LLP
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: FontSize.sm,
    lineHeight: 20,
    fontFamily: FontFamily.regular,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing['3xl'],
  },
  brandCard: {
    padding: Spacing.xl,
    borderRadius: Radius.xl,
    borderWidth: 1.5,
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: Spacing.xl,
    ...Shadow.md,
  },
  crestLogo: {
    width: 80,
    height: 80,
    marginBottom: Spacing.md,
  },
  brandName: {
    fontSize: FontSize.xl + 2,
    fontFamily: FontFamily.serifBold,
    fontWeight: '700',
    marginBottom: 4,
  },
  tagline: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.bold,
    color: Colors.gold,
    letterSpacing: 1.5,
    marginBottom: Spacing.md,
    fontWeight: '700',
  },
  brandDescription: {
    fontSize: FontSize.sm,
    lineHeight: 22,
    fontFamily: FontFamily.regular,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  websiteLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm + 2,
    borderRadius: Radius.full,
    backgroundColor: Colors.sageLight,
  },
  websiteLinkText: {
    color: Colors.primaryDark,
    fontSize: FontSize.sm,
    fontFamily: FontFamily.bold,
    fontWeight: '600',
  },
  sectionWrap: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontFamily: FontFamily.serifBold,
    fontWeight: '700',
    marginBottom: Spacing.md,
  },
  commitmentsGrid: {
    gap: Spacing.md,
  },
  commitmentItem: {
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
    ...Shadow.sm,
  },
  itemTitle: {
    fontSize: FontSize.md,
    fontFamily: FontFamily.bold,
    fontWeight: '700',
    marginTop: Spacing.sm,
    marginBottom: 4,
  },
  itemDesc: {
    fontSize: FontSize.xs + 1,
    lineHeight: 18,
    fontFamily: FontFamily.regular,
  },
  actionCard: {
    padding: Spacing.xl,
    borderRadius: Radius.xl,
    borderWidth: 1,
    marginBottom: Spacing.xl,
  },
  actionTitle: {
    fontSize: FontSize.lg,
    fontFamily: FontFamily.serifBold,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  actionDesc: {
    fontSize: FontSize.sm,
    lineHeight: 20,
    fontFamily: FontFamily.regular,
    marginBottom: Spacing.lg,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md - 2,
    paddingHorizontal: Spacing.xl,
    borderRadius: Radius.full,
    alignSelf: 'flex-start',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: FontSize.sm,
    fontFamily: FontFamily.bold,
    fontWeight: '700',
  },
  contactCard: {
    marginBottom: Spacing.xl,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
    ...Shadow.sm,
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  contactIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.sageLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactTitle: {
    fontSize: FontSize.sm + 1,
    fontFamily: FontFamily.bold,
    fontWeight: '600',
    marginBottom: 2,
  },
  contactSub: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.regular,
  },
  disclaimerBox: {
    padding: Spacing.md,
    borderRadius: Radius.md,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  disclaimerText: {
    fontSize: FontSize.xs - 1,
    lineHeight: 16,
    fontFamily: FontFamily.regular,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  versionText: {
    fontSize: FontSize.xs - 2,
    fontFamily: FontFamily.medium,
    textAlign: 'center',
  },
});
