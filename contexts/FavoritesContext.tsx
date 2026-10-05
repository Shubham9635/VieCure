import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASYNC_STORAGE_KEYS } from '../constants/config';

interface FavoritesContextType {
  favorites: string[];
  favoritesCount: number;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (productId: string) => void;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  favoritesCount: 0,
  isFavorite: () => false,
  toggleFavorite: () => {},
  clearFavorites: () => {},
});

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(ASYNC_STORAGE_KEYS.favorites).then((saved) => {
      if (saved) {
        try {
          setFavorites(JSON.parse(saved));
        } catch {}
      }
    });
  }, []);

  const saveFavorites = async (ids: string[]) => {
    setFavorites(ids);
    await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.favorites, JSON.stringify(ids));
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  const toggleFavorite = (productId: string) => {
    if (favorites.includes(productId)) {
      saveFavorites(favorites.filter((id) => id !== productId));
    } else {
      saveFavorites([...favorites, productId]);
    }
  };

  const clearFavorites = () => saveFavorites([]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoritesCount: favorites.length,
        isFavorite,
        toggleFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
