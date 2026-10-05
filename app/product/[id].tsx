import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Dimensions,
  Image,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import {
  ArrowLeft,
  Heart,
  Share2,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Layers,
  ChevronRight,
} from 'lucide-react-native';
import { SafeScreen } from '../../components/layout/SafeScreen';
import { Badge } from '../../components/common/Badge';
import { ProductCard } from '../../components/product/ProductCard';
import { Colors } from '../../constants/colors';
import { FontFamily, FontSize, Radius, Spacing, Shadow } from '../../constants/theme';
import { useTheme } from '../../contexts/ThemeContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import { api } from '../../services/api';
import { Product } from '../../types';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isDark } = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProduct = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const data = await api.getProductById(id);
      if (data) {
        setProduct(data);
        const related = await api.getProductsByCategory(data.categoryId);
        setRelatedProducts(related.filter((p: Product) => p.id !== data.id));
      }
    } catch (err) {
      console.error('Failed to load product detail:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const handleShare = async () => {
    if (!product) return;
    try {
      await Share.share({
        title: product.name,
        message: `${product.name} - Viecure Lifesciences: ${product.description}`,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEnquire = () => {
    if (!product) return;
    router.push({
      pathname: '/enquiry',
      params: { productId: product.id, productName: product.name },
    });
  };

  if (loading || !product) {
    return (
      <SafeScreen>
        <View style={styles.loadingContainer}>
          <Text style={{ color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight }}>
            Loading formulation details...
          </Text>
        </View>
      </SafeScreen>
    );
  }

  const isFav = isFavorite(product.id);
  const imageSource = product.localImage ?? (product.images && product.images.length > 0 ? { uri: product.images[0] } : null);

  return (
    <SafeScreen scrollable={false}>
      {/* Top App Header */}
      <View
        style={[
          styles.headerBar,
          {
            backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
            borderBottomColor: isDark ? Colors.borderDark : Colors.borderLight,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => router.back()}
          accessibilityLabel="Go back"
        >
          <ArrowLeft size={20} color={isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight} />
        </TouchableOpacity>

        <Text
          style={[
            styles.headerTitle,
            { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
          ]}
          numberOfLines={1}
        >
          {product.name}
        </Text>

        <View style={styles.headerRightBtns}>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={handleShare}
            accessibilityLabel="Share product"
          >
            <Share2 size={18} color={isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => toggleFavorite(product.id)}
            accessibilityLabel="Toggle favorite"
          >
            <Heart
              size={20}
              color={isFav ? '#E04F5F' : isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight}
              fill={isFav ? '#E04F5F' : 'transparent'}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Product Visual Container / Image */}
        <View
          style={[
            styles.visualContainer,
            imageSource ? styles.visualContainerWithImage : null,
            {
              backgroundColor: isDark ? '#0f2417' : Colors.sageLight,
              borderColor: isDark ? Colors.borderDark : Colors.borderLight,
            },
          ]}
        >
          {imageSource ? (
            <View style={styles.visualImageWrapper}>
              <Image source={imageSource} style={styles.detailProductImage} resizeMode="cover" />
              <View style={[styles.visualBadgeRow, styles.visualBadgeRowOverlay]}>
                <Badge label={product.category || product.categoryName || 'General'} variant="primary" size="sm" />
                {product.isFeatured && <Badge label="Featured" variant="gold" size="sm" />}
              </View>
              <View style={[styles.visualBottomStrip, styles.visualBottomStripOverlay]}>
                <ShieldCheck size={14} color="#FFFFFF" />
                <Text style={[styles.visualBottomText, { color: '#FFFFFF' }]}>GMP Certified & Quality Inspected</Text>
              </View>
            </View>
          ) : (
            <>
              <View style={styles.visualBadgeRow}>
                <Badge label={product.category || product.categoryName || 'General'} variant="primary" size="sm" />
                {product.isFeatured && <Badge label="Featured" variant="gold" size="sm" />}
              </View>

              <View style={styles.visualPlaceholderGraphic}>
                <View style={styles.visualIconCircle}>
                  <Layers size={48} color={Colors.primary} />
                </View>
                <Text style={styles.visualProductTitle}>{product.name}</Text>
                <Text style={styles.visualSubtitle}>Pharmaceutical Grade Formulation</Text>
              </View>

              <View style={styles.visualBottomStrip}>
                <ShieldCheck size={14} color={Colors.primaryDark} />
                <Text style={styles.visualBottomText}>GMP Certified & Quality Inspected</Text>
              </View>
            </>
          )}
        </View>

        {/* Product Meta Card */}
        <View style={styles.metaCard}>
          <Text
            style={[
              styles.productTitle,
              { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
            ]}
          >
            {product.name}
          </Text>

          <Text
            style={[
              styles.productDescription,
              { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
            ]}
          >
            {product.description}
          </Text>

          {/* Key Specifications */}
          <View
            style={[
              styles.specsRow,
              {
                backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
                borderColor: isDark ? Colors.borderDark : Colors.borderLight,
              },
            ]}
          >
            <View style={styles.specItem}>
              <Text
                style={[
                  styles.specLabel,
                  { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
                ]}
              >
                CATEGORY
              </Text>
              <Text
                style={[
                  styles.specValue,
                  { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                ]}
              >
                {product.category}
              </Text>
            </View>

            <View
              style={[
                styles.specDivider,
                { backgroundColor: isDark ? Colors.borderDark : Colors.borderLight },
              ]}
            />

            <View style={styles.specItem}>
              <Text
                style={[
                  styles.specLabel,
                  { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
                ]}
              >
                STATUS
              </Text>
              <Text style={[styles.specValue, { color: Colors.primary }]}>
                Available for Order
              </Text>
            </View>
          </View>
        </View>

        {/* Active Ingredients Section */}
        {product.activeIngredients && product.activeIngredients.length > 0 && (
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeaderRow}>
              <Sparkles size={18} color={Colors.primary} />
              <Text
                style={[
                  styles.sectionHeading,
                  { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                ]}
              >
                Bio-Active Key Ingredients
              </Text>
            </View>
            <View style={styles.ingredientsPills}>
              {product.activeIngredients.map((ingredient, index) => (
                <View
                  key={index}
                  style={[
                    styles.ingredientChip,
                    {
                      backgroundColor: isDark ? 'rgba(26,92,58,0.25)' : Colors.forestMist,
                      borderColor: isDark ? Colors.borderDark : Colors.sage,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.ingredientChipText,
                      { color: isDark ? Colors.sageLight : Colors.primaryDark },
                    ]}
                  >
                    {ingredient}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Benefits & Indications */}
        {product.benefits && product.benefits.length > 0 && (
          <View style={styles.sectionCard}>
            <Text
              style={[
                styles.sectionHeading,
                { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
              ]}
            >
              Clinical Indications & Benefits
            </Text>
            <View style={styles.benefitsList}>
              {product.benefits.map((benefit, index) => (
                <View key={index} style={styles.benefitItem}>
                  <CheckCircle size={16} color={Colors.primary} style={{ marginTop: 2 }} />
                  <Text
                    style={[
                      styles.benefitText,
                      { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                    ]}
                  >
                    {benefit}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* How to Use */}
        {product.howToUse && (
          <View style={styles.sectionCard}>
            <Text
              style={[
                styles.sectionHeading,
                { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
              ]}
            >
              Recommended Usage & Directions
            </Text>
            <Text
              style={[
                styles.bodyText,
                { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
              ]}
            >
              {product.howToUse}
            </Text>
          </View>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <View style={styles.relatedSection}>
            <View style={styles.sectionHeaderRow}>
              <Text
                style={[
                  styles.sectionHeading,
                  { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                ]}
              >
                Complementary Formulations
              </Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.relatedScroll}
            >
              {relatedProducts.map((rel) => (
                <ProductCard
                  key={rel.id}
                  product={rel}
                  layout="carousel"
                  onPress={() => router.push(`/product/${rel.id}`)}
                />
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>

      {/* Sticky Bottom Action Bar */}
      <View
        style={[
          styles.bottomActionBar,
          {
            backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
            borderTopColor: isDark ? Colors.borderDark : Colors.borderLight,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.enquireButton}
          activeOpacity={0.88}
          onPress={handleEnquire}
        >
          <Text style={styles.enquireButtonText}>Inquire for Pricing & Orders</Text>
          <ChevronRight size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
  },
  headerTitle: {
    flex: 1,
    fontSize: FontSize.md,
    fontFamily: FontFamily.bold,
    textAlign: 'center',
    marginHorizontal: Spacing.sm,
  },
  headerBtn: {
    width: 38,
    height: 38,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRightBtns: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: 100,
  },
  visualContainer: {
    height: 240,
    borderRadius: Radius.xl,
    borderWidth: 1,
    padding: Spacing.md,
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
    overflow: 'hidden',
  },
  visualContainerWithImage: {
    height: 300,
    padding: 0,
  },
  visualImageWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  detailProductImage: {
    width: '100%',
    height: '100%',
  },
  visualBadgeRowOverlay: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    right: Spacing.md,
    zIndex: 2,
  },
  visualBottomStripOverlay: {
    position: 'absolute',
    bottom: Spacing.sm,
    left: Spacing.md,
    right: Spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    paddingVertical: 6,
    borderRadius: Radius.full,
  },
  visualBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  visualPlaceholderGraphic: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  visualIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
    ...Shadow.sm,
  },
  visualProductTitle: {
    fontSize: FontSize.lg,
    fontFamily: FontFamily.serifBold,
    color: Colors.primaryDark,
    textAlign: 'center',
  },
  visualSubtitle: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.medium,
    color: Colors.primary,
    marginTop: 2,
  },
  visualBottomStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  visualBottomText: {
    fontSize: FontSize.xs - 1,
    fontFamily: FontFamily.bold,
    color: Colors.primaryDark,
  },
  metaCard: {
    marginBottom: Spacing.lg,
  },
  productTitle: {
    fontSize: FontSize['2xl'],
    fontFamily: FontFamily.serifBold,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  productDescription: {
    fontSize: FontSize.sm + 1,
    lineHeight: 22,
    fontFamily: FontFamily.regular,
    marginBottom: Spacing.md,
  },
  specsRow: {
    flexDirection: 'row',
    borderRadius: Radius.lg,
    borderWidth: 1,
    padding: Spacing.md,
  },
  specItem: {
    flex: 1,
    alignItems: 'center',
  },
  specDivider: {
    width: 1,
    height: '100%',
  },
  specLabel: {
    fontSize: FontSize.xs - 1,
    fontFamily: FontFamily.bold,
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  specValue: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.bold,
  },
  sectionCard: {
    marginBottom: Spacing.lg,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: Spacing.sm,
  },
  sectionHeading: {
    fontSize: FontSize.md + 1,
    fontFamily: FontFamily.serifBold,
    fontWeight: '700',
    marginBottom: Spacing.sm,
  },
  ingredientsPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  ingredientChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  ingredientChipText: {
    fontSize: FontSize.xs + 1,
    fontFamily: FontFamily.medium,
  },
  benefitsList: {
    gap: 8,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  benefitText: {
    fontSize: FontSize.sm,
    lineHeight: 20,
    fontFamily: FontFamily.regular,
    flex: 1,
  },
  bodyText: {
    fontSize: FontSize.sm,
    lineHeight: 22,
    fontFamily: FontFamily.regular,
  },
  relatedSection: {
    marginTop: Spacing.md,
  },
  relatedScroll: {
    gap: Spacing.md,
    paddingRight: Spacing.lg,
  },
  bottomActionBar: {
    padding: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderTopWidth: 1,
  },
  enquireButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: Radius.full,
    ...Shadow.sm,
  },
  enquireButtonText: {
    color: '#FFFFFF',
    fontSize: FontSize.sm + 1,
    fontFamily: FontFamily.bold,
    fontWeight: '700',
  },
});
