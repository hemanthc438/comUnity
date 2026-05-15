import React, { memo } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '../../../../hooks/useTheme';
import { Post } from '../../../posts/api/postsApi';
import { PostCard } from '../../../posts/components/PostCard';

interface Props {
  posts: Post[];
  isLoading: boolean;
}

export const PostsTab = memo(function PostsTab({ posts, isLoading }: Props) {
  const { colors, spacing } = useTheme();

  if (isLoading) {
    return <ActivityIndicator color={colors.primary} style={{ marginTop: spacing.l }} />;
  }

  if (posts.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={[styles.emptyTitle, { color: colors.text }]}>No posts yet</Text>
        <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
          Be the first to post in this community.
        </Text>
      </View>
    );
  }

  return (
    <View>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  empty: {
    // paddingTop: 48,
    alignItems: 'center',
    gap: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  emptySubtitle: {
    fontSize: 13,
    textAlign: 'center',
  },
});
