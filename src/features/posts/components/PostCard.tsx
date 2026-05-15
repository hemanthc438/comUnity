import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { Post } from '../api/postsApi';
import { useAuthStore } from '../../../store/useAuthStore';

interface Props {
  post: Post;
}

const formatDate = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

export const PostCard = memo(function PostCard({ post }: Props) {
  const communityName = post.communityName;
  const { colors, radii, spacing } = useTheme();
  const email = useAuthStore((s) => s.email);
    const name = email?.split('@')[0] || 'User';
    const initial = name[0].toUpperCase();
  const isOptimistic = post.id.startsWith('temp-');

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          opacity: isOptimistic ? 0.6 : 1,
        },
      ]}
    >
      {communityName && (
        <Text style={[styles.communityTag, { color: colors.primary, borderBottomColor: colors.border }]}>
          {communityName}
        </Text>
      )}
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: colors.primary + '22' }]}>
          <Text style={[styles.avatarLetter, { color: colors.primary }]}>
            {initial}
          </Text>
        </View>
        <View style={{ gap: 2 }}>
          <Text style={[styles.author, { color: colors.text }]}>{post.authorName}</Text>
          <Text style={[styles.time, { color: colors.textSecondary }]}>
            {formatDate(post.createdAt)}
          </Text>
        </View>
      </View>

      <View style={[styles.body, { paddingHorizontal: spacing.m, paddingBottom: spacing.m }]}>
        <Text style={[styles.title, { color: colors.text }]}>{post.title}</Text>
        {post.content.length > 0 && (
          <Text style={[styles.content, { color: colors.textSecondary }]}>{post.content}</Text>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    paddingBottom: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    fontSize: 14,
    fontWeight: '700',
  },
  author: {
    fontSize: 13,
    fontWeight: '700',
  },
  time: {
    fontSize: 11,
  },
  body: {
    gap: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  content: {
    fontSize: 13,
    lineHeight: 20,
  },
  communityTag: {
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
