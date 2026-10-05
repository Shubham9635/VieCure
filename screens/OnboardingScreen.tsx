import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ViewToken,
  Image,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolation,
  type SharedValue,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Colors } from '../constants/colors';
import { FontFamily, FontSize, Radius, Spacing } from '../constants/theme';
import { ASYNC_STORAGE_KEYS, APP_CONFIG } from '../constants/config';

const { width, height } = Dimensions.get('window');

const slides = APP_CONFIG.onboardingSlides;

const SLIDE_COLORS = [
  [Colors.bgDark, Colors.primaryDark, '#0a1a0e'],
  ['#0e1f16', Colors.primary, '#1a3528'],
  ['#0a1a0e', '#1a5c3a', '#243028'],
] as const;

const ICONS = ['🔬', '🌿', '✅'];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useSharedValue(0);

  const handleViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems[0]?.index !== undefined && viewableItems[0].index !== null) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else {
      handleGetStarted();
    }
  };

  const handleGetStarted = async () => {
    await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.onboardingComplete, 'true');
    router.replace('/(tabs)');
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.onboardingComplete, 'true');
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        keyExtractor={(item) => item.id}
        onScroll={(e) => {
          scrollX.value = e.nativeEvent.contentOffset.x;
        }}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => (
          <LinearGradient
            colors={[...SLIDE_COLORS[index]]}
            style={styles.slide}
            start={{ x: 0.3, y: 0 }}
            end={{ x: 0.7, y: 1 }}
          >
            {/* Decorative circle */}
            <View style={styles.circle} />
            <View style={styles.circle2} />

            {/* Logo */}
            <Image
              source={require('../assets/logo-circle.png')}
              style={styles.slideLogo}
              resizeMode="contain"
            />

            {/* Icon */}
            <View style={styles.iconWrap}>
              <Text style={styles.icon}>{ICONS[index]}</Text>
            </View>

            {/* Content */}
            <View style={styles.content}>
              <Text style={styles.headline}>{item.headline}</Text>
              <Text style={styles.subtext}>{item.subtext}</Text>
            </View>
          </LinearGradient>
        )}
      />

      {/* Bottom controls */}
      <View style={styles.controls}>
        {/* Dots */}
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <DotIndicator
              key={i}
              index={i}
              scrollX={scrollX}
              isActive={i === currentIndex}
            />
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipBtn} activeOpacity={0.7}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleNext}
            style={styles.nextBtn}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={[Colors.primaryLight, Colors.primary]}
              style={styles.nextGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.nextText}>
                {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function DotIndicator({
  index,
  scrollX,
  isActive,
}: {
  index: number;
  scrollX: SharedValue<number>;
  isActive: boolean;
}) {
  const animStyle = useAnimatedStyle(() => {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
    const w = interpolate(scrollX.value, inputRange, [8, 28, 8], Extrapolation.CLAMP);
    const opacity = interpolate(scrollX.value, inputRange, [0.35, 1, 0.35], Extrapolation.CLAMP);
    return {
      width: withTiming(w, { duration: 200 }),
      opacity: withTiming(opacity, { duration: 200 }),
    };
  });

  return (
    <Animated.View
      style={[
        styles.dot,
        { backgroundColor: isActive ? Colors.sage : Colors.gray400 },
        animStyle,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDark,
  },
  slide: {
    width,
    height: height * 0.78,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    width: width * 1.4,
    height: width * 1.4,
    borderRadius: width * 0.7,
    borderWidth: 1.5,
    borderColor: 'rgba(122, 170, 138, 0.12)',
    top: -width * 0.4,
    left: -width * 0.2,
  },
  circle2: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 1,
    borderColor: 'rgba(122, 170, 138, 0.08)',
    bottom: -80,
    right: -60,
  },
  slideLogo: {
    width: 72,
    height: 72,
    marginBottom: Spacing[4],
  },
  iconWrap: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(45, 122, 82, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing[8],
    borderWidth: 1.5,
    borderColor: 'rgba(122, 170, 138, 0.3)',
  },
  icon: {
    fontSize: 52,
  },
  content: {
    paddingHorizontal: Spacing[8],
    alignItems: 'center',
    gap: Spacing[4],
  },
  headline: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize['3xl'],
    color: Colors.white,
    textAlign: 'center',
    lineHeight: FontSize['3xl'] * 1.25,
    letterSpacing: -0.5,
  },
  subtext: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.base,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    lineHeight: FontSize.base * 1.65,
  },
  controls: {
    flex: 1,
    backgroundColor: Colors.bgDark,
    paddingHorizontal: Spacing[6],
    paddingVertical: Spacing[6],
    justifyContent: 'space-between',
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing[2],
    flex: 1,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  btnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skipBtn: {
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[3],
  },
  skipText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.base,
    color: 'rgba(255,255,255,0.45)',
  },
  nextBtn: {
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  nextGradient: {
    paddingHorizontal: Spacing[8],
    paddingVertical: Spacing[4],
    borderRadius: Radius.full,
    minWidth: 140,
    alignItems: 'center',
  },
  nextText: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.base,
    color: Colors.white,
    letterSpacing: 0.3,
  },
});
