import { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { GradientButton } from '../../../components/GradientButton';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { useTheme } from '../../../hooks/useTheme';
import { useAuthStore } from '../../../store/useAuthStore';
import type { Colors } from '../../../utils/tokens';

const { width } = Dimensions.get('window');

type Slide = {
  id: string;
  image: ImageSourcePropType;
  description: string;
};

const SLIDES: Slide[] = [
  {
    id: '1',
    image: require('../../../../assets/neighbours.png'),
    description: 'See who lives nearby and build real connections with the people around you.',
  },
  {
    id: '2',
    image: require('../../../../assets/loop.png'),
    description: 'Discover local events, announcements, and everything happening in your area.',
  },
  {
    id: '3',
    image: require('../../../../assets/give.png'),
    description: 'Share resources, offer a hand, and make your neighborhood a better place to live.',
  },
];

export function OnboardingScreen() {
  const { colors, spacing, radii } = useTheme();
  const completeOnboarding = useAuthStore((s) => s.completeOnboarding);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<Slide>>(null);
  const styles = createStyles(colors, spacing, radii);

  const isLast = activeIndex === SLIDES.length - 1;

  const goNext = () => {
    if (isLast) {
      completeOnboarding();
    } else {
      const next = activeIndex + 1;
      flatListRef.current?.scrollToIndex({ index: next });
      setActiveIndex(next);
    }
  };
  const goPrevious = () => {
    if (activeIndex === 0) return;
    const previous = activeIndex - 1;
    flatListRef.current?.scrollToIndex({ index: previous });
    setActiveIndex(previous);
  };

  const renderSlide: ListRenderItem<Slide> = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.slideImage} resizeMode="contain" />
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <ScreenWrapper>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: spacing.s }}>
      {activeIndex !== 0 && (
        <Pressable
          onPress={goPrevious}
          style={({ pressed }) => [styles.skip, pressed && { opacity: 0.5 }]}
        >
          <Text style={styles.skipText}>previous</Text>
        </Pressable>
      )}
      <Pressable
        onPress={completeOnboarding}
        style={({ pressed }) => [styles.skip, pressed && { opacity: 0.5 }]}
      >
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>
      </View>
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.footer}>
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View key={i} style={[styles.dot, i === activeIndex && styles.dotActive]} />
          ))}
        </View>

        <GradientButton
          label={isLast ? 'Get Started' : 'Next'}
          onPress={goNext}
        />
      </View>
    </ScreenWrapper>
  );
}

const createStyles = (
  colors: Colors,
  spacing: Record<string, number>,
  radii: Record<string, number>
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    skip: {
      alignSelf: 'flex-end',
      paddingHorizontal: spacing.l,
      paddingTop: spacing.s,
    },
    skipText: {
      color: colors.textSecondary,
      fontSize: 15,
    },
    slide: {
      width,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing.l,
    },
    slideImage: {
      width: width * 1.3,
      height: width * 0.70,
      marginBottom: spacing.xl,
    },
    description: {
      color: colors.textSecondary,
      fontSize: 16,
      textAlign: 'center',
      lineHeight: 24,
    },
    footer: {
      paddingHorizontal: spacing.l,
      paddingBottom: spacing.xl,
      gap: spacing.l,
    },
    dots: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: spacing.s,
    },
    dot: {
      width: 7,
      height: 7,
      borderRadius: radii.full,
      backgroundColor: colors.border,
    },
    dotActive: {
      backgroundColor: colors.primary,
      width: 20,
    },
  });
