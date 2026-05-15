import React, { memo } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../hooks/useTheme';

type Props = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  showArrow?: boolean;
  color?: string;
};

export const GradientButton = memo(function GradientButton({ label, onPress, loading, disabled, showArrow = true, color }: Props) {
  const { colors, spacing, radii } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [styles.pressable, (pressed || disabled) && { opacity: 0.75 }]}
    >
      <View style={[styles.container, { borderRadius: radii.full, paddingVertical: spacing.m }]}>
        <LinearGradient
          colors={[color || colors.primary, '#000000ff']}
          start={{ x: 0.75, y: 0 }}
          end={{ x: 0.75, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Text style={styles.label}>{label}</Text>
            {showArrow && <Text style={styles.arrow}>→</Text>}
          </>
        )}
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  pressable: {
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    gap: 10,
    borderWidth: 1,
    borderColor: '#ffffff3a',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  arrow: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
