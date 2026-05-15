import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../hooks/useTheme';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { GradientButton } from '../../../components/GradientButton';
import { Shimmer } from '../../../components/Shimmer';
import { Toast } from '../../../components/Toast';
import { fetchCommunities, Community } from '../../communities/api/communitiesApi';
import { useGlobalPostDraft } from '../hooks/useGlobalPostDraft';
import { usePostMutations } from '../hooks/usePostMutations';

type CommunitiesPage = { data: Community[]; nextPage: number | null };

export const GlobalCreatePostScreen = () => {
  const { colors, spacing, radii } = useTheme();
  const navigation = useNavigation<any>();
  const { title, setTitle, content, setContent, selectedCommunityId, setSelectedCommunityId, clearDraft } = useGlobalPostDraft();
  const { mutate, isPending } = usePostMutations();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  const { data, isLoading: communitiesLoading } = useInfiniteQuery<CommunitiesPage, Error, InfiniteData<CommunitiesPage>, string[], number>({
    queryKey: ['communities'],
    queryFn: ({ pageParam }) => fetchCommunities({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
  });

  const joinedCommunities = data?.pages.flatMap((p) => p.data).filter((c) => c.isJoined) ?? [];
  const selectedCommunity = joinedCommunities.find((c) => c.id === selectedCommunityId);
  const canSubmit = title.trim().length > 0 && selectedCommunityId.length > 0 && !isPending;

  const handleSubmit = useCallback(() => {
    if (!canSubmit) return;
    mutate(
      { communityId: selectedCommunityId, communityName: selectedCommunity?.name ?? '', title: title.trim(), content: content.trim() },
      {
        onSuccess: () => {
          clearDraft();
          setSuccessVisible(true);
        },
      }
    );
  }, [canSubmit, selectedCommunityId, title, content, mutate, clearDraft]);

  const handleSelectCommunity = useCallback((id: string) => {
    setSelectedCommunityId(id);
    setDropdownOpen(false);
  }, [setSelectedCommunityId]);

  const renderCommunityRow = useCallback(({ item }: { item: Community }) => {
    const isSelected = item.id === selectedCommunityId;
    return (
      <Pressable
        onPress={() => handleSelectCommunity(item.id)}
        style={[
          styles.communityRow,
          { borderBottomColor: colors.border },
          isSelected && { backgroundColor: colors.primary + '12' },
        ]}
      >
        <Text style={[styles.communityRowText, { color: isSelected ? colors.primary : colors.text }]}>
          {item.name}
        </Text>
        {isSelected && (
          <MaterialCommunityIcons name="check" size={18} color={colors.primary} />
        )}
      </Pressable>
    );
  }, [selectedCommunityId, colors, handleSelectCommunity]);

  const renderDropdown = () => {
    if (communitiesLoading) {
      return <Shimmer width="100%" height={48} borderRadius={radii.l} />;
    }

    return (
      <Pressable
        onPress={() => joinedCommunities.length > 0 && setDropdownOpen(true)}
        style={[
          styles.dropdown,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderRadius: radii.l,
            opacity: joinedCommunities.length === 0 ? 0.5 : 1,
          },
        ]}
      >
        <Text
          style={[
            styles.dropdownText,
            { color: selectedCommunity ? colors.text : colors.textSecondary },
          ]}
          numberOfLines={1}
        >
          {selectedCommunity ? selectedCommunity.name : 'Select a community'}
        </Text>
        <MaterialCommunityIcons name="chevron-down" size={20} color={colors.textSecondary} />
      </Pressable>
    );
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <View style={[styles.header, { paddingHorizontal: spacing.m, paddingTop: spacing.l }]}>
          <Text style={[styles.screenTitle, { color: colors.text }]}>Create Post</Text>
        </View>

        <View style={{ flex: 1, paddingHorizontal: spacing.m, gap: spacing.m }}>
          <View style={{ gap: spacing.s }}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>POST TO</Text>
            {renderDropdown()}
            {!communitiesLoading && joinedCommunities.length === 0 && (
              <Text style={[styles.hint, { color: colors.textSecondary }]}>
                Join a community first before you can post.
              </Text>
            )}
          </View>

          <View style={[styles.inputBlock, { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radii.l }]}>
            <TextInput
              style={[styles.titleInput, { color: colors.text }]}
              placeholder="Title"
              placeholderTextColor={colors.textSecondary}
              value={title}
              onChangeText={setTitle}
              maxLength={120}
              returnKeyType="next"
              editable={!isPending}
            />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <TextInput
              style={[styles.contentInput, { color: colors.text }]}
              placeholder="What's on your mind? (optional)"
              placeholderTextColor={colors.textSecondary}
              value={content}
              onChangeText={setContent}
              multiline
              textAlignVertical="top"
              editable={!isPending}
            />
          </View>
        </View>

        <View style={[styles.footer, { paddingHorizontal: spacing.m, paddingBottom: spacing.l }]}>
          <GradientButton
            label="Post"
            onPress={handleSubmit}
            disabled={!canSubmit}
            loading={isPending}
          />
        </View>
      </KeyboardAvoidingView>

      <Toast
        visible={successVisible}
        message="Post published!"
        type="success"
        duration={2000}
        onHide={() => {
          setSuccessVisible(false);
          navigation.navigate('Home');
        }}
      />

      <Modal
        visible={dropdownOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownOpen(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setDropdownOpen(false)}>
          <Pressable
            style={[styles.modalSheet, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={() => {}}
          >
            <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Select Community</Text>
              <Pressable onPress={() => setDropdownOpen(false)}>
                <MaterialCommunityIcons name="close" size={20} color={colors.textSecondary} />
              </Pressable>
            </View>

            <FlatList
              data={joinedCommunities}
              keyExtractor={(item) => item.id}
              renderItem={renderCommunityRow}
              showsVerticalScrollIndicator={false}
              bounces={false}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingBottom: 16,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '800',
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
  },
  dropdownText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    marginRight: 8,
  },
  hint: {
    fontSize: 12,
    lineHeight: 18,
  },
  inputBlock: {
    borderWidth: 1,
    overflow: 'hidden',
  },
  titleInput: {
    fontSize: 16,
    fontWeight: '600',
    padding: 16,
    paddingBottom: 12,
  },
  divider: {
    height: 1,
    marginHorizontal: 16,
  },
  contentInput: {
    fontSize: 14,
    padding: 16,
    paddingTop: 12,
    minHeight: 120,
    lineHeight: 22,
  },
  footer: {
    paddingTop: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderBottomWidth: 0,
    maxHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  communityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  communityRowText: {
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
  },
});
