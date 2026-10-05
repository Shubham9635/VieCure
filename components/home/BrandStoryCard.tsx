import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Award, ChevronRight, CheckCircle2 } from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { FontFamily, FontSize, Radius, Spacing, Shadow } from '../../constants/theme';
import { useTheme } from '../../contexts/ThemeContext';

interface BrandStoryCardProps {
  onLearnMorePress: () => void;
}

export const BrandStoryCard: React.FC<BrandStoryCardProps> = ({ onLearnMorePress }) => {
  const { isDark } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
          borderColor: isDark ? 'rgba(184, 151, 106, 0.3)' : 'rgba(184, 151, 106, 0.35)',
        },
      ]}
    >
      <View style={styles.badgeRow}>
        <View style={styles.pill}>
          <Award size={14} color={Colors.gold} />
          <Text style={styles.pillText}>VIECURE LIFESCIENCES LLP</Text>
        </View>
      </View>

      <Text
        style={[
          styles.heading,
          { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
        ]}
      >
        Transforming Healthcare Through Integrity & Scientific Innovation
      </Text>

      <Text
        style={[
          styles.body,
          { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
        ]}
      >
        At Viecure Lifesciences LLP, we merge evidence-based clinical science with uncompromising product purity. Our comprehensive portfolio addresses evolving dermatological and wellness needs with precision formulations trusted across clinics and households alike.
      </Text>

      <View style={styles.bulletList}>
        <View style={styles.bulletItem}>
          <CheckCircle2 size={16} color={Colors.primary} />
          <Text
            style={[
              styles.bulletText,
              { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
            ]}
          >
            Formulated under strict Good Manufacturing Practices (GMP)
          </Text>
        </View>
        <View style={styles.bulletItem}>
          <CheckCircle2 size={16} color={Colors.primary} />
          <Text
            style={[
              styles.bulletText,
              { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
            ]}
          >
            Dermatologist-evaluated bio-active concentrations
          </Text>
        </View>
        <View style={styles.bulletItem}>
          <CheckCircle2 size={16} color={Colors.primary} />
          <Text
            style={[
              styles.bulletText,
              { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
            ]}
          >
            Direct manufacturer partnership and wholesale inquiries
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.learnMoreBtn}
        activeOpacity={0.8}
        onPress={onLearnMorePress}
      >
        <Text style={styles.learnMoreText}>Discover Our Heritage & Mission</Text>
        <ChevronRight size={16} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.md,
    padding: Spacing.xl,
    borderRadius: Radius.xl,
    borderWidth: 1.5,
    ...Shadow.md,
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(184, 151, 106, 0.15)',
    paddingHorizontal: Spacing.md,
    paddingVertical: 5,
    borderRadius: Radius.full,
  },
  pillText: {
    color: Colors.goldDark,
    fontSize: FontSize.xs,
    fontFamily: FontFamily.bold,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  heading: {
    fontSize: FontSize.lg + 1,
    lineHeight: 26,
    fontFamily: FontFamily.serifBold,
    fontWeight: '700',
    marginBottom: Spacing.sm,
  },
  body: {
    fontSize: FontSize.sm,
    lineHeight: 22,
    fontFamily: FontFamily.regular,
    marginBottom: Spacing.lg,
  },
  bulletList: {
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bulletText: {
    fontSize: FontSize.xs + 1,
    fontFamily: FontFamily.medium,
    fontWeight: '500',
    flex: 1,
  },
  learnMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(184, 151, 106, 0.2)',
  },
  learnMoreText: {
    color: Colors.primary,
    fontSize: FontSize.sm,
    fontFamily: FontFamily.bold,
    fontWeight: '700',
  },
});
