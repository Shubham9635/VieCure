import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { ChevronRight, Sparkles } from 'lucide-react-native';
import { SafeScreen } from '../../components/layout/SafeScreen';
import { EmptyState } from '../../components/ui/StateViews';
import { Colors } from '../../constants/colors';
import { FontFamily, FontSize, Radius, Spacing, Shadow } from '../../constants/theme';
import { useTheme } from '../../contexts/ThemeContext';
import { api } from '../../services/api';
import { Category, Product } from '../../types';

const { width } = Dimensions.get('window');

export default function CategoriesScreen() {
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const loadData = useCallback(async () => {
    try {
      const [cats, prods] = await Promise.all([
        api.getCategories(),
        api.getProducts(),
      ]);
      setCategories(cats);
      setProducts(prods);
    } catch (err) {
      console.error('Failed to load categories:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const getProductsForCategory = (catId: string, catName: string) => {
    return products.filter(
      (p) => p.categoryId === catId || p.category?.toLowerCase() === catName.toLowerCase()
    );
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
          Therapeutic Ranges
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
          ]}
        >
          Specialized divisions covering medical dermatology, clinical hair care, and daily wellness.
        </Text>
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
          />
        }
        renderItem={({ item, index }) => {
          const catProducts = getProductsForCategory(item.id, item.name);

          return (
            <TouchableOpacity
              activeOpacity={0.88}
              style={[
                styles.categoryCard,
                {
                  backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
                  borderColor: isDark ? Colors.borderDark : Colors.borderLight,
                },
              ]}
              onPress={() => router.push(`/category/${item.id}`)}
            >
              {/* Category Top Banner Accent */}
              <View
                style={[
                  styles.categoryAccentStrip,
                  { backgroundColor: item.color || Colors.primary },
                ]}
              />

              <View style={styles.cardInner}>
                <View style={styles.headerRow}>
                  <View style={styles.titleColumn}>
                    <View style={styles.iconAndTitle}>
                      <View
                        style={[
                          styles.catInitialBadge,
                          {
                            backgroundColor: isDark
                              ? 'rgba(26,92,58,0.25)'
                              : Colors.sageLight,
                          },
                        ]}
                      >
                        <Text style={styles.catInitialText}>{item.name.charAt(0)}</Text>
                      </View>
                      <View>
                        <Text
                          style={[
                            styles.catName,
                            { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                          ]}
                        >
                          {item.name}
                        </Text>
                        <Text
                          style={[
                            styles.catCount,
                            { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
                          ]}
                        >
                          {catProducts.length || item.productCount} Formulations
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.arrowButton}>
                    <ChevronRight size={18} color={Colors.primary} />
                  </View>
                </View>

                {item.description && (
                  <Text
                    style={[
                      styles.description,
                      { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
                    ]}
                  >
                    {item.description}
                  </Text>
                )}

                {/* Preview tags of top formulations in this category */}
                {catProducts.length > 0 && (
                  <View style={styles.previewSection}>
                    <Text
                      style={[
                        styles.previewLabel,
                        { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
                      ]}
                    >
                      Key Formulations:
                    </Text>
                    <View style={styles.previewChips}>
                      {catProducts.slice(0, 3).map((p) => (
                        <View
                          key={p.id}
                          style={[
                            styles.previewChip,
                            {
                              backgroundColor: isDark
                                ? 'rgba(255,255,255,0.06)'
                                : Colors.forestMist,
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.previewChipText,
                              { color: isDark ? Colors.textPrimaryDark : Colors.primaryDark },
                            ]}
                            numberOfLines={1}
                          >
                            {p.name}
                          </Text>
                        </View>
                      ))}
                      {catProducts.length > 3 && (
                        <Text
                          style={[
                            styles.moreText,
                            { color: isDark ? Colors.sageLight : Colors.primary },
                          ]}
                        >
                          +{catProducts.length - 3} more
                        </Text>
                      )}
                    </View>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />
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
  listContainer: {
    padding: Spacing.lg,
    paddingBottom: Spacing['3xl'],
    gap: Spacing.md,
  },
  categoryCard: {
    borderRadius: Radius.xl,
    borderWidth: 1,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  categoryAccentStrip: {
    height: 4,
    width: '100%',
  },
  cardInner: {
    padding: Spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  titleColumn: {
    flex: 1,
  },
  iconAndTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  catInitialBadge: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  catInitialText: {
    fontSize: FontSize.lg,
    fontFamily: FontFamily.serifBold,
    color: Colors.primary,
    fontWeight: '700',
  },
  catName: {
    fontSize: FontSize.md + 1,
    fontFamily: FontFamily.bold,
    fontWeight: '700',
    marginBottom: 2,
  },
  catCount: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.medium,
  },
  arrowButton: {
    width: 32,
    height: 32,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    fontSize: FontSize.sm,
    lineHeight: 20,
    fontFamily: FontFamily.regular,
    marginTop: 4,
    marginBottom: Spacing.md,
  },
  previewSection: {
    paddingTop: Spacing.sm + 2,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  previewLabel: {
    fontSize: FontSize.xs - 1,
    fontFamily: FontFamily.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  previewChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
  },
  previewChip: {
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 3,
    borderRadius: Radius.sm,
    maxWidth: '45%',
  },
  previewChipText: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.medium,
  },
  moreText: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.bold,
    fontWeight: '600',
    marginLeft: 2,
  },
});
