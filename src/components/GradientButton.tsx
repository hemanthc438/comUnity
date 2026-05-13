import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../hooks/useTheme';

type Props = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  showArrow?: boolean;
};

export function GradientButton({ label, onPress, loading, disabled, showArrow = true }: Props) {
  const { colors, spacing, radii } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [styles.pressable, (pressed || disabled) && { opacity: 0.75 }]}
    >
      <LinearGradient
        colors={[colors.primary, '#000000ff']}
        start={{ x: 0.75, y: 0 }}
        end={{ x: 0.75, y: 1 }}
        style={[styles.gradient, { borderRadius: radii.full, paddingVertical: spacing.m }]}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Text style={styles.label}>{label}</Text>
            {showArrow && <Text style={styles.arrow}>→</Text>}
          </>
        )}
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    width: '100%',
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: 9999,
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
