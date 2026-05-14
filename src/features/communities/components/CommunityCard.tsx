import React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { Community } from '../api/communitiesApi';

interface Props {
  community: Community;
}

export const CommunityCard = ({ community }: Props) => {
  const { colors, spacing, radii } = useTheme();

  const formattedCount = community.memberCount >= 1000
    ? `${(community.memberCount / 1000).toFixed(1)}k`
    : String(community.memberCount);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderRadius: radii.m,
          marginBottom: spacing.m,
          borderColor: colors.border,
          ...Platform.select({
            ios: {
              shadowColor: colors.shadow,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 1,
              shadowRadius: 12,
            },
            android: { elevation: 4 },
          }),
        },
      ]}
    >
      <Image
        source={{ uri: community.coverImage }}
        style={[styles.coverImage, { borderTopLeftRadius: radii.m, borderTopRightRadius: radii.m }]}
        resizeMode="cover"
      />
      <View style={{ padding: spacing.m }}>
        <Text style={[styles.name, { color: colors.text }]}>{community.name}</Text>
        <Text
          style={[styles.description, { color: colors.textSecondary }]}
          numberOfLines={2}
        >
          {community.description}
        </Text>
        <Text style={[styles.memberCount, { color: colors.primary }]}>
          {formattedCount} members
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderWidth: 1,
  },
  coverImage: {
    width: '100%',
    height: 140,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  memberCount: {
    fontSize: 13,
    fontWeight: '600',
  },
});
