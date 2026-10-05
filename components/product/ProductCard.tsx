import React, { memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Heart } from 'lucide-react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import { Product } from '../../types';
import { FontFamily, FontSize, Radius, Shadow, Spacing } from '../../constants/theme';
import { Colors } from '../../constants/colors';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
  style?: ViewStyle;
  layout?: 'grid' | 'list' | 'carousel';
}

export const ProductCard = memo(({ product, onPress, style, layout = 'grid' }: ProductCardProps) => {
  const { theme } = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites();
  const scale = useSharedValue(1);
  const heartScale = useSharedValue(1);
  const favorite = isFavorite(product.id);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 20, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 20, stiffness: 400 });
  };

  const handleFavorite = () => {
    heartScale.value = withSpring(1.4, { damping: 10, stiffness: 500 }, () => {
      heartScale.value = withSpring(1, { damping: 15, stiffness: 300 });
    });
    toggleFavorite(product.id);
  };

  const heartAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const imageSource = product.localImage ?? (product.images && product.images.length > 0 ? { uri: product.images[0] } : null);
  const hasImage = Boolean(imageSource);

  if (!hasImage) {
    return null;
  }

  if (layout === 'list') {
    return (
      <AnimatedTouchable
        style={[animStyle, styles.listCard, { backgroundColor: theme.card, borderColor: theme.border }, style]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => onPress(product)}
        activeOpacity={0.95}
      >
        <View style={[styles.listImageWrap, { backgroundColor: theme.inputBg }]}>
          {hasImage && imageSource ? (
            <Image source={imageSource} style={styles.listImage} resizeMode="cover" />
          ) : (
            <View style={[styles.listImagePlaceholder, { backgroundColor: theme.inputBg }]}>
              <Text style={[styles.placeholderText, { color: theme.textTertiary }]}>
                {product.name[0]}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.listInfo}>
          <Text style={[styles.category, { color: theme.primary }]} numberOfLines={1}>
            {product.categoryName}
          </Text>
          <Text style={[styles.listName, { color: theme.text }]} numberOfLines={2}>
            {product.name}
          </Text>
          <Text style={[styles.desc, { color: theme.textSecondary }]} numberOfLines={2}>
            {product.shortDescription}
          </Text>
        </View>
        <Animated.View style={heartAnimStyle}>
          <TouchableOpacity onPress={handleFavorite} style={styles.heartBtn} hitSlop={8}>
            <Heart
              size={20}
              color={favorite ? Colors.error : theme.textTertiary}
              fill={favorite ? Colors.error : 'transparent'}
            />
          </TouchableOpacity>
        </Animated.View>
      </AnimatedTouchable>
    );
  }

  // Grid / Carousel layout
  return (
    <AnimatedTouchable
      style={[animStyle, styles.gridCard, { backgroundColor: theme.card }, Shadow.md, style]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => onPress(product)}
      activeOpacity={0.95}
    >
      {/* Image */}
      <View style={[styles.imageWrap, { backgroundColor: theme.inputBg }]}>
        {hasImage && imageSource ? (
          <Image source={imageSource} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={[styles.imagePlaceholder]}>
            <Text style={[styles.placeholderInitial, { color: theme.primary }]}>
              {product.name[0]}
            </Text>
            <Text style={[styles.placeholderLabel, { color: theme.textTertiary }]}>
              {product.categoryName}
            </Text>
          </View>
        )}
        {/* Favorite button */}
        <Animated.View style={[styles.favoriteAbsolute, heartAnimStyle]}>
          <TouchableOpacity onPress={handleFavorite} style={styles.favoriteBtn} hitSlop={8}>
            <Heart
              size={18}
              color={favorite ? Colors.error : Colors.white}
              fill={favorite ? Colors.error : 'transparent'}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Content */}
      <View style={styles.gridContent}>
        <Text style={[styles.category, { color: theme.primary }]} numberOfLines={1}>
          {product.categoryName}
        </Text>
        <Text style={[styles.gridName, { color: theme.text }]} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={[styles.desc, { color: theme.textSecondary }]} numberOfLines={2}>
          {product.shortDescription}
        </Text>

        <TouchableOpacity
          style={[styles.viewBtn, { borderColor: theme.primary }]}
          onPress={() => onPress(product)}
          activeOpacity={0.8}
        >
          <Text style={[styles.viewBtnText, { color: theme.primary }]}>View Details</Text>
        </TouchableOpacity>
      </View>
    </AnimatedTouchable>
  );
});

ProductCard.displayName = 'ProductCard';

const styles = StyleSheet.create({
  // Grid card
  gridCard: {
    flex: 1,
    margin: Spacing[2],
    borderRadius: Radius.xl,
    overflow: 'hidden',
  },
  imageWrap: {
    height: 160,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  placeholderInitial: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize['4xl'],
    opacity: 0.3,
  },
  placeholderLabel: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.xs,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  favoriteAbsolute: {
    position: 'absolute',
    top: Spacing[2],
    right: Spacing[2],
  },
  favoriteBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridContent: {
    padding: Spacing[3],
    gap: Spacing[1],
  },
  category: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  gridName: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.base,
    lineHeight: FontSize.base * 1.35,
  },
  desc: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.sm,
    lineHeight: FontSize.sm * 1.5,
    marginBottom: Spacing[1],
  },
  viewBtn: {
    marginTop: Spacing[2],
    borderWidth: 1,
    borderRadius: Radius.md,
    paddingVertical: Spacing[2],
    alignItems: 'center',
  },
  viewBtnText: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.sm,
  },

  // List card
  listCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.xl,
    borderWidth: 1,
    padding: Spacing[3],
    marginBottom: Spacing[3],
    gap: Spacing[3],
  },
  listImageWrap: {
    width: 80,
    height: 80,
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },
  listImage: {
    width: '100%',
    height: '100%',
  },
  listImagePlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize['2xl'],
    opacity: 0.3,
  },
  listInfo: {
    flex: 1,
    gap: Spacing[1],
  },
  listName: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.base,
    lineHeight: FontSize.base * 1.3,
  },
  heartBtn: {
    padding: Spacing[2],
  },
});
