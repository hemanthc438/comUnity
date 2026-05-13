import Icon from '@react-native-vector-icons/ionicons';

type Props = {
  visible: boolean;
  color: string;
  size?: number;
};

export function EyeIcon({ visible, color, size = 22 }: Props) {
  return <Icon name={visible ? 'eye-outline' : 'eye-off-outline'} size={size} color={color} />;
}
