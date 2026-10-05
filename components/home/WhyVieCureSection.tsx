import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlaskConical, ShieldCheck, Leaf, Sparkles } from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { FontFamily, FontSize, Radius, Spacing, Shadow } from '../../constants/theme';
import { useTheme } from '../../contexts/ThemeContext';
import { APP_CONFIG } from '../../constants/config';

export const WhyVieCureSection: React.FC = () => {
  const { isDark } = useTheme();

  const getIcon = (iconName: string) => {
    const size = 22;
    const color = Colors.primary;
    switch (iconName) {
      case 'flask-conical':
        return <FlaskConical size={size} color={color} />;
      case 'shield-check':
        return <ShieldCheck size={size} color={color} />;
      case 'leaf':
        return <Leaf size={size} color={color} />;
      case 'sparkles':
      default:
        return <Sparkles size={size} color={color} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>OUR CORE PHILOSOPHY</Text>
        </View>
        <Text
          style={[
            styles.title,
            { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
          ]}
        >
          The Science of Well-Being
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
          ]}
        >
          Formulated to the highest clinical benchmark, combining bio-active potency with proven tolerability.
        </Text>
      </View>

      <View style={styles.grid}>
        {APP_CONFIG.whyVieCure.map((item) => (
          <View
            key={item.id}
            style={[
              styles.card,
              {
                backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
                borderColor: isDark ? Colors.borderDark : Colors.borderLight,
              },
            ]}
          >
            <View style={styles.iconWrapper}>
              {getIcon(item.icon)}
            </View>
            <Text
              style={[
                styles.cardTitle,
                { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
              ]}
            >
              {item.title}
            </Text>
            <Text
              style={[
                styles.cardDescription,
                { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
              ]}
            >
              {item.description}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
  },
  header: {
    marginBottom: Spacing.lg,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(26, 92, 58, 0.08)',
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: Radius.full,
    marginBottom: Spacing.xs,
  },
  badgeText: {
    color: Colors.primary,
    fontSize: FontSize.xs - 1,
    fontFamily: FontFamily.bold,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: FontSize.xl + 2,
    fontFamily: FontFamily.serifBold,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: FontSize.sm,
    lineHeight: 20,
    fontFamily: FontFamily.regular,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  card: {
    width: '47.5%',
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    ...Shadow.sm,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Colors.sageLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  cardTitle: {
    fontSize: FontSize.sm + 1,
    fontFamily: FontFamily.bold,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: FontSize.xs,
    lineHeight: 16,
    fontFamily: FontFamily.regular,
  },
});
