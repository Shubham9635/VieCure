import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeType } from '../constants/theme';
import { ASYNC_STORAGE_KEYS } from '../constants/config';
import { ThemeMode } from '../types';

interface ThemeContextType {
  themeMode: ThemeMode;
  theme: ThemeType;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  themeMode: 'system',
  theme: Theme.light,
  isDark: false,
  setThemeMode: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');

  useEffect(() => {
    AsyncStorage.getItem(ASYNC_STORAGE_KEYS.themeMode).then((saved) => {
      if (saved === 'light' || saved === 'dark' || saved === 'system') {
        setThemeModeState(saved);
      }
    });
  }, []);

  const setThemeMode = async (mode: ThemeMode) => {
    setThemeModeState(mode);
    await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.themeMode, mode);
  };

  const resolvedDark =
    themeMode === 'system' ? systemColorScheme === 'dark' : themeMode === 'dark';

  const theme = resolvedDark ? Theme.dark : Theme.light;

  return (
    <ThemeContext.Provider value={{ themeMode, theme, isDark: resolvedDark, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
