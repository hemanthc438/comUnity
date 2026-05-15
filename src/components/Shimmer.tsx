import React, { useEffect } from 'react';
import {
  DimensionValue,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { useTheme } from '../hooks/useTheme';

interface Props {
  width: DimensionValue;
  height: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

export const Shimmer = ({
  width,
  height,
  borderRadius = 8,
  style,
}: Props) => {
  const { colors, isDark } = useTheme();
  const highlight = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)';

  const translateX = useSharedValue(-200);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(400, {
        duration: 1200,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: colors.surface,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <AnimatedGradient
        colors={['transparent', highlight, 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          {
            position: 'absolute',
            width: '40%',
            height: '100%',
          },
          animatedStyle,
        ]}
      />
    </View>
  );
};