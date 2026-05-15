import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
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
  COMMUNITY_RULES,
  fetchCommunityPosts,
  fetchCommunityMembers,
} from '../api/communitiesApi';
import { useCommunityMutations } from '../hooks/useCommunityMutations';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_HEIGHT = 110;
const AVATAR_SIZE = 106;

const TABS = ['Posts', 'Members', 'About'] as const;
type Tab = typeof TABS[number];

type RouteParams = { community: Community };

export const CommunityDetailScreen = () => {
  const { colors, spacing, radii } = useTheme();
  const route = useRoute();
  const { community } = route.params as RouteParams;

  const pagerRef = useRef<ScrollView>(null);

  const { mutate } = useCommunityMutations();

  const [isJoined, setIsJoined] = useState(community.isJoined);
  const [activeTab, setActiveTab] = useState<Tab>('Posts');
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  const handleJoinToggle = useCallback((joining: boolean) => {
    setIsJoined(joining);
    mutate(
      { id: community.id, isJoining: joining },
      { onError: () => setIsJoined(!joining) },
    );
  }, [community.id, mutate]);

  const handleTabPress = useCallback((tab: Tab, index: number) => {
    setActiveTab(tab);
    pagerRef.current?.scrollTo({ x: index * SCREEN_WIDTH, animated: true });
  }, []);

  const [bannerLoaded, setBannerLoaded] = useState(false);
  const [avatarLoaded, setAvatarLoaded] = useState(false);

  const { data: posts = [], isLoading: postsLoading } = useQuery({
    queryKey: ['communityPosts', community.id],
    queryFn: () => fetchCommunityPosts(community.id),
  });

  const { data: members = [], isLoading: membersLoading } = useQuery({
    queryKey: ['communityMembers', community.id],
    queryFn: () => fetchCommunityMembers(community.id),
  });

  const formattedCount = useMemo(() => {
    if (community.memberCount >= 1_000_000) return `${(community.memberCount / 1_000_000).toFixed(1)}M`;
    if (community.memberCount >= 1000) return `${(community.memberCount / 1000).toFixed(0)}k`;
    return String(community.memberCount);
  }, [community.memberCount]);

  return (
    <ScreenWrapper edges={['top', 'left', 'right', 'bottom']}>
      <BackButton />

      {/* Tab bar — fixed outside ScrollView, no sticky needed */}
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

        <View>
          <View>
            <Shimmer width={SCREEN_WIDTH} height={BANNER_HEIGHT} borderRadius={0} />
            <Image
              source={{ uri: community.coverImage }}
              style={[styles.banner, styles.imageOverlay, { opacity: bannerLoaded ? 1 : 0 }]}
              resizeMode="cover"
              onLoad={() => setBannerLoaded(true)}
            />
          </View>

          <View style={styles.avatarWrapper}>
            <View>
              <Shimmer width={AVATAR_SIZE} height={AVATAR_SIZE} borderRadius={AVATAR_SIZE / 2} />
              <Image
                source={{ uri: community.coverImage }}
                style={[styles.avatar, styles.imageOverlay, { borderColor: colors.background, opacity: avatarLoaded ? 1 : 0 }]}
                resizeMode="cover"
                onLoad={() => setAvatarLoaded(true)}
              />
            </View>
          </View>

          <View style={[styles.infoSection, { paddingHorizontal: spacing.l }]}>
            <Text style={[styles.communityName, { color: colors.text }]}>{community.name}</Text>
            <Text style={[styles.memberCount, { color: colors.primary }]}>{formattedCount} members</Text>
            <Text style={[styles.description, { color: colors.textSecondary }]}>{community.description}</Text>

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

              <Pressable
                style={[styles.iconButton, { borderColor: colors.border, borderRadius: radii.full }]}
              >
                <MaterialCommunityIcons name="share-outline" size={18} color={colors.text} />
              </Pressable>
            </View>
          </View>
        </View>

        <ScrollView
          ref={pagerRef}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={[styles.page, { gap: spacing.m }]}>
            {postsLoading && <ActivityIndicator color={colors.primary} style={{ marginTop: spacing.l }} />}
            {posts.map((post) => (
              <View
                key={post.id}
                style={[styles.postCard, { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radii.l }]}
              >
                <View style={styles.postHeader}>
                  <View style={[styles.postAvatarPlaceholder, { backgroundColor: colors.primary + '22' }]}>
                    <Text style={{ fontSize: 13, fontWeight: '700', color: colors.primary }}>
                      {post.author[0]}
                    </Text>
                  </View>
                  <View>
                    <Text style={[styles.postAuthor, { color: colors.text }]}>{post.author}</Text>
                    <Text style={[styles.postTime, { color: colors.textSecondary }]}>{post.time}</Text>
                  </View>
                </View>
                <Text style={[styles.postContent, { color: colors.text }]}>{post.content}</Text>
                <View style={[styles.postFooter, { borderTopColor: colors.border }]}>
                  <View style={styles.postStat}>
                    <MaterialCommunityIcons name="heart-outline" size={16} color={colors.textSecondary} />
                    <Text style={[styles.postStatText, { color: colors.textSecondary }]}>{post.likes}</Text>
                  </View>
                  <View style={styles.postStat}>
                    <MaterialCommunityIcons name="comment-outline" size={16} color={colors.textSecondary} />
                    <Text style={[styles.postStatText, { color: colors.textSecondary }]}>{post.comments}</Text>
                  </View>
                  <MaterialCommunityIcons name="share-outline" size={16} color={colors.textSecondary} />
                </View>
              </View>
            ))}
          </View>

          <View style={styles.page}>
            <Text style={[styles.sectionLabel, { color: colors.text }]}>Active Members</Text>
            {membersLoading && <ActivityIndicator color={colors.primary} style={{ marginTop: spacing.l }} />}
            <View style={styles.membersGrid}>
              {members.map((member) => (
                <View key={member.id} style={styles.memberItem}>
                  <Image
                    source={{ uri: member.avatar }}
                    style={[styles.memberAvatar, { borderColor: colors.border }]}
                  />
                  <Text style={[styles.memberName, { color: colors.textSecondary }]} numberOfLines={1}>
                    {member.name}
                  </Text>
                </View>
              ))}
            </View>
            <Text style={[styles.memberMore, { color: colors.textSecondary }]}>
              + {(community.memberCount - members.length).toLocaleString()} more members
            </Text>
          </View>

          <View style={[styles.page, { gap: spacing.l }]}>
            <View>
              <Text style={[styles.sectionLabel, { color: colors.text }]}>About</Text>
              <Text style={[styles.aboutText, { color: colors.textSecondary }]}>{community.description}</Text>
            </View>
            <View>
              <Text style={[styles.sectionLabel, { color: colors.text }]}>Community Rules</Text>
              <View style={{ gap: spacing.s }}>
                {COMMUNITY_RULES.map((rule, i) => (
                  <View key={i} style={styles.ruleRow}>
                    <Text style={[styles.ruleNumber, { color: colors.primary }]}>{i + 1}.</Text>
                    <Text style={[styles.ruleText, { color: colors.textSecondary }]}>{rule}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View>
              <Text style={[styles.sectionLabel, { color: colors.text }]}>Stats</Text>
              <View style={styles.statsRow}>
                {[
                  { value: formattedCount, label: 'Members' },
                  { value: '4.2k', label: 'Posts/mo' },
                  { value: '98%', label: 'Positive' },
                ].map((stat) => (
                  <View
                    key={stat.label}
                    style={[styles.statBox, { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radii.l }]}
                  >
                    <Text style={[styles.statValue, { color: colors.primary }]}>{stat.value}</Text>
                    <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </ScrollView>

      <CustomAlert
        visible={showLeaveModal}
        title={`Leave ${community.name}?`}
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
  page: {
    width: SCREEN_WIDTH,
    padding: 16,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  postCard: {
    borderWidth: 1,
    overflow: 'hidden',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    paddingBottom: 8,
  },
  postAvatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postAuthor: {
    fontSize: 13,
    fontWeight: '700',
  },
  postTime: {
    fontSize: 11,
  },
  postContent: {
    fontSize: 13,
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  postFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
  },
  postStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  postStatText: {
    fontSize: 12,
  },
  membersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingTop: 12,
  },
  memberItem: {
    alignItems: 'center',
    width: 64,
    gap: 6,
  },
  memberAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
  },
  memberName: {
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
  memberMore: {
    fontSize: 12,
    marginTop: 16,
    textAlign: 'center',
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 22,
  },
  ruleRow: {
    flexDirection: 'row',
    gap: 8,
  },
  ruleNumber: {
    fontSize: 13,
    fontWeight: '700',
    width: 20,
  },
  ruleText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    gap: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  modalSheet: {
    width: '100%',
    borderRadius: 20,
    borderWidth: 1,
    padding: 24,
    gap: 8,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '800',
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 8,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  modalBtnLeave: {
    backgroundColor: '#E53E3E',
    borderColor: '#E53E3E',
  },
  modalBtnText: {
    fontSize: 14,
    fontWeight: '700',
  },
});
