import { Image, StyleSheet, View } from 'react-native';
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
      <Image
        source={require('../../../assets/comUnity.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 220,
    height: 220,
  },
});
