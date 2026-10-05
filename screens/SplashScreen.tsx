import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/colors';
import { FontFamily, FontSize } from '../constants/theme';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const taglineAnim = useRef(new Animated.Value(0)).current;
  const dotAnim1 = useRef(new Animated.Value(0)).current;
  const dotAnim2 = useRef(new Animated.Value(0)).current;
  const dotAnim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(200),
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          damping: 18,
          stiffness: 120,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(300),
      Animated.timing(taglineAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(200),
      Animated.stagger(120, [
        Animated.timing(dotAnim1, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(dotAnim2, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(dotAnim3, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  const logoStyle: any = {
    opacity: fadeAnim,
    transform: [{ scale: scaleAnim }],
  };

  const taglineStyle: any = {
    opacity: taglineAnim,
    transform: [
      {
        translateY: taglineAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [12, 0],
        }),
      },
    ],
  };

  return (
    <LinearGradient
      colors={[Colors.bgDark, Colors.primaryDark, '#0a1a0e']}
      style={styles.container}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      {/* Background pattern circles */}
      <View style={[styles.circle, styles.circle1]} />
      <View style={[styles.circle, styles.circle2]} />
      <View style={[styles.circle, styles.circle3]} />

      {/* Logo section */}
      <Animated.View style={[styles.logoWrap, logoStyle]}>
        <Image
          source={require('../assets/logo-circle.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.logoSub}>LIFESCIENCES LLP</Text>
      </Animated.View>

      {/* Tagline */}
      <Animated.View style={[styles.taglineWrap, taglineStyle]}>
        <Text style={styles.tagline}>Science Behind Better Care</Text>
      </Animated.View>

      {/* Loading dots */}
      <View style={styles.dotsWrap}>
        {[dotAnim1, dotAnim2, dotAnim3].map((dot, i) => (
          <Animated.View
            key={i}
            style={[
              styles.dot,
              {
                opacity: dot as any,
                backgroundColor: i === 1 ? Colors.sage : Colors.primary,
              },
            ]}
          />
        ))}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Decorative circles
  circle: {
    position: 'absolute',
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: 'rgba(42, 122, 82, 0.15)',
  },
  circle1: {
    width: width * 1.2,
    height: width * 1.2,
    top: -width * 0.3,
    left: -width * 0.1,
  },
  circle2: {
    width: width * 0.9,
    height: width * 0.9,
    bottom: -width * 0.2,
    right: -width * 0.1,
    borderColor: 'rgba(122, 170, 138, 0.1)',
  },
  circle3: {
    width: 200,
    height: 200,
    top: height * 0.35,
    left: -50,
    borderColor: 'rgba(184, 151, 106, 0.1)',
  },

  logoWrap: {
    alignItems: 'center',
    gap: 14,
    marginBottom: 20,
  },
  logoImage: {
    width: 160,
    height: 160,
  },
  logoSub: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.sm,
    color: Colors.sageLight,
    letterSpacing: 5,
    textTransform: 'uppercase',
  },
  taglineWrap: {
    marginTop: 8,
  },
  tagline: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.base,
    color: 'rgba(255,255,255,0.55)',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  dotsWrap: {
    position: 'absolute',
    bottom: 60,
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
