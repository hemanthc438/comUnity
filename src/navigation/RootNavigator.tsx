import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { OnboardingScreen } from '../features/auth/screens/OnboardingScreen';
import { useAuthStore } from '../store/useAuthStore';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';
import { useTheme } from '../hooks/useTheme';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { Toast } from '../components/Toast';

export function RootNavigator() {
  const { token, hasSeenOnboarding } = useAuthStore();
  const { colors } = useTheme();
  const isOnline = useNetworkStatus();
  const prevIsOnlineRef = useRef<boolean>(true);

  const [offlineVisible, setOfflineVisible] = useState(false);
  const [reconnectedVisible, setReconnectedVisible] = useState(false);

  useEffect(() => {
    const wasOnline = prevIsOnlineRef.current;

    if (!isOnline) {
      setReconnectedVisible(false);
      setOfflineVisible(true);
    } else if (!wasOnline && isOnline) {
      setOfflineVisible(false);
      setReconnectedVisible(true);
    }

    prevIsOnlineRef.current = isOnline;
  }, [isOnline]);

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
    <View style={styles.root}>
      <NavigationContainer theme={navigationTheme}>
        {token ? <MainNavigator /> : <AuthNavigator />}
      </NavigationContainer>

      <Toast
        visible={offlineVisible}
        message="No Internet Connection"
        type="error"
      />
      <Toast
        visible={reconnectedVisible}
        message="Back online"
        type="success"
        duration={2500}
        onHide={() => setReconnectedVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
