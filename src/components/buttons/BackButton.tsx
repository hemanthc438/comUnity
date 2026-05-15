import React, { memo } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../hooks/useTheme';

interface Props {
  onPress?: () => void;
}

export const BackButton = memo(function BackButton({ onPress }: Props) {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={[styles.row, { backgroundColor: colors.background }]}>
      <Pressable
        onPress={onPress ?? (() => navigation.goBack())}
        style={[styles.button, { backgroundColor: colors.surface, borderColor: colors.border }]}
        hitSlop={8}
      >
        <MaterialCommunityIcons name="arrow-left" size={20} color={colors.text} />
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
