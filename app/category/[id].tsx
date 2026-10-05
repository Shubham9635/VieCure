import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Image,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { SafeScreen } from '../../components/layout/SafeScreen';
import { ProductCard } from '../../components/product/ProductCard';
import { EmptyState } from '../../components/ui/StateViews';
import { Colors } from '../../constants/colors';
import { FontFamily, FontSize, Radius, Spacing } from '../../constants/theme';
import { useTheme } from '../../contexts/ThemeContext';
import { api } from '../../services/api';
import { Product, Category } from '../../types';
import { getCategoryImage } from '../../constants/categoryImages';

export default function CategoryProductsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isDark } = useTheme();

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    if (!id) return;
    try {
      const cat = await api.getCategoryById(id);
      setCategory(cat || null);
      const prods = await api.getProductsByCategory(id);
      setProducts(prods);
    } catch (err) {
      console.error('Failed to load category products:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
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
          numberOfLines={1}
        >
          {category?.name || 'Category'}
        </Text>
        <View style={{ width: 38 }} />
      </View>

      {/* Category Banner */}
      {category?.description && (
        <View
          style={[
            styles.banner,
            {
              backgroundColor: isDark ? 'rgba(26,92,58,0.15)' : Colors.sageLight,
              borderBottomColor: isDark ? Colors.borderDark : Colors.borderLight,
            },
          ]}
        >
          {getCategoryImage(category) && (
            <Image
              source={getCategoryImage(category)}
              style={styles.bannerImage}
              resizeMode="contain"
            />
          )}
          <Text
            style={[
              styles.bannerDesc,
              { color: isDark ? Colors.textPrimaryDark : Colors.primaryDark },
            ]}
          >
            {category.description}
          </Text>
        </View>
      )}

      {/* Product List */}
      {products.length === 0 && !loading ? (
        <EmptyState
          title="No Formulations Found"
          description="There are currently no products registered under this category."
          actionLabel="Browse All Products"
          onAction={() => router.push('/(tabs)/products')}
        />
      ) : (
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.primary}
            />
          }
          renderItem={({ item }) => (
            <View style={styles.itemWrapper}>
              <ProductCard
                product={item}
                layout="grid"
                onPress={() => router.push(`/product/${item.id}`)}
              />
            </View>
          )}
        />
      )}
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
  banner: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  bannerImage: {
    width: 52,
    height: 52,
  },
  bannerDesc: {
    flex: 1,
    fontSize: FontSize.xs + 1,
    lineHeight: 18,
    fontFamily: FontFamily.medium,
  },
  listContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing['3xl'],
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  itemWrapper: {
    width: '48%',
  },
});
