import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TextInput, ScrollView, Pressable } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { fetchCommunities, Community } from '../api/communitiesApi';
import { useTheme } from '../../../hooks/useTheme';
import { useDebounce } from '../../../hooks/useDebounce';
import { CommunityCard } from '../components/CommunityCard';
import { CommunityCardSkeleton } from '../components/CommunityCardSkeleton';
import { radii } from '../../../utils/tokens';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { CommunitiesStackParamList } from '../../../navigation/CommunitiesStackNavigator';

const FILTERS = ['All', 'Tech', 'Finance', 'Health', 'Gaming', 'Food', 'Music', 'Sports', 'Outdoors', 'Pets', 'Creative'];

const FILTER_KEYWORDS: Record<string, string[]> = {
  Tech:     ['react', 'typescript', 'self hosted', 'devs'],
  Finance:  ['finance', 'frugal', 'crypto', 'hustle'],
  Health:   ['fitness', 'running', 'meditation', 'mental'],
  Gaming:   ['gaming', 'indie games', 'retro'],
  Food:     ['coffee', 'cooking', 'hot sauce', 'spice'],
  Music:    ['music', 'guitar', 'vinyl'],
  Sports:   ['soccer', 'basketball', 'cycling'],
  Outdoors: ['hiking', 'van life', 'travel', 'astronomy'],
  Pets:     ['dogs', 'cats', 'aquarium'],
  Creative: ['digital art', 'film photo', 'worldbuilding', 'lego'],
};

type Nav = NativeStackNavigationProp<CommunitiesStackParamList>;

export const CommunityListScreen = () => {
  const { colors, spacing } = useTheme();
  const navigation = useNavigation<Nav>();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const debouncedSearch = useDebounce(searchQuery, 300);
  const debouncedFilter = useDebounce(activeFilter, 150);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ['communities'],
    queryFn: fetchCommunities,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const communities = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  const filteredCommunities = useMemo(() => {
    const search = debouncedSearch.toLowerCase();
    return communities.filter((c) => {
      if (!c.name.toLowerCase().includes(search)) return false;
      if (debouncedFilter === 'All') return true;
      const keywords = FILTER_KEYWORDS[debouncedFilter] ?? [];
      return keywords.some((kw) => c.name.toLowerCase().includes(kw));
    });
  }, [communities, debouncedSearch, debouncedFilter]);

  const renderItem = useCallback(({ item }: { item: Community }) => (
    <CommunityCard
      community={item}
      onPress={() => navigation.navigate('CommunityDetail', { community: item })}
    />
  ), [navigation]);

  const onEndReached = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [hasNextPage, fetchNextPage]);

  const keyExtractor = useCallback((item: Community) => item.id, []);

  if (isLoading) {
    return (
      <ScreenWrapper>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Discover Communities</Text>
          <TextInput
            style={[
              styles.searchInput,
              { backgroundColor: colors.background, color: colors.text, borderColor: colors.border },
            ]}
            placeholder="Search communities..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <View style={styles.skeletonGrid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <View key={i} style={{ width: '48%', marginBottom: 12 }}>
              <CommunityCardSkeleton />
            </View>
          ))}
        </View>
      </ScreenWrapper>
    );
  }

  if (isError) {
    return (
      <ScreenWrapper style={styles.centerContainer}>
        <Text style={{ color: colors.error }}>Failed to load communities.</Text>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Discover Communities</Text>
        <TextInput
          style={[
            styles.searchInput,
            { backgroundColor: colors.background, color: colors.text, borderColor: colors.border },
          ]}
          placeholder="Search communities..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillsRow}
        >
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <Pressable
                key={filter}
                onPress={() => setActiveFilter(filter)}
                style={[
                  styles.pill,
                  {
                    backgroundColor: isActive ? colors.primary : colors.background,
                    borderColor: isActive ? colors.primary : colors.border,
                    borderRadius: radii.full,
                  },
                ]}
              >
                <Text style={[styles.pillText, { color: isActive ? colors.surface : colors.textSecondary }]}>
                  {filter}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={filteredCommunities}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{ padding: spacing.m }}
        columnWrapperStyle={{ gap: spacing.s, marginBottom: spacing.m }}
        onRefresh={refetch}
        refreshing={isRefetching}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage
            ? <ActivityIndicator style={{ margin: spacing.m }} color={colors.primary} />
            : null
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>No results found</Text>
            <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
              {searchQuery ? `No communities match "${searchQuery}"` : `Nothing in ${activeFilter} yet`}
            </Text>
          </View>
        }
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  skeletonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    justifyContent: 'space-between',
    gap: 8,
  },
  header: {
    paddingTop: 30,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },
  searchInput: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 9999,
    borderWidth: 1,
    fontSize: 12,
    marginBottom: 10,
  },
  pillsRow: {
    gap: 8,
    paddingVertical: 2,
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 1,
  },
  pillText: {
    fontSize: 10,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  emptySubtitle: {
    fontSize: 14,
  },
});
