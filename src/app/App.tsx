import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { useTheme } from '../hooks/useTheme';
import { RootNavigator } from '../navigation/RootNavigator';
import { mmkvPersister } from '../utils/queryPersister';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 5,
      staleTime: 0,
      retry: 2,
    },
  },
});

function App() {
  const { isDark } = useTheme();

  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);

  return (
    <ErrorBoundary>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: mmkvPersister }}
      >
        <SafeAreaProvider>
          <StatusBar
            barStyle={isDark ? 'light-content' : 'dark-content'}
            backgroundColor="transparent"
            translucent
          />
          <RootNavigator />
        </SafeAreaProvider>
      </PersistQueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
