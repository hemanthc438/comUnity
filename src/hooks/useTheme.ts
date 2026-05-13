import { useColorScheme } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';
import { darkColors, lightColors, radii, spacing } from '../utils/tokens';

export function useTheme() {
  const mode = useThemeStore((s) => s.mode);
  const systemScheme = useColorScheme();

  const isDark = mode === 'dark' || (mode === 'system' && systemScheme === 'dark');
  const colors = isDark ? darkColors : lightColors;

  return { colors, spacing, radii, isDark, mode };
}
