import React, { memo, useEffect, useLayoutEffect, useRef } from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type ToastType = 'error' | 'success' | 'info';

interface Props {
  visible: boolean;
  message: string;
  type?: ToastType;
  /** Auto-dismiss after this many ms. Omit for a persistent toast. */
  duration?: number;
  onHide?: () => void;
}

const BG: Record<ToastType, string> = {
  error: '#E53E3E',
  success: '#38A169',
  info: '#2D3748',
};

export const Toast = memo(function Toast({ visible, message, type = 'info', duration, onHide }: Props) {
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(80);
  const opacity = useSharedValue(0);

  const onHideRef = useRef(onHide);
  useLayoutEffect(() => { onHideRef.current = onHide; });

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(0, { duration: 300 });
      opacity.value = withTiming(1, { duration: 300 });

      if (duration) {
        const timer = setTimeout(() => onHideRef.current?.(), duration);
        return () => clearTimeout(timer);
      }
    } else {
      translateY.value = withTiming(80, { duration: 250 });
      opacity.value = withTiming(0, { duration: 250 });
    }
  }, [visible, duration]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.container,
        { bottom: insets.bottom + 20, backgroundColor: BG[type] },
        animStyle,
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    zIndex: 9999,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
