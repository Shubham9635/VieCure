import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { Radius, Shadow } from '../../constants/theme';

// ─── Banner Data ─────────────────────────────────────────────────────────────

const BANNERS = [
  {
    id: 'facewash',
    source: require('../../assets/banner-facewash.png'),
    alt: 'Facecure Facewash – Clear Skin with New Facecure Facewash. Features Herbal Ingredients, Acne and Pimple Reduction, Deep Cleansing, 100% Natural.',
  },
  {
    id: 'glowshine',
    source: require('../../assets/banner-glowshine.png'),
    alt: 'Facecure Glow Shine Cream – Natural Radiance of Your Skin. Formulated with Glycolic Acid, Arbutin, Kojic Acid, and Niacinamide. Skin Brightening, Sun Protection, Daily Use.',
  },
  {
    id: 'acnecare',
    source: require('../../assets/banner-acnecare.png'),
    alt: 'Facecure Acne Care – Take Control of Your Acne-Prone Skin. Dermatologist-recommended solution featuring Clindamycin Advance Gel and Hydroquinone Advance Gel.',
  },
] as const;

// ─── Config ───────────────────────────────────────────────────────────────────

const AUTO_PLAY_INTERVAL = 5000;

// Original banner aspect ratio ~1770x500 = 3.54:1
const BANNER_ASPECT_RATIO = 1770 / 500;

// ─── Props ────────────────────────────────────────────────────────────────────

interface HeroCarouselProps {
  onPress?: (bannerId: string) => void;
}

// ─── Component ───────────────────────────────────────────────────────────────

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onPress }) => {
  const { width: screenWidth } = Dimensions.get('window');

  const MARGIN_H = 16;
  const containerWidth = screenWidth - MARGIN_H * 2;

  // Clamp height: preserve ratio but keep comfortable on mobile
  const rawHeight = containerWidth / BANNER_ASPECT_RATIO;
  const bannerHeight = Math.min(Math.max(rawHeight, 160), 320);

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const autoPlayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeIndexRef = useRef(0);
  const isInteractingRef = useRef(false);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const goToSlide = useCallback(
    (index: number) => {
      const total = BANNERS.length;
      const clamped = ((index % total) + total) % total;
      scrollRef.current?.scrollTo({ x: clamped * containerWidth, animated: true });
      setActiveIndex(clamped);
    },
    [containerWidth],
  );

  const scheduleAutoPlay = useCallback(() => {
    if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current);
    autoPlayTimer.current = setTimeout(() => {
      if (!isInteractingRef.current) {
        goToSlide(activeIndexRef.current + 1);
      }
      scheduleAutoPlay();
    }, AUTO_PLAY_INTERVAL);
  }, [goToSlide]);

  useEffect(() => {
    scheduleAutoPlay();
    return () => {
      if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current);
    };
  }, [scheduleAutoPlay]);

  const resumeAfterInteraction = useCallback(() => {
    isInteractingRef.current = false;
    scheduleAutoPlay();
  }, [scheduleAutoPlay]);

  const handleScrollBeginDrag = useCallback(() => {
    isInteractingRef.current = true;
    if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current);
  }, []);

  const handleMomentumScrollEnd = useCallback(
    (e: any) => {
      const offsetX = e.nativeEvent.contentOffset.x;
      const newIndex = Math.round(offsetX / containerWidth);
      setActiveIndex(newIndex);
      setTimeout(resumeAfterInteraction, 800);
    },
    [containerWidth, resumeAfterInteraction],
  );

  const handlePrev = useCallback(() => {
    isInteractingRef.current = true;
    if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current);
    goToSlide(activeIndexRef.current - 1);
    setTimeout(resumeAfterInteraction, 1200);
  }, [goToSlide, resumeAfterInteraction]);

  const handleNext = useCallback(() => {
    isInteractingRef.current = true;
    if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current);
    goToSlide(activeIndexRef.current + 1);
    setTimeout(resumeAfterInteraction, 1200);
  }, [goToSlide, resumeAfterInteraction]);

  const handleDotPress = useCallback(
    (index: number) => {
      isInteractingRef.current = true;
      if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current);
      goToSlide(index);
      setTimeout(resumeAfterInteraction, 1200);
    },
    [goToSlide, resumeAfterInteraction],
  );

  return (
    <View
      style={[styles.wrapper, { marginHorizontal: MARGIN_H, marginTop: 14 }]}
      accessible={false}
    >
      {/* Carousel track */}
      <View
        style={[
          styles.carouselContainer,
          { width: containerWidth, height: bannerHeight },
        ]}
      >
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScrollBeginDrag={handleScrollBeginDrag}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          decelerationRate="fast"
          bounces={false}
          accessible
          accessibilityRole="adjustable"
          accessibilityLabel="Facecure product banner carousel"
          accessibilityHint="Swipe left or right to browse banners"
        >
          {BANNERS.map((banner) => (
            <TouchableOpacity
              key={banner.id}
              activeOpacity={onPress ? 0.92 : 1}
              onPress={() => onPress?.(banner.id)}
              accessible
              accessibilityLabel={banner.alt}
              accessibilityRole="imagebutton"
            >
              <Image
                source={banner.source}
                style={{ width: containerWidth, height: bannerHeight }}
                resizeMode="cover"
                accessibilityIgnoresInvertColors
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Prev arrow */}
        <TouchableOpacity
          style={[styles.arrowBtn, styles.arrowLeft]}
          onPress={handlePrev}
          accessibilityLabel="Previous banner"
          accessibilityRole="button"
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <ChevronLeft size={18} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>

        {/* Next arrow */}
        <TouchableOpacity
          style={[styles.arrowBtn, styles.arrowRight]}
          onPress={handleNext}
          accessibilityLabel="Next banner"
          accessibilityRole="button"
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <ChevronRight size={18} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

      {/* Pagination dots */}
      <View
        style={styles.dotsRow}
        accessible
        accessibilityRole="tablist"
        accessibilityLabel="Slide indicators"
      >
        {BANNERS.map((banner, index) => {
          const isActive = index === activeIndex;
          return (
            <TouchableOpacity
              key={banner.id}
              onPress={() => handleDotPress(index)}
              accessibilityRole="tab"
              accessibilityLabel={`Go to slide ${index + 1} of ${BANNERS.length}`}
              accessibilityState={{ selected: isActive }}
              hitSlop={{ top: 12, bottom: 12, left: 8, right: 8 }}
            >
              <View
                style={[
                  styles.dot,
                  isActive ? styles.dotActive : styles.dotInactive,
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  wrapper: {},
  carouselContainer: {
    borderRadius: Radius.xl,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: Colors.gray100,
    ...Shadow.md,
  },
  arrowBtn: {
    position: 'absolute',
    top: '50%',
    marginTop: -18,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.28)',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.22,
        shadowRadius: 3,
      },
      android: { elevation: 4 },
    }),
  },
  arrowLeft: { left: 10 },
  arrowRight: { right: 10 },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    gap: 6,
  },
  dot: {
    height: 7,
    borderRadius: 4,
  },
  dotActive: {
    width: 22,
    backgroundColor: Colors.primary,
  },
  dotInactive: {
    width: 7,
    backgroundColor: Colors.gray300,
  },
});
