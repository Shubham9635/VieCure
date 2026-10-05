import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { FontFamily, FontSize, Radius, Spacing, Shadow } from '../../constants/theme';
import { Badge } from '../common/Badge';

const { width } = Dimensions.get('window');

interface HeroBannerProps {
  onExplorePress: () => void;
  onEnquiryPress: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExplorePress,
  onEnquiryPress,
}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.primaryDark, '#14462c', Colors.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Background decorative ambient circles */}
        <View style={styles.ambientCircle1} />
        <View style={styles.ambientCircle2} />

        <View style={styles.content}>
          <View style={styles.badgeRow}>
            <View style={styles.goldPill}>
              <Sparkles size={12} color={Colors.gold} style={{ marginRight: 5 }} />
              <Text style={styles.goldPillText}>PHARMACEUTICAL PRECISION</Text>
            </View>
          </View>

          <Text style={styles.title}>
            Pure Science.{'\n'}
            <Text style={styles.titleHighlight}>Timeless Care.</Text>
          </Text>

          <Text style={styles.subtitle}>
            Medical-grade skincare and pharmaceutical formulations developed with certified clinical rigor.
          </Text>

          <View style={styles.ctaRow}>
            <TouchableOpacity
              style={styles.primaryButton}
              activeOpacity={0.85}
              onPress={onExplorePress}
            >
              <Text style={styles.primaryButtonText}>View Products</Text>
              <ArrowRight size={16} color={Colors.primaryDark} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              activeOpacity={0.85}
              onPress={onEnquiryPress}
            >
              <Text style={styles.secondaryButtonText}>Inquire Now</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.trustBar}>
            <View style={styles.trustItem}>
              <ShieldCheck size={14} color={Colors.sageLight} />
              <Text style={styles.trustText}>Dermatologically Tested</Text>
            </View>
            <View style={styles.trustDot} />
            <View style={styles.trustItem}>
              <Text style={styles.trustText}>GMP Certified Lab</Text>
            </View>
            <View style={styles.trustDot} />
            <View style={styles.trustItem}>
              <Text style={styles.trustText}>Authentic Supply</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    ...Shadow.md,
  },
  gradient: {
    padding: Spacing.xl,
    position: 'relative',
  },
  ambientCircle1: {
    position: 'absolute',
    top: -50,
    right: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(184, 151, 106, 0.12)',
  },
  ambientCircle2: {
    position: 'absolute',
    bottom: -60,
    left: -40,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(122, 170, 138, 0.1)',
  },
  content: {
    zIndex: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  goldPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(184, 151, 106, 0.18)',
    borderColor: 'rgba(184, 151, 106, 0.4)',
    borderWidth: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: 5,
    borderRadius: Radius.full,
  },
  goldPillText: {
    color: Colors.goldLight,
    fontSize: FontSize.xs,
    fontFamily: FontFamily.bold,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: FontSize['2xl'] + 2,
    lineHeight: 36,
    color: '#FFFFFF',
    fontFamily: FontFamily.serifBold,
    fontWeight: '700',
    marginBottom: Spacing.sm,
  },
  titleHighlight: {
    color: Colors.goldLight,
  },
  subtitle: {
    fontSize: FontSize.sm,
    lineHeight: 20,
    color: 'rgba(255, 255, 255, 0.82)',
    fontFamily: FontFamily.regular,
    marginBottom: Spacing.lg,
    maxWidth: '92%',
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.goldLight,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md - 2,
    borderRadius: Radius.full,
  },
  primaryButtonText: {
    color: Colors.primaryDark,
    fontFamily: FontFamily.bold,
    fontWeight: '700',
    fontSize: FontSize.sm,
  },
  secondaryButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md - 2,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontFamily: FontFamily.medium,
    fontWeight: '600',
    fontSize: FontSize.sm,
  },
  trustBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.12)',
    flexWrap: 'wrap',
    gap: 8,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trustDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  trustText: {
    fontSize: FontSize.xs - 1,
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: FontFamily.medium,
  },
});
