import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Search, X, Clock, Trash2, TrendingUp } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeScreen } from '../components/layout/SafeScreen';
import { ProductCard } from '../components/product/ProductCard';
import { EmptyState } from '../components/ui/StateViews';
import { Colors } from '../constants/colors';
import { FontFamily, FontSize, Radius, Spacing } from '../constants/theme';
import { useTheme } from '../contexts/ThemeContext';
import { ASYNC_STORAGE_KEYS } from '../constants/config';
import { api } from '../services/api';
import { Product } from '../types';

const POPULAR_SEARCHES = [
  'Niacinamide',
  'Hyaluronic',
  'Salicylic Acid',
  'Sunscreen',
  'Hair Growth',
  'Dermatology',
  'Moisturizer',
];

export default function SearchScreen() {
  const { isDark } = useTheme();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    loadRecentSearches();
  }, []);

  const loadRecentSearches = async () => {
    try {
      const stored = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.recentSearches);
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const saveRecentSearch = async (term: string) => {
    if (!term.trim()) return;
    try {
      const updated = [term, ...recentSearches.filter((s) => s.toLowerCase() !== term.toLowerCase())].slice(0, 8);
      setRecentSearches(updated);
      await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.recentSearches, JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  const clearRecentSearches = async () => {
    try {
      setRecentSearches([]);
      await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.recentSearches);
    } catch (err) {
      console.error(err);
    }
  };

  const executeSearch = useCallback(async (text: string) => {
    if (!text.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    try {
      const found = await api.searchProducts(text);
      setResults(found);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleTextChange = (text: string) => {
    setQuery(text);
    executeSearch(text);
  };

  const handleSelectSearch = (term: string) => {
    setQuery(term);
    saveRecentSearch(term);
    executeSearch(term);
    Keyboard.dismiss();
  };

  return (
    <SafeScreen scrollable={false}>
      {/* Header Search Bar */}
      <View
        style={[
          styles.searchHeader,
          {
            backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
            borderBottomColor: isDark ? Colors.borderDark : Colors.borderLight,
          },
        ]}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color={isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight} />
        </TouchableOpacity>

        <View
          style={[
            styles.inputWrap,
            {
              backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : Colors.cream,
              borderColor: isDark ? Colors.borderDark : Colors.borderLight,
            },
          ]}
        >
          <Search size={18} color={isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight} />
          <TextInput
            autoFocus
            placeholder="Search products, actives, benefits..."
            placeholderTextColor={isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight}
            value={query}
            onChangeText={handleTextChange}
            onSubmitEditing={() => saveRecentSearch(query)}
            returnKeyType="search"
            style={[
              styles.input,
              { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
            ]}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => handleTextChange('')}>
              <X size={16} color={isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* When no active query, show recent and popular tags */}
      {query.trim().length === 0 ? (
        <View style={styles.suggestionsContainer}>
          {recentSearches.length > 0 && (
            <View style={styles.sectionBlock}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionHeaderTitle}>
                  <Clock size={16} color={Colors.primary} />
                  <Text
                    style={[
                      styles.sectionHeading,
                      { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                    ]}
                  >
                    Recent Searches
                  </Text>
                </View>
                <TouchableOpacity onPress={clearRecentSearches}>
                  <Text style={styles.clearText}>Clear All</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.chipsWrap}>
                {recentSearches.map((term, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[
                      styles.chip,
                      {
                        backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
                        borderColor: isDark ? Colors.borderDark : Colors.borderLight,
                      },
                    ]}
                    onPress={() => handleSelectSearch(term)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                      ]}
                    >
                      {term}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Popular / Trending Topics */}
          <View style={styles.sectionBlock}>
            <View style={styles.sectionHeaderTitle}>
              <TrendingUp size={16} color={Colors.gold} />
              <Text
                style={[
                  styles.sectionHeading,
                  { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                ]}
              >
                Suggested Formulations & Ingredients
              </Text>
            </View>

            <View style={styles.chipsWrap}>
              {POPULAR_SEARCHES.map((term, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.chip,
                    {
                      backgroundColor: isDark ? 'rgba(26,92,58,0.15)' : Colors.sageLight,
                      borderColor: isDark ? Colors.borderDark : Colors.borderLight,
                    },
                  ]}
                  onPress={() => handleSelectSearch(term)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      { color: isDark ? Colors.sageLight : Colors.primaryDark },
                    ]}
                  >
                    {term}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      ) : results.length === 0 ? (
        <EmptyState
          title="No Results Found"
          description={`We couldn't find any products matching "${query}". Try searching by an ingredient like Niacinamide or category like Skincare.`}
          actionLabel="Clear Search"
          onAction={() => handleTextChange('')}
        />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.resultsList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.resultItem}>
              <ProductCard
                product={item}
                layout="list"
                onPress={() => {
                  saveRecentSearch(query);
                  router.push(`/product/${item.id}`);
                }}
              />
            </View>
          )}
        />
      )}
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 42,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: FontSize.sm,
    fontFamily: FontFamily.regular,
    paddingVertical: 0,
  },
  suggestionsContainer: {
    padding: Spacing.lg,
  },
  sectionBlock: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  sectionHeaderTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: Spacing.md,
  },
  sectionHeading: {
    fontSize: FontSize.sm + 1,
    fontFamily: FontFamily.bold,
    fontWeight: '700',
  },
  clearText: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.medium,
    color: Colors.gray400,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  chipText: {
    fontSize: FontSize.xs + 1,
    fontFamily: FontFamily.medium,
  },
  resultsList: {
    padding: Spacing.lg,
    paddingBottom: Spacing['3xl'],
  },
  resultItem: {
    marginBottom: Spacing.md,
  },
});
