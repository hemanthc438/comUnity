import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../hooks/useTheme';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { Shimmer } from '../../../components/Shimmer';
import { BackButton } from '../../../components/buttons/BackButton';
import { CustomAlert } from '../../../components/modals/CustomAlert';
import {
  Community,
  fetchCommunityById,
  fetchCommunityPosts,
  fetchCommunityMembers,
} from '../api/communitiesApi';
import { useCommunityMutations } from '../hooks/useCommunityMutations';
import { PostsTab } from '../components/tabs/PostsTab';
import { MembersTab } from '../components/tabs/MembersTab';
import { AboutTab } from '../components/tabs/AboutTab';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_HEIGHT = 110;
const AVATAR_SIZE = 106;

const TABS = ['Posts', 'Members', 'About'] as const;
type Tab = typeof TABS[number];

type RouteParams = { community: Community };

export const CommunityDetailScreen = () => {
  const { colors, spacing, radii } = useTheme();
  const route = useRoute();
  const { community: navCommunity } = route.params as RouteParams;

  const pagerRef = useRef<ScrollView>(null);
  const { mutate } = useCommunityMutations();

  const [activeTab, setActiveTab] = useState<Tab>('Posts');
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [bannerLoaded, setBannerLoaded] = useState(false);
  const [avatarLoaded, setAvatarLoaded] = useState(false);

  // Subscribe to the live ['community', id] cache entry.
  // initialData from nav param → zero loading flash.
  // Mutation keeps this in sync via optimistic setQueryData.
  const { data: community = navCommunity } = useQuery<Community | null>({
    queryKey: ['community', navCommunity.id],
    queryFn: () => fetchCommunityById(navCommunity.id),
    initialData: navCommunity,
    staleTime: Infinity,
  });

  const isJoined = community?.isJoined ?? navCommunity.isJoined;

  const { data: posts = [], isLoading: postsLoading } = useQuery({
    queryKey: ['communityPosts', navCommunity.id],
    queryFn: () => fetchCommunityPosts(navCommunity.id),
  });

  const { data: members = [], isLoading: membersLoading } = useQuery({
    queryKey: ['communityMembers', navCommunity.id],
    queryFn: () => fetchCommunityMembers(navCommunity.id),
  });

  const formattedCount = useMemo(() => {
    const count = community?.memberCount ?? navCommunity.memberCount;
    if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(0)}k`;
    return String(count);
  }, [community?.memberCount, navCommunity.memberCount]);

  const handleJoinToggle = useCallback((joining: boolean) => {
    mutate({ id: navCommunity.id, isJoining: joining });
  }, [navCommunity.id, mutate]);

  const handleTabPress = useCallback((tab: Tab, index: number) => {
    setActiveTab(tab);
    pagerRef.current?.scrollTo({ x: index * SCREEN_WIDTH, animated: true });
  }, []);

  return (
    <ScreenWrapper edges={['top', 'left', 'right', 'bottom']}>
      <BackButton />

      <View style={[styles.tabBar, { borderBottomColor: colors.border, backgroundColor: colors.background }]}>
        {TABS.map((tab, index) => {
          const isActive = activeTab === tab;
          return (
            <Pressable
              key={tab}
              onPress={() => handleTabPress(tab, index)}
              style={[styles.tab, { borderBottomColor: isActive ? colors.primary : 'transparent' }]}
            >
              <Text style={[styles.tabText, { color: isActive ? colors.primary : colors.textSecondary }]}>
                {tab}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero — banner + avatar + info */}
        <View>
          <View>
            <Shimmer width={SCREEN_WIDTH} height={BANNER_HEIGHT} borderRadius={0} />
            <Image
              source={{ uri: navCommunity.coverImage }}
              style={[styles.banner, styles.imageOverlay, { opacity: bannerLoaded ? 1 : 0 }]}
              resizeMode="cover"
              onLoad={() => setBannerLoaded(true)}
            />
          </View>

          <View style={styles.avatarWrapper}>
            <View>
              <Shimmer width={AVATAR_SIZE} height={AVATAR_SIZE} borderRadius={AVATAR_SIZE / 2} />
              <Image
                source={{ uri: navCommunity.coverImage }}
                style={[styles.avatar, styles.imageOverlay, { borderColor: colors.background, opacity: avatarLoaded ? 1 : 0 }]}
                resizeMode="cover"
                onLoad={() => setAvatarLoaded(true)}
              />
            </View>
          </View>

          <View style={[styles.infoSection, { paddingHorizontal: spacing.l }]}>
            <Text style={[styles.communityName, { color: colors.text }]}>{navCommunity.name}</Text>
            <Text style={[styles.memberCount, { color: colors.primary }]}>{formattedCount} members</Text>
            <Text style={[styles.description, { color: colors.textSecondary }]}>{navCommunity.description}</Text>

            <View style={styles.actions}>
              <Pressable
                onPress={() => isJoined ? setShowLeaveModal(true) : handleJoinToggle(true)}
                style={[
                  styles.joinButton,
                  {
                    backgroundColor: isJoined ? colors.surface : colors.primary,
                    borderColor: isJoined ? colors.border : colors.primary,
                    borderRadius: radii.full,
                  },
                ]}
              >
                <Text style={[styles.joinText, { color: isJoined ? colors.text : '#fff' }]}>
                  {isJoined ? 'Joined ✓' : 'Join Community'}
                </Text>
              </Pressable>

              <Pressable style={[styles.iconButton, { borderColor: colors.border, borderRadius: radii.full }]}>
                <MaterialCommunityIcons name="share-outline" size={18} color={colors.text} />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Tab pages */}
        <ScrollView
          ref={pagerRef}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.page}>
            <PostsTab posts={posts} isLoading={postsLoading} />
          </View>

          <View style={styles.page}>
            <MembersTab
              members={members}
              isLoading={membersLoading}
              totalMemberCount={community?.memberCount ?? navCommunity.memberCount}
            />
          </View>

          <View style={styles.page}>
            <AboutTab
              description={navCommunity.description}
              formattedMemberCount={formattedCount}
            />
          </View>
        </ScrollView>
      </ScrollView>

      <CustomAlert
        visible={showLeaveModal}
        title={`Leave ${navCommunity.name}?`}
        subtitle="You'll stop receiving updates and lose your member status."
        onDismiss={() => setShowLeaveModal(false)}
        actions={[
          { label: 'Cancel', onPress: () => setShowLeaveModal(false) },
          {
            label: 'Leave',
            variant: 'destructive',
            onPress: () => {
              handleJoinToggle(false);
              setShowLeaveModal(false);
            },
          },
        ]}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
  },
  banner: {
    width: SCREEN_WIDTH,
    height: BANNER_HEIGHT,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  avatarWrapper: {
    alignItems: 'center',
    marginTop: -(AVATAR_SIZE / 2),
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 3,
  },
  infoSection: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 20,
    gap: 6,
  },
  communityName: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  memberCount: {
    fontSize: 13,
    fontWeight: '600',
  },
  description: {
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 6,
  },
  joinButton: {
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderWidth: 1,
  },
  joinText: {
    fontSize: 14,
    fontWeight: '700',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  page: {
    width: SCREEN_WIDTH,
    padding: 16,
    paddingBottom: 40,
  },
});
