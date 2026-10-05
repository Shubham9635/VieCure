import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { Search, Heart, Bell, ChevronRight, MessageSquareCheck } from 'lucide-react-native';
import { SafeScreen } from '../../components/layout/SafeScreen';
import { HeroCarousel } from '../../components/home/HeroCarousel';
import { WhyVieCureSection } from '../../components/home/WhyVieCureSection';
import { BrandStoryCard } from '../../components/home/BrandStoryCard';
import { InteractiveVideoPreviews } from '../../components/home/InteractiveVideoPreviews';
import { ProductCard } from '../../components/product/ProductCard';
import { ProductCardSkeleton, CategoryCardSkeleton } from '../../components/ui/Skeleton';
import { Colors } from '../../constants/colors';
import { FontFamily, FontSize, Radius, Spacing, Shadow } from '../../constants/theme';
import { useTheme } from '../../contexts/ThemeContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import { api } from '../../services/api';
import { Product, Category } from '../../types';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { isDark } = useTheme();
  const { favoritesCount } = useFavorites();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const loadData = useCallback(async () => {
    try {
      const [feat, all, cats] = await Promise.all([
        api.getFeaturedProducts(),
        api.getProducts(),
        api.getCategories(),
      ]);
      setFeaturedProducts(feat);
      setAllProducts(all);
      setCategories(cats);
    } catch (err) {
      console.error('Error loading home data:', err);
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

  return (
    <SafeScreen scrollable={false}>
      {/* Top Brand Header */}
      <View
        style={[
          styles.headerBar,
          {
            backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
            borderBottomColor: isDark ? Colors.borderDark : Colors.borderLight,
          },
        ]}
      >
        <View style={styles.brandTitleWrap}>
          <Image
            source={require('../../assets/logo-circle.png')}
            style={styles.brandLogo}
            resizeMode="contain"
          />
          <View>
            <Text
              style={[
                styles.brandTitle,
                { color: isDark ? Colors.textPrimaryDark : Colors.primaryDark },
              ]}
            >
              VIECURE
            </Text>
            <Text style={styles.brandSubtitle}>LIFESCIENCES</Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={[
              styles.iconBtn,
              { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : Colors.cream },
            ]}
            onPress={() => router.push('/search')}
            accessibilityLabel="Search products"
          >
            <Search size={18} color={isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.iconBtn,
              { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : Colors.cream },
            ]}
            onPress={() => router.push('/favorites')}
            accessibilityLabel="View saved favorites"
          >
            <Heart size={18} color={isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight} />
            {favoritesCount > 0 && (
              <View style={styles.badgeCount}>
                <Text style={styles.badgeCountText}>
                  {favoritesCount > 9 ? '9+' : favoritesCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.iconBtn,
              { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : Colors.cream },
            ]}
            onPress={() => router.push('/notifications')}
            accessibilityLabel="View notifications"
          >
            <Bell size={18} color={isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight} />
            <View style={styles.badgeDot} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
          />
        }
      >
        {/* Hero Carousel */}
        <HeroCarousel
          onPress={() => router.push('/(tabs)/products')}
        />

        {/* Categories Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionOverline}>EXPLORE BY RANGE</Text>
              <Text
                style={[
                  styles.sectionHeading,
                  { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                ]}
              >
                Therapeutic Categories
              </Text>
            </View>
            <TouchableOpacity
              style={styles.viewAllBtn}
              onPress={() => router.push('/(tabs)/categories')}
            >
              <Text style={styles.viewAllText}>All Ranges</Text>
              <ChevronRight size={16} color={Colors.primary} />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <CategoryCardSkeleton key={i} />
              ))
            ) : (
              categories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  activeOpacity={0.85}
                  style={[
                    styles.categoryCard,
                    {
                      backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
                      borderColor: isDark ? Colors.borderDark : Colors.borderLight,
                    },
                  ]}
                  onPress={() => router.push(`/category/${cat.id}`)}
                >
                  <View
                    style={[
                      styles.categoryIconCircle,
                      { backgroundColor: isDark ? 'rgba(26,92,58,0.2)' : Colors.sageLight },
                    ]}
                  >
                    <Text style={styles.categoryLetter}>
                      {cat.name.charAt(0)}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.categoryName,
                      { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                    ]}
                    numberOfLines={1}
                  >
                    {cat.name}
                  </Text>
                  <Text
                    style={[
                      styles.categoryCount,
                      { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
                    ]}
                  >
                    {cat.productCount} Formulations
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </View>

        {/* Featured Formulations Carousel */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionOverline}>CLINICAL SPOTLIGHT</Text>
              <Text
                style={[
                  styles.sectionHeading,
                  { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                ]}
              >
                Featured Formulations
              </Text>
            </View>
            <TouchableOpacity
              style={styles.viewAllBtn}
              onPress={() => router.push('/(tabs)/products')}
            >
              <Text style={styles.viewAllText}>Full Catalog</Text>
              <ChevronRight size={16} color={Colors.primary} />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredScroll}
          >
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            ) : (
              featuredProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  layout="carousel"
                  onPress={() => router.push(`/product/${prod.id}`)}
                />
              ))
            )}
          </ScrollView>
        </View>

        {/* Why VieCure Section */}
        <WhyVieCureSection />

        {/* Brand Story Card */}
        <BrandStoryCard onLearnMorePress={() => router.push('/(tabs)/about')} />

        {/* Interactive Video Previews Section */}
        <InteractiveVideoPreviews />

        {/* Wholesale & Institutional CTA */}
        <View style={styles.wholesaleContainer}>
          <View
            style={[
              styles.wholesaleCard,
              {
                backgroundColor: isDark ? 'rgba(26,92,58,0.2)' : Colors.forestMist,
                borderColor: isDark ? 'rgba(122,170,138,0.3)' : Colors.sage,
              },
            ]}
          >
            <View style={styles.wholesaleIconCircle}>
              <MessageSquareCheck size={22} color={Colors.primary} />
            </View>
            <Text
              style={[
                styles.wholesaleTitle,
                { color: isDark ? Colors.textPrimaryDark : Colors.primaryDark },
              ]}
            >
              Institutional & Distribution Partnerships
            </Text>
            <Text
              style={[
                styles.wholesaleBody,
                { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
              ]}
            >
              Interested in bulk procurement, hospital distribution, or retail partnership? Inquire directly with our commercial team.
            </Text>
            <TouchableOpacity
              style={styles.wholesaleActionBtn}
              activeOpacity={0.85}
              onPress={() => router.push('/enquiry')}
            >
              <Text style={styles.wholesaleActionBtnText}>Submit Partnership Inquiry</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm + 4,
    borderBottomWidth: 1,
  },
  brandTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandLogo: {
    width: 40,
    height: 40,
  },
  brandTitle: {
    fontSize: FontSize.md,
    fontFamily: FontFamily.bold,
    fontWeight: '800',
    letterSpacing: 2.5,
    lineHeight: 18,
  },
  brandSubtitle: {
    fontSize: 9,
    fontFamily: FontFamily.medium,
    color: Colors.sage,
    letterSpacing: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badgeCount: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: Colors.primary,
    borderRadius: Radius.full,
    paddingHorizontal: 4,
    paddingVertical: 1,
    minWidth: 16,
    alignItems: 'center',
  },
  badgeCountText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontFamily: FontFamily.bold,
    fontWeight: '700',
  },
  badgeDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.gold,
  },
  scrollContent: {
    paddingBottom: Spacing['3xl'],
  },
  sectionContainer: {
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  sectionOverline: {
    fontSize: FontSize.xs - 1,
    fontFamily: FontFamily.bold,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 1.2,
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  sectionHeading: {
    fontSize: FontSize.xl,
    fontFamily: FontFamily.serifBold,
    fontWeight: '700',
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingBottom: 2,
  },
  viewAllText: {
    fontSize: FontSize.xs + 1,
    fontFamily: FontFamily.bold,
    fontWeight: '600',
    color: Colors.primary,
  },
  categoriesScroll: {
    paddingRight: Spacing.lg,
    gap: Spacing.sm + 4,
  },
  categoryCard: {
    width: 130,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    alignItems: 'center',
    ...Shadow.sm,
  },
  categoryIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  categoryLetter: {
    fontSize: FontSize.lg,
    fontFamily: FontFamily.serifBold,
    color: Colors.primary,
    fontWeight: '700',
  },
  categoryName: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.bold,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 2,
  },
  categoryCount: {
    fontSize: FontSize.xs - 1,
    fontFamily: FontFamily.regular,
  },
  featuredScroll: {
    paddingRight: Spacing.lg,
    gap: Spacing.md,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    justifyContent: 'space-between',
  },
  viewMoreCatalogBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: Spacing.md,
    marginTop: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
  },
  viewMoreCatalogText: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.bold,
    fontWeight: '700',
    color: Colors.primary,
  },
  wholesaleContainer: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
  },
  wholesaleCard: {
    padding: Spacing.xl,
    borderRadius: Radius.xl,
    borderWidth: 1,
    alignItems: 'center',
    textAlign: 'center',
    ...Shadow.sm,
  },
  wholesaleIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    ...Shadow.sm,
  },
  wholesaleTitle: {
    fontSize: FontSize.md + 1,
    fontFamily: FontFamily.serifBold,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  wholesaleBody: {
    fontSize: FontSize.xs + 1,
    lineHeight: 18,
    fontFamily: FontFamily.regular,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    maxWidth: '92%',
  },
  wholesaleActionBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md - 2,
    borderRadius: Radius.full,
  },
  wholesaleActionBtnText: {
    color: '#FFFFFF',
    fontSize: FontSize.sm,
    fontFamily: FontFamily.bold,
    fontWeight: '700',
  },
});
