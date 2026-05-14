import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { OnboardingScreen } from '../features/auth/screens/OnboardingScreen';
import { useAuthStore } from '../store/useAuthStore';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';
import { useTheme } from '../hooks/useTheme';

export function RootNavigator() {
  const { token, hasSeenOnboarding } = useAuthStore();
  const { colors } = useTheme();

  if (!hasSeenOnboarding) {
    return <OnboardingScreen />;
  }

  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
      primary: colors.primary,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      {token ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
