import { Image } from 'react-native';

type Props = {
  size: number;
};

export function AppLogo({ size }: Props) {
  return (
    <Image
      source={require('../../assets/comUnity.png')}
      style={{ width: size, height: size }}
      resizeMode="contain"
    />
  );
}
