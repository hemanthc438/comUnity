import Icon from '@react-native-vector-icons/ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  visible: boolean;
  color: string;
  size?: number;
};

export function EyeIcon({ visible, color, size = 22 }: Props) {
  return <MaterialCommunityIcons name={visible ? 'eye-outline' : 'eye-off-outline'} color={color} size={size} />
  // return <Icon name={visible ? 'eye-outline' : 'eye-off-outline'} size={size} color={color} />;
}
