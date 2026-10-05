import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ViewStyle } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Radius } from '../../constants/theme';

interface SkeletonProps {
  width?: number | `${number}%`;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export function Skeleton({ width, height = 16, borderRadius = Radius.md, style }: SkeletonProps) {
  const { theme } = useTheme();
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0, duration: 900, useNativeDriver: true }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [shimmer]);

  const opacity = shimmer.interpolate({ inputRange: [0, 1], outputRange: [1, 0.4] });

  return (
    <Animated.View
      style={[
        {
          width: width ?? '100%',
          height,
          borderRadius,
          backgroundColor: theme.skeleton,
          opacity,
        },
        style,
      ]}
    />
  );
}

export function ProductCardSkeleton() {
  const { theme } = useTheme();
  return (
    <View style={[styles.productCard, { backgroundColor: theme.card }]}>
      <Skeleton height={160} borderRadius={Radius.lg} style={{ marginBottom: 12 }} />
      <Skeleton height={12} width="40%" style={{ marginBottom: 8 }} />
      <Skeleton height={16} width="85%" style={{ marginBottom: 8 }} />
      <Skeleton height={12} width="65%" style={{ marginBottom: 12 }} />
      <Skeleton height={36} borderRadius={Radius.lg} />
    </View>
  );
}

export function CategoryCardSkeleton() {
  const { theme } = useTheme();
  return (
    <View style={[styles.categoryCard, { backgroundColor: theme.card }]}>
      <Skeleton height={120} borderRadius={Radius.xl} />
    </View>
  );
}

const styles = StyleSheet.create({
  productCard: {
    flex: 1,
    borderRadius: Radius.xl,
    padding: 12,
    margin: 4,
  },
  categoryCard: {
    width: 100,
    marginRight: 12,
    borderRadius: Radius.xl,
    overflow: 'hidden',
  },
});
