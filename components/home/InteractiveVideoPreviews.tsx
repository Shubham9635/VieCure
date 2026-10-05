import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Modal,
  Dimensions,
  Platform,
} from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
import { router } from 'expo-router';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  X,
  Sparkles,
  ChevronRight,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react-native';
import { Colors } from '../../constants/colors';
import { FontFamily, FontSize, Radius, Spacing, Shadow } from '../../constants/theme';
import { useTheme } from '../../contexts/ThemeContext';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface VideoPreviewItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  productId: string;
  productName: string;
  videoSource: any;
}

export const PREVIEW_VIDEOS: VideoPreviewItem[] = [
  {
    id: 'vid-1',
    title: 'Facecure Facewash',
    subtitle: 'Deep cleansing herbal routine with Neem & Tea Tree',
    badge: 'Herbal Care',
    productId: 'prod-12',
    productName: 'Facecure Facewash',
    videoSource: require('../../assets/video01.mp4'),
  },
  {
    id: 'vid-2',
    title: 'Facecure Herbal Soap',
    subtitle: '100% natural antiseptic purifying lather demonstration',
    badge: 'Antiseptic Bar',
    productId: 'prod-10',
    productName: 'Facecure Herbal Soap',
    videoSource: require('../../assets/video02.mp4'),
  },
  {
    id: 'vid-3',
    title: 'Glow Shine Radiance',
    subtitle: 'Skin brightening application with built-in SPF 30',
    badge: 'SPF 30 Defense',
    productId: 'prod-11',
    productName: 'Facecure Glow Shine Cream',
    videoSource: require('../../assets/video03.mp4'),
  },
  {
    id: 'vid-4',
    title: 'Facecure Advance Gel',
    subtitle: 'Targeted spot treatment with Clindamycin & Nicotinamide',
    badge: 'Clinical Care',
    productId: 'prod-13',
    productName: 'Facecure Advance Gel',
    videoSource: require('../../assets/video04.mp4'),
  },
  {
    id: 'vid-5',
    title: 'Skin Radiance Combo',
    subtitle: 'Complete 2-step daily cleanse and brightening ritual',
    badge: 'Daily Ritual',
    productId: 'prod-14',
    productName: 'Facecure Skin Radiance Combo',
    videoSource: require('../../assets/video05.mp4'),
  },
];

interface VideoCardProps {
  item: VideoPreviewItem;
  isDark: boolean;
  onOpenModal: (item: VideoPreviewItem) => void;
}

function VideoCard({ item, isDark, onOpenModal }: VideoCardProps) {
  const player = useVideoPlayer(item.videoSource, (p) => {
    p.loop = true;
    p.muted = true;
    p.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
  const { muted } = useEvent(player, 'mutedChange', { muted: player.muted });

  const togglePlay = () => {
    if (player.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  const toggleMute = () => {
    player.muted = !player.muted;
  };

  const handleProductPress = () => {
    router.push(`/product/${item.productId}`);
  };

  return (
    <View
      style={[
        styles.cardContainer,
        {
          backgroundColor: isDark ? Colors.surfaceDark : '#0d2818',
          borderColor: isDark ? Colors.borderDark : 'rgba(255,255,255,0.12)',
        },
        Shadow.md,
      ]}
    >
      {/* Video Stream */}
      <VideoView
        player={player}
        style={styles.videoPlayer}
        contentFit="cover"
        nativeControls={false}
      />

      {/* Tap Overlay for Play/Pause */}
      <Pressable style={styles.tapSurface} onPress={togglePlay} accessibilityLabel="Toggle play" />

      {/* Top Floating Controls */}
      <View style={styles.topControlRow}>
        <View style={styles.badgeWrap}>
          <Sparkles size={11} color="#FFFFFF" />
          <Text style={styles.badgeText}>{item.badge}</Text>
        </View>

        <View style={styles.topActionBtns}>
          <TouchableOpacity
            style={styles.circleBtn}
            onPress={toggleMute}
            hitSlop={8}
            accessibilityLabel={muted ? 'Unmute video' : 'Mute video'}
          >
            {muted ? <VolumeX size={15} color="#FFFFFF" /> : <Volume2 size={15} color="#FFFFFF" />}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.circleBtn}
            onPress={() => onOpenModal(item)}
            hitSlop={8}
            accessibilityLabel="Expand video preview"
          >
            <Maximize2 size={14} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Center Play Indicator when Paused */}
      {!isPlaying && (
        <TouchableOpacity style={styles.centerPlayBtn} onPress={togglePlay}>
          <Play size={24} color="#FFFFFF" fill="#FFFFFF" />
        </TouchableOpacity>
      )}

      {/* Bottom Overlay & Linked Product Action */}
      <View style={styles.bottomOverlay}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.cardSubtitle} numberOfLines={2}>
          {item.subtitle}
        </Text>

        <TouchableOpacity
          style={styles.productPillBtn}
          onPress={handleProductPress}
          activeOpacity={0.88}
        >
          <View style={styles.pillContent}>
            <ShieldCheck size={13} color="#FFFFFF" />
            <Text style={styles.pillText} numberOfLines={1}>
              View {item.productName}
            </Text>
          </View>
          <ArrowUpRight size={14} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Modal Component for Expanded Playback
function ExpandedVideoModal({
  item,
  visible,
  onClose,
}: {
  item: VideoPreviewItem | null;
  visible: boolean;
  onClose: () => void;
}) {
  if (!item) return null;

  const player = useVideoPlayer(item.videoSource, (p) => {
    p.loop = true;
    p.muted = false;
    p.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
  const { muted } = useEvent(player, 'mutedChange', { muted: player.muted });

  const handleProductNavigate = () => {
    onClose();
    router.push(`/product/${item.productId}`);
  };

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContent}>
          {/* Close Button */}
          <TouchableOpacity style={styles.modalCloseBtn} onPress={onClose} hitSlop={10}>
            <X size={20} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Expanded Video Player */}
          <VideoView
            player={player}
            style={styles.modalVideo}
            contentFit="contain"
            nativeControls={true}
            fullscreenOptions={{ enable: true }}
            allowsPictureInPicture
          />

          {/* Bottom Card in Modal */}
          <View style={styles.modalFooter}>
            <View style={{ flex: 1 }}>
              <Text style={styles.modalTitle}>{item.title}</Text>
              <Text style={styles.modalSubtitle}>{item.subtitle}</Text>
            </View>

            <TouchableOpacity
              style={styles.modalProductBtn}
              onPress={handleProductNavigate}
              activeOpacity={0.9}
            >
              <Text style={styles.modalProductBtnText}>View Details</Text>
              <ChevronRight size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export function InteractiveVideoPreviews() {
  const { isDark } = useTheme();
  const [selectedVideo, setSelectedVideo] = useState<VideoPreviewItem | null>(null);

  return (
    <View style={styles.wrapper}>
      {/* Section Header */}
      <View style={styles.headerRow}>
        <View style={styles.headerTitles}>
          <Text style={styles.overline}>INTERACTIVE PREVIEWS</Text>
          <Text
            style={[
              styles.heading,
              { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
            ]}
          >
            Formulations in Action
          </Text>
          <Text
            style={[
              styles.subheading,
              { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
            ]}
          >
            Watch real application demonstrations, daily rituals & clinical guides
          </Text>
        </View>
      </View>

      {/* Horizontal Carousel */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        decelerationRate="fast"
      >
        {PREVIEW_VIDEOS.map((item) => (
          <VideoCard
            key={item.id}
            item={item}
            isDark={isDark}
            onOpenModal={(v) => setSelectedVideo(v)}
          />
        ))}
      </ScrollView>

      {/* Fullscreen Video Modal */}
      <ExpandedVideoModal
        item={selectedVideo}
        visible={Boolean(selectedVideo)}
        onClose={() => setSelectedVideo(null)}
      />
    </View>
  );
}

const CARD_WIDTH = 230;
const CARD_HEIGHT = 370;

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: Spacing.xl,
  },
  headerRow: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  headerTitles: {
    gap: 4,
  },
  overline: {
    fontSize: FontSize.xs - 1,
    fontFamily: FontFamily.bold,
    letterSpacing: 1.2,
    color: Colors.primary,
    textTransform: 'uppercase',
  },
  heading: {
    fontSize: FontSize['2xl'],
    fontFamily: FontFamily.serifBold,
    letterSpacing: -0.3,
  },
  subheading: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.regular,
    lineHeight: 20,
    marginTop: 2,
  },
  scrollContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xs,
    gap: 16,
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: Radius['2xl'],
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
  },
  tapSurface: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    bottom: 120,
  },
  topControlRow: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  badgeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.full,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: FontFamily.semiBold,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  topActionBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  circleBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  centerPlayBtn: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
    borderWidth: 1.5,
    borderColor: Colors.gold,
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.78)',
    padding: 12,
    paddingTop: 16,
    zIndex: 10,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: FontSize.base,
    fontFamily: FontFamily.serifBold,
    marginBottom: 2,
  },
  cardSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: FontSize.xs,
    fontFamily: FontFamily.regular,
    lineHeight: 16,
    marginBottom: 10,
  },
  productPillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.primaryDark,
    borderRadius: Radius.full,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
  },
  pillContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  pillText: {
    color: '#FFFFFF',
    fontSize: FontSize.xs,
    fontFamily: FontFamily.medium,
  },
  // Modal Styles
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: Platform.OS === 'web' ? Math.min(SCREEN_WIDTH * 0.85, 480) : SCREEN_WIDTH,
    height: Platform.OS === 'web' ? Math.min(SCREEN_HEIGHT * 0.88, 720) : SCREEN_HEIGHT * 0.85,
    borderRadius: Radius['2xl'],
    overflow: 'hidden',
    backgroundColor: '#000000',
    position: 'relative',
    justifyContent: 'space-between',
  },
  modalCloseBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalVideo: {
    width: '100%',
    flex: 1,
  },
  modalFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    gap: 12,
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: FontSize.lg,
    fontFamily: FontFamily.serifBold,
  },
  modalSubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: FontSize.xs,
    fontFamily: FontFamily.regular,
    marginTop: 2,
  },
  modalProductBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: Radius.full,
    gap: 4,
  },
  modalProductBtnText: {
    color: '#FFFFFF',
    fontSize: FontSize.sm,
    fontFamily: FontFamily.semiBold,
  },
});
