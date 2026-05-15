import React, { memo } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '../../../../hooks/useTheme';
import { Member } from '../../api/communitiesApi';

interface Props {
  members: Member[];
  isLoading: boolean;
  totalMemberCount: number;
}

export const MembersTab = memo(function MembersTab({ members, isLoading, totalMemberCount }: Props) {
  const { colors, spacing } = useTheme();

  return (
    <View>
      <Text style={[styles.sectionLabel, { color: colors.text }]}>Active Members</Text>

      {isLoading ? (
        <ActivityIndicator color={colors.primary} style={{ marginTop: spacing.l }} />
      ) : (
        <View style={styles.grid}>
          {members.map((member) => (
            <View key={member.id} style={styles.item}>
              <Image
                source={{ uri: member.avatar }}
                style={[styles.avatar, { borderColor: colors.border }]}
              />
              <Text style={[styles.name, { color: colors.textSecondary }]} numberOfLines={1}>
                {member.name}
              </Text>
            </View>
          ))}
        </View>
      )}

      {!isLoading && (
        <Text style={[styles.more, { color: colors.textSecondary }]}>
          + {(totalMemberCount - members.length).toLocaleString()} more members
        </Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  sectionLabel: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingTop: 12,
  },
  item: {
    alignItems: 'center',
    width: 64,
    gap: 6,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
  },
  name: {
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
  more: {
    fontSize: 12,
    marginTop: 16,
    textAlign: 'center',
  },
});
