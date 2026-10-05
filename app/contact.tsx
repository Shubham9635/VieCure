import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import {
  ArrowLeft,
  Phone,
  Mail,
  Globe,
  MapPin,
  Clock,
  MessageSquare,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react-native';
import { SafeScreen } from '../components/layout/SafeScreen';
import { Colors } from '../constants/colors';
import { FontFamily, FontSize, Radius, Spacing, Shadow } from '../constants/theme';
import { useTheme } from '../contexts/ThemeContext';
import { APP_CONFIG } from '../constants/config';

export default function ContactScreen() {
  const { isDark } = useTheme();

  const handleCall = () => {
    Linking.openURL('tel:+919876543210');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:info@viecurelifesciences.in?subject=Commercial%20Inquiry');
  };

  const handleWebsite = () => {
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
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color={isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight} />
        </TouchableOpacity>
        <Text
          style={[
            styles.headerTitle,
            { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
          ]}
        >
          Contact Viecure
        </Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Company Identity */}
        <View
          style={[
            styles.companyCard,
            {
              backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
              borderColor: isDark ? 'rgba(184,151,106,0.3)' : 'rgba(184,151,106,0.35)',
            },
          ]}
        >
          <Image
            source={require('../assets/logo-circle.png')}
            style={styles.companyLogo}
            resizeMode="contain"
          />
          <Text
            style={[
              styles.companyName,
              { color: isDark ? Colors.textPrimaryDark : Colors.primaryDark },
            ]}
          >
            Viecure Lifesciences LLP
          </Text>
          <Text style={styles.companyType}>PHARMACEUTICAL & DERMATOLOGY DIVISION</Text>
          <Text
            style={[
              styles.companySummary,
              { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
            ]}
          >
            Reach our clinical formulations desk and corporate distribution team for wholesale orders, hospital supply, or formula specifications.
          </Text>
        </View>

        {/* Action Contact Methods */}
        <View style={styles.sectionBlock}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
            ]}
          >
            DIRECT COMMUNICATIONS
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
            {/* Phone */}
            <TouchableOpacity style={styles.menuItem} onPress={handleCall}>
              <View style={styles.menuLeft}>
                <View style={styles.iconCircle}>
                  <Phone size={18} color={Colors.primary} />
                </View>
                <View>
                  <Text
                    style={[
                      styles.itemLabel,
                      { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                    ]}
                  >
                    Phone / WhatsApp Hotline
                  </Text>
                  <Text
                    style={[
                      styles.itemSub,
                      { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
                    ]}
                  >
                    +91 98765 43210 (Commercial Desk)
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

            {/* Email */}
            <TouchableOpacity style={styles.menuItem} onPress={handleEmail}>
              <View style={styles.menuLeft}>
                <View style={styles.iconCircle}>
                  <Mail size={18} color={Colors.primary} />
                </View>
                <View>
                  <Text
                    style={[
                      styles.itemLabel,
                      { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                    ]}
                  >
                    Official Email
                  </Text>
                  <Text
                    style={[
                      styles.itemSub,
                      { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
                    ]}
                  >
                    info@viecurelifesciences.in
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

            {/* Website */}
            <TouchableOpacity style={styles.menuItem} onPress={handleWebsite}>
              <View style={styles.menuLeft}>
                <View style={styles.iconCircle}>
                  <Globe size={18} color={Colors.primary} />
                </View>
                <View>
                  <Text
                    style={[
                      styles.itemLabel,
                      { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                    ]}
                  >
                    Corporate Portal
                  </Text>
                  <Text
                    style={[
                      styles.itemSub,
                      { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
                    ]}
                  >
                    https://viecurelifesciences.in
                  </Text>
                </View>
              </View>
              <ChevronRight size={18} color={Colors.gray400} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Operating Hours & SLA */}
        <View
          style={[
            styles.infoCard,
            {
              backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
              borderColor: isDark ? Colors.borderDark : Colors.borderLight,
            },
          ]}
        >
          <View style={styles.infoRow}>
            <Clock size={20} color={Colors.gold} />
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.infoTitle,
                  { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                ]}
              >
                Operational Hours
              </Text>
              <Text
                style={[
                  styles.infoText,
                  { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
                ]}
              >
                Monday – Saturday: 9:30 AM – 6:30 PM IST{'\n'}
                Closed on Sundays & National Holidays
              </Text>
            </View>
          </View>
        </View>

        {/* Direct Inquiry CTA */}
        <TouchableOpacity
          style={styles.inquiryBtn}
          activeOpacity={0.88}
          onPress={() => router.push('/enquiry')}
        >
          <MessageSquare size={18} color="#FFFFFF" />
          <Text style={styles.inquiryBtnText}>Submit Structured Inquiry Online</Text>
        </TouchableOpacity>
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
  companyCard: {
    padding: Spacing.xl,
    borderRadius: Radius.xl,
    borderWidth: 1.5,
    marginBottom: Spacing.xl,
    alignItems: 'center',
    ...Shadow.sm,
  },
  companyLogo: {
    width: 80,
    height: 80,
    marginBottom: Spacing.sm,
  },
  companyName: {
    fontSize: FontSize.xl,
    fontFamily: FontFamily.serifBold,
    fontWeight: '700',
    marginBottom: 2,
  },
  companyType: {
    fontSize: FontSize.xs - 1,
    fontFamily: FontFamily.bold,
    color: Colors.goldDark,
    letterSpacing: 1,
    marginBottom: Spacing.sm,
  },
  companySummary: {
    fontSize: FontSize.sm,
    lineHeight: 20,
    fontFamily: FontFamily.regular,
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
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(26,92,58,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemLabel: {
    fontSize: FontSize.sm + 1,
    fontFamily: FontFamily.bold,
    marginBottom: 2,
  },
  itemSub: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.regular,
  },
  divider: {
    height: 1,
    marginLeft: 56,
  },
  infoCard: {
    padding: Spacing.lg,
    borderRadius: Radius.xl,
    borderWidth: 1,
    marginBottom: Spacing.xl,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  infoTitle: {
    fontSize: FontSize.sm + 1,
    fontFamily: FontFamily.bold,
    fontWeight: '700',
    marginBottom: 4,
  },
  infoText: {
    fontSize: FontSize.xs + 1,
    lineHeight: 18,
    fontFamily: FontFamily.regular,
  },
  inquiryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: Radius.full,
    ...Shadow.sm,
  },
  inquiryBtnText: {
    color: '#FFFFFF',
    fontSize: FontSize.sm + 1,
    fontFamily: FontFamily.bold,
    fontWeight: '700',
  },
});
