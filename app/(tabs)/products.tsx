import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List as ListIcon,
  X,
  Sparkles,
} from 'lucide-react-native';
import { SafeScreen } from '../../components/layout/SafeScreen';
import { ProductCard } from '../../components/product/ProductCard';
import { CategoryPill } from '../../components/product/CategoryPill';
import { ProductCardSkeleton } from '../../components/ui/Skeleton';
import { EmptyState } from '../../components/ui/StateViews';
import { Colors } from '../../constants/colors';
import { FontFamily, FontSize, Radius, Spacing, Shadow } from '../../constants/theme';
import { useTheme } from '../../contexts/ThemeContext';
import { api } from '../../services/api';
import { Product, Category } from '../../types';

const { width } = Dimensions.get('window');

type SortOption = 'featured' | 'name-asc' | 'name-desc';

export default function ProductsScreen() {
  const { isDark } = useTheme();
  const params = useLocalSearchParams<{ category?: string }>();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    params.category || 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showSortModal, setShowSortModal] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const [allProds, cats] = await Promise.all([
        api.getProducts(),
        api.getCategories(),
      ]);
      setProducts(allProds);
      setCategories(cats);
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (params.category) {
      setSelectedCategory(params.category);
    }
  }, [params.category]);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(
        (p) =>
          p.categoryId === selectedCategory ||
          p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.activeIngredients?.some((ing) => ing.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'featured') {
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <SafeScreen scrollable={false}>
      {/* Search & Header Bar */}
      <View
        style={[
          styles.headerSection,
          {
            backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
            borderBottomColor: isDark ? Colors.borderDark : Colors.borderLight,
          },
        ]}
      >
        <Text
          style={[
            styles.headerTitle,
            { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
          ]}
        >
          Formulation Catalog
        </Text>

        {/* Search input */}
        <View
          style={[
            styles.searchBar,
            {
              backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : Colors.cream,
              borderColor: isDark ? Colors.borderDark : Colors.borderLight,
            },
          ]}
        >
          <Search size={18} color={isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight} />
          <TextInput
            placeholder="Search by name, ingredient, or indication..."
            placeholderTextColor={isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[
              styles.searchInput,
              { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
            ]}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={16} color={isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight} />
            </TouchableOpacity>
          )}
        </View>

        {/* Category Filter Pills */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[{ id: 'all', name: 'All Ranges' }, ...categories]}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.pillsContainer}
          renderItem={({ item }) => (
            <CategoryPill
              label={item.name}
              isSelected={selectedCategory === item.id}
              onPress={() => setSelectedCategory(item.id)}
            />
          )}
        />

        {/* Controls Toolbar: Count, Sort, Grid/List view toggle */}
        <View style={styles.toolbar}>
          <Text
            style={[
              styles.resultCount,
              { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
            ]}
          >
            Showing {filteredProducts.length} Formulations
          </Text>

          <View style={styles.toolbarActions}>
            <TouchableOpacity
              style={[
                styles.sortButton,
                {
                  backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#F2F4F2',
                },
              ]}
              onPress={() => setShowSortModal(!showSortModal)}
            >
              <SlidersHorizontal size={14} color={Colors.primary} />
              <Text style={styles.sortButtonText}>
                {sortBy === 'featured' ? 'Featured' : sortBy === 'name-asc' ? 'A-Z' : 'Z-A'}
              </Text>
            </TouchableOpacity>

            <View style={styles.viewToggleGroup}>
              <TouchableOpacity
                style={[
                  styles.viewToggleBtn,
                  layout === 'grid' && styles.viewToggleActive,
                ]}
                onPress={() => setLayout('grid')}
              >
                <LayoutGrid
                  size={16}
                  color={layout === 'grid' ? Colors.primary : Colors.gray400}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.viewToggleBtn,
                  layout === 'list' && styles.viewToggleActive,
                ]}
                onPress={() => setLayout('list')}
              >
                <ListIcon
                  size={16}
                  color={layout === 'list' ? Colors.primary : Colors.gray400}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Sort popup dropdown */}
        {showSortModal && (
          <View
            style={[
              styles.sortDropdown,
              {
                backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
                borderColor: isDark ? Colors.borderDark : Colors.borderLight,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.sortOption}
              onPress={() => {
                setSortBy('featured');
                setShowSortModal(false);
              }}
            >
              <Text
                style={[
                  styles.sortOptionText,
                  sortBy === 'featured' && { color: Colors.primary, fontWeight: '700' },
                  { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                ]}
              >
                Featured First
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sortOption}
              onPress={() => {
                setSortBy('name-asc');
                setShowSortModal(false);
              }}
            >
              <Text
                style={[
                  styles.sortOptionText,
                  sortBy === 'name-asc' && { color: Colors.primary, fontWeight: '700' },
                  { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                ]}
              >
                Name: A to Z
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sortOption}
              onPress={() => {
                setSortBy('name-desc');
                setShowSortModal(false);
              }}
            >
              <Text
                style={[
                  styles.sortOptionText,
                  sortBy === 'name-desc' && { color: Colors.primary, fontWeight: '700' },
                  { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                ]}
              >
                Name: Z to A
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Product List / Grid */}
      {loading ? (
        <View style={styles.skeletonGrid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </View>
      ) : filteredProducts.length === 0 ? (
        <EmptyState
          title="No Formulations Found"
          description="We couldn't find any products matching your current filters or search terms."
          actionLabel="Reset All Filters"
          onAction={() => {
            setSearchQuery('');
            setSelectedCategory('all');
          }}
        />
      ) : (
        <FlatList
          key={layout} // Force re-render when switching between 1 and 2 columns
          data={filteredProducts}
          numColumns={layout === 'grid' ? 2 : 1}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={layout === 'grid' ? styles.columnWrapper : undefined}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.primary}
            />
          }
          renderItem={({ item }) => (
            <View style={layout === 'grid' ? styles.gridItemWrapper : styles.listItemWrapper}>
              <ProductCard
                product={item}
                layout={layout}
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
  headerSection: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    position: 'relative',
    zIndex: 10,
  },
  headerTitle: {
    fontSize: FontSize['2xl'],
    fontFamily: FontFamily.serifBold,
    fontWeight: '700',
    marginBottom: Spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: Spacing.md,
    height: 44,
    borderRadius: Radius.lg,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSize.sm,
    fontFamily: FontFamily.regular,
    paddingVertical: 0,
  },
  pillsContainer: {
    paddingBottom: Spacing.md,
    gap: Spacing.xs,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.xs,
  },
  resultCount: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.medium,
  },
  toolbarActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: Spacing.md,
    paddingVertical: 5,
    borderRadius: Radius.full,
  },
  sortButtonText: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.bold,
    fontWeight: '600',
    color: Colors.primary,
  },
  viewToggleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: Radius.md,
    padding: 2,
  },
  viewToggleBtn: {
    padding: 5,
    borderRadius: Radius.sm,
  },
  viewToggleActive: {
    backgroundColor: '#FFFFFF',
    ...Shadow.xs,
  },
  sortDropdown: {
    position: 'absolute',
    top: 175,
    right: Spacing.lg,
    width: 150,
    borderRadius: Radius.lg,
    borderWidth: 1,
    padding: Spacing.xs,
    ...Shadow.md,
    zIndex: 100,
  },
  sortOption: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.sm,
  },
  sortOptionText: {
    fontSize: FontSize.xs + 1,
    fontFamily: FontFamily.medium,
  },
  listContainer: {
    padding: Spacing.lg,
    paddingBottom: Spacing['3xl'],
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  gridItemWrapper: {
    width: '48%',
  },
  listItemWrapper: {
    marginBottom: Spacing.md,
  },
  skeletonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: Spacing.lg,
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
});
