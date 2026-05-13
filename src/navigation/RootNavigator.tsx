import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import { OnboardingScreen } from '../features/auth/screens/OnboardingScreen';
import { SplashScreen } from '../features/splash/SplashScreen';
import { useAuthStore } from '../store/useAuthStore';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';

export function RootNavigator() {
  const { token, hasSeenOnboarding } = useAuthStore();
  const [ready, setReady] = useState(false);

  if (!hasSeenOnboarding) {
    return <OnboardingScreen />;
  }

  return (
    <>
      <NavigationContainer onReady={() => setReady(true)}>
        {token ? <MainNavigator /> : <AuthNavigator />}
      </NavigationContainer>
      {!ready && <SplashScreen />}
    </>
  );
}
