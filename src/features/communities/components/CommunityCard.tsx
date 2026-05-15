import React, { memo, useCallback, useMemo, useState } from 'react';
import { View, Text, Image, StyleSheet, Platform, Pressable } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { Community } from '../api/communitiesApi';
import { useCommunityMutations } from '../hooks/useCommunityMutations';

interface Props {
  community: Community;
  onPress?: () => void;
}

const AVATAR_SIZE = 64;

export const CommunityCard = memo(function CommunityCard({ community, onPress }: Props) {
  const { colors, radii } = useTheme();
  const { mutate } = useCommunityMutations();
  const [isJoined, setIsJoined] = useState(community.isJoined);

  const handleJoinToggle = useCallback(() => {
    const joining = !isJoined;
    setIsJoined(joining);
    mutate(
      { id: community.id, isJoining: joining },
      { onError: () => setIsJoined(!joining) },
    );
  }, [isJoined, community.id, mutate]);

  const formattedCount = useMemo(() => {
    if (community.memberCount >= 1_000_000) {
      return `${(community.memberCount / 1_000_000).toFixed(1)}M`;
    }
    if (community.memberCount >= 1000) {
      return `${(community.memberCount / 1000).toFixed(0)}k`;
    }
    return String(community.memberCount);
  }, [community.memberCount]);

  return (
    <Pressable
      onPress={onPress}
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
      <Image
        source={{ uri: community.coverImage }}
        style={[styles.banner, { borderTopLeftRadius: radii.m, borderTopRightRadius: radii.m }]}
        resizeMode="cover"
      />

      <Pressable
        onPress={handleJoinToggle}
        style={[
          styles.joinButton,
          {
            backgroundColor: isJoined ? colors.surface : colors.primary,
            borderColor: isJoined ? colors.border : colors.primary,
            borderRadius: radii.full,
          },
        ]}
      >
        <Text style={[styles.joinText, { color: colors.text }]}>
          {isJoined ? '✓' : 'Join'}
        </Text>
      </Pressable>

      <View style={styles.avatarWrapper}>
        <Image
          source={{ uri: community.coverImage }}
          style={[
            styles.avatar,
            {
              borderRadius: radii.full,
              borderColor: colors.surface,
              backgroundColor: colors.border,
            },
          ]}
          resizeMode="cover"
        />
      </View>

      <View style={styles.body}>
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
          {community.name}
        </Text>
        <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={2}>
          {community.description}
        </Text>
        <Text style={[styles.memberCount, { color: colors.primary }]}>
          {formattedCount} members
        </Text>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 1,
    overflow: 'hidden',
  },
  banner: {
    width: '100%',
    height: 60,
  },
  avatarWrapper: {
    alignItems: 'center',
    marginTop: -(AVATAR_SIZE / 2),
    marginBottom: 6,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderWidth: 3,
  },
  body: {
    paddingHorizontal: 10,
    paddingBottom: 12,
    alignItems: 'center',
    gap: 3,
  },
  name: {
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
  },
  description: {
    fontSize: 10,
    lineHeight: 14,
    textAlign: 'center',
  },
  memberCount: {
    fontSize: 11,
    fontWeight: '600',
  },
  joinButton: {
    position: 'absolute',
    top: 8,
    right: 10,
    paddingHorizontal: 10,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  joinText: {
    fontSize: 8,
    fontWeight: '700',
  },
});
