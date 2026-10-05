import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';

interface SafeScreenProps {
  children?: React.ReactNode;
  scrollable?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  padBottom?: boolean;
}

export function SafeScreen({
  children,
  scrollable = false,
  refreshing = false,
  onRefresh,
  style,
  contentStyle,
  padBottom = true,
}: SafeScreenProps) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const containerStyle: ViewStyle = {
    flex: 1,
    backgroundColor: theme.background,
  };

  if (scrollable) {
    return (
      <View style={[containerStyle, style]}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[
            { paddingBottom: padBottom ? insets.bottom + 16 : insets.bottom + 16 },
            contentStyle,
          ]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            onRefresh ? (
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={theme.primary}
                colors={[theme.primary]}
              />
            ) : undefined
          }
        >
          {children}
        </ScrollView>
      </View>
    );
  }

  return (
    <View
      style={[
        containerStyle,
        { paddingBottom: padBottom ? insets.bottom : 0 },
        style,
      ]}
    >
      {children}
    </View>
  );
}
