import React, { memo } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../../hooks/useTheme';
import { Post } from '../../api/communitiesApi';

interface Props {
  posts: Post[];
  isLoading: boolean;
}

export const PostsTab = memo(function PostsTab({ posts, isLoading }: Props) {
  const { colors, spacing, radii } = useTheme();

  if (isLoading) {
    return <ActivityIndicator color={colors.primary} style={{ marginTop: spacing.l }} />;
  }

  return (
    <View style={{ gap: spacing.m }}>
      {posts.map((post) => (
        <View
          key={post.id}
          style={[
            styles.card,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderRadius: radii.l,
            },
          ]}
        >
          <View style={styles.header}>
            <View style={[styles.avatarPlaceholder, { backgroundColor: colors.primary + '22' }]}>
              <Text style={{ fontSize: 13, fontWeight: '700', color: colors.primary }}>
                {post.author[0]}
              </Text>
            </View>
            <View>
              <Text style={[styles.author, { color: colors.text }]}>{post.author}</Text>
              <Text style={[styles.time, { color: colors.textSecondary }]}>{post.time}</Text>
            </View>
          </View>

          <Text style={[styles.content, { color: colors.text }]}>{post.content}</Text>

          <View style={[styles.footer, { borderTopColor: colors.border }]}>
            <View style={styles.stat}>
              <MaterialCommunityIcons name="heart-outline" size={16} color={colors.textSecondary} />
              <Text style={[styles.statText, { color: colors.textSecondary }]}>{post.likes}</Text>
            </View>
            <View style={styles.stat}>
              <MaterialCommunityIcons name="comment-outline" size={16} color={colors.textSecondary} />
              <Text style={[styles.statText, { color: colors.textSecondary }]}>{post.comments}</Text>
            </View>
            <MaterialCommunityIcons name="share-outline" size={16} color={colors.textSecondary} />
          </View>
        </View>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    paddingBottom: 8,
  },
  avatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  author: {
    fontSize: 13,
    fontWeight: '700',
  },
  time: {
    fontSize: 11,
  },
  content: {
    fontSize: 13,
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
  },
});
