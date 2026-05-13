import { StyleSheet, View } from 'react-native';
import { AppLogo } from '../../components/AppLogo';
import { useTheme } from '../../hooks/useTheme';

export function SplashScreen() {
  const { colors } = useTheme();

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          backgroundColor: colors.background,
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
    >
      <AppLogo size={300} />
    </View>
  );
}
