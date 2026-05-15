import React, { useCallback } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Shimmer } from '../../../components/Shimmer';
import { PostCard } from '../../posts/components/PostCard';
import { useFeed, FeedPost } from '../hooks/useFeed';

const PostSkeleton = () => {
  const { colors, radii } = useTheme();
  return (
    <View style={[styles.skeletonCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={styles.skeletonHeader}>
        <Shimmer width={36} height={36} borderRadius={radii.full} />
        <View style={{ gap: 6 }}>
          <Shimmer width={100} height={11} borderRadius={6} />
          <Shimmer width={60} height={9} borderRadius={6} />
        </View>
      </View>
      <View style={{ paddingHorizontal: 12, paddingBottom: 14, gap: 6 }}>
        <Shimmer width="80%" height={13} borderRadius={6} />
        <Shimmer width="95%" height={11} borderRadius={6} />
        <Shimmer width="60%" height={11} borderRadius={6} />
      </View>
    </View>
  );
};

export const HomeScreen = () => {
  const { colors, spacing } = useTheme();
  const { feed, isLoading } = useFeed();

  const renderItem = useCallback(({ item }: { item: FeedPost }) => (
    <PostCard post={item} />
  ), []);

  const keyExtractor = useCallback((item: FeedPost) => item.id, []);

  const header = (
    <View style={[styles.header, { paddingHorizontal: spacing.m, paddingTop: spacing.l, paddingBottom: spacing.s }]}>
      <Text style={[styles.title, { color: colors.text }]}>Explore ComUnity</Text>
    </View>
  );

  if (isLoading) {
    return (
      <ScreenWrapper>
        {header}
        {Array.from({ length: 4 }).map((_, i) => <PostSkeleton key={i} />)}
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <FlatList
        data={feed}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={header}
        contentContainerStyle={{ paddingBottom: spacing.xl }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>No posts yet</Text>
            <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
              Be the first to post in a community.
            </Text>
          </View>
        }
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    gap: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 12,
  },
  skeletonCard: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 1,
  },
  skeletonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    paddingBottom: 10,
  },
  empty: {
    paddingTop: 80,
    alignItems: 'center',
    paddingHorizontal: 32,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  emptySubtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
});
