import React, { memo } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { Shimmer } from '../../../components/Shimmer';

const AVATAR_SIZE = 64;

export const CommunityCardSkeleton = memo(function CommunityCardSkeleton() {
  const { colors, radii } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderRadius: radii.xxl,
          borderColor: colors.border,
          ...Platform.select({
            ios: {
              shadowColor: colors.shadow,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 1,
              shadowRadius: 10,
            },
            android: { elevation: 3 },
          }),
        },
      ]}
    >
      <Shimmer width="100%" height={60} borderRadius={0} />

      <View style={styles.avatarWrapper}>
        <Shimmer width={AVATAR_SIZE} height={AVATAR_SIZE} borderRadius={radii.full} style={{ borderWidth: 3, borderColor: colors.surface }} />
      </View>

      <View style={styles.body}>
        <Shimmer width={90} height={12} borderRadius={6} />
        <Shimmer width={110} height={9} borderRadius={6} style={{ marginTop: 4 }} />
        <Shimmer width={110} height={9} borderRadius={6} style={{ marginTop: 2 }} />
        <Shimmer width={60} height={9} borderRadius={6} style={{ marginTop: 4 }} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    overflow: 'hidden',
    width: '100%',
    height: 160,
  },
  avatarWrapper: {
    alignItems: 'center',
    marginTop: -(AVATAR_SIZE / 2),
    marginBottom: 6,
  },
  body: {
    paddingHorizontal: 10,
    paddingBottom: 14,
    alignItems: 'center',
  },
});
