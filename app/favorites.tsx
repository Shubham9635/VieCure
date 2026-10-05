import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Trash2, Heart } from 'lucide-react-native';
import { SafeScreen } from '../components/layout/SafeScreen';
import { ProductCard } from '../components/product/ProductCard';
import { EmptyState } from '../components/ui/StateViews';
import { Colors } from '../constants/colors';
import { FontFamily, FontSize, Radius, Spacing } from '../constants/theme';
import { useTheme } from '../contexts/ThemeContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { api } from '../services/api';
import { Product } from '../types';

export default function FavoritesScreen() {
  const { isDark } = useTheme();
  const { favorites, clearFavorites } = useFavorites();
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavoriteProducts = useCallback(async () => {
    try {
      setLoading(true);
      const all = await api.getProducts();
      const filtered = all.filter((p: Product) => favorites.includes(p.id));
      setFavoriteProducts(filtered);
    } catch (err) {
      console.error('Failed to load favorites:', err);
    } finally {
      setLoading(false);
    }
  }, [favorites]);

  useEffect(() => {
    loadFavoriteProducts();
  }, [loadFavoriteProducts]);

  const handleClearAll = () => {
    Alert.alert(
      'Clear Saved Items',
      'Are you sure you want to remove all saved formulations from your favorites?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => clearFavorites(),
        },
      ]
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
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color={isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight} />
        </TouchableOpacity>

        <Text
          style={[
            styles.headerTitle,
            { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
          ]}
        >
          Saved Formulations ({favorites.length})
        </Text>

        {favorites.length > 0 ? (
          <TouchableOpacity style={styles.clearBtn} onPress={handleClearAll}>
            <Trash2 size={18} color={Colors.gray400} />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 38 }} />
        )}
      </View>

      {/* List / Empty State */}
      {favoriteProducts.length === 0 && !loading ? (
        <EmptyState
          icon={<Heart size={44} color={Colors.gray400} />}
          title="No Saved Formulations"
          description="You haven't saved any formulations yet. Tap the heart icon on any product card to bookmark it here."
          actionLabel="Explore Catalog"
          onAction={() => router.push('/(tabs)/products')}
        />
      ) : (
        <FlatList
          data={favoriteProducts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <ProductCard
                product={item}
                layout="list"
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
  clearBtn: {
    width: 38,
    height: 38,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    padding: Spacing.lg,
    paddingBottom: Spacing['3xl'],
  },
  listItem: {
    marginBottom: Spacing.md,
  },
});
