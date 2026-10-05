import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Switch,
  RefreshControl,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import {
  ArrowLeft,
  Search,
  Star,
  Layers,
  ChevronRight,
  Sparkles,
} from 'lucide-react-native';
import { SafeScreen } from '../../components/layout/SafeScreen';
import { Badge } from '../../components/common/Badge';
import { Colors } from '../../constants/colors';
import { FontFamily, FontSize, Radius, Spacing, Shadow } from '../../constants/theme';
import { useTheme } from '../../contexts/ThemeContext';
import { api } from '../../services/api';
import { Product } from '../../types';

export default function AdminProductsScreen() {
  const { isDark } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadProducts = useCallback(async () => {
    try {
      const data = await api.getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const onRefresh = () => {
    setRefreshing(true);
    loadProducts();
  };

  const toggleFeatured = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = !p.isFeatured;
          Alert.alert(
            'Visibility Updated',
            `Product "${p.name}" ${updated ? 'added to' : 'removed from'} spotlight carousel.`
          );
          return { ...p, isFeatured: updated };
        }
        return p;
      })
    );
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.category?.toLowerCase() || '').includes(search.toLowerCase())
  );

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
          Catalog Admin ({filtered.length})
        </Text>
        <View style={{ width: 38 }} />
      </View>

      {/* Search Input */}
      <View
        style={[
          styles.searchSection,
          {
            backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
            borderBottomColor: isDark ? Colors.borderDark : Colors.borderLight,
          },
        ]}
      >
        <View
          style={[
            styles.searchInputWrap,
            {
              backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : Colors.cream,
              borderColor: isDark ? Colors.borderDark : Colors.borderLight,
            },
          ]}
        >
          <Search size={16} color={isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight} />
          <TextInput
            placeholder="Filter catalog products..."
            placeholderTextColor={isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight}
            value={search}
            onChangeText={setSearch}
            style={[
              styles.input,
              { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
            ]}
          />
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
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
          <View
            style={[
              styles.productItemCard,
              {
                backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
                borderColor: isDark ? Colors.borderDark : Colors.borderLight,
              },
            ]}
          >
            <View style={styles.cardTop}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarLetter}>{item.name.charAt(0)}</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.prodTitle,
                    { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                  ]}
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
                <Text
                  style={[
                    styles.prodCategory,
                    { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
                  ]}
                >
                  {item.category}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.viewProdBtn}
                onPress={() => router.push(`/product/${item.id}`)}
              >
                <ChevronRight size={18} color={Colors.primary} />
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.controlsDivider,
                { backgroundColor: isDark ? Colors.borderDark : Colors.borderLight },
              ]}
            />

            <View style={styles.cardBottomControls}>
              <View style={styles.featuredToggleRow}>
                <Sparkles size={16} color={item.isFeatured ? Colors.gold : Colors.gray400} />
                <Text
                  style={[
                    styles.featuredLabel,
                    { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                  ]}
                >
                  Spotlight Carousel
                </Text>
              </View>

              <Switch
                value={item.isFeatured}
                onValueChange={() => toggleFeatured(item.id)}
                trackColor={{ false: Colors.gray300, true: Colors.primary }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        )}
      />
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
  searchSection: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
  },
  searchInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 40,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: FontSize.sm,
    fontFamily: FontFamily.regular,
    paddingVertical: 0,
  },
  listContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing['3xl'],
    gap: Spacing.md,
  },
  productItemCard: {
    padding: Spacing.md,
    borderRadius: Radius.xl,
    borderWidth: 1,
    ...Shadow.sm,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.sageLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    fontSize: FontSize.lg,
    fontFamily: FontFamily.serifBold,
    color: Colors.primaryDark,
    fontWeight: '700',
  },
  prodTitle: {
    fontSize: FontSize.sm + 1,
    fontFamily: FontFamily.bold,
    fontWeight: '700',
    marginBottom: 2,
  },
  prodCategory: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.medium,
  },
  viewProdBtn: {
    width: 34,
    height: 34,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlsDivider: {
    height: 1,
    marginVertical: Spacing.sm,
  },
  cardBottomControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 2,
  },
  featuredToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  featuredLabel: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.medium,
  },
});
