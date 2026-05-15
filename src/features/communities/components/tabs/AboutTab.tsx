import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../../hooks/useTheme';
import { COMMUNITY_RULES } from '../../api/communitiesApi';

interface Props {
  description: string;
  formattedMemberCount: string;
}

export const AboutTab = memo(function AboutTab({ description, formattedMemberCount }: Props) {
  const { colors, spacing, radii } = useTheme();

  return (
    <View style={{ gap: spacing.l }}>
      <View>
        <Text style={[styles.sectionLabel, { color: colors.text }]}>About</Text>
        <Text style={[styles.aboutText, { color: colors.textSecondary }]}>{description}</Text>
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
            { value: formattedMemberCount, label: 'Members' },
            { value: '4.2k', label: 'Posts/mo' },
            { value: '98%', label: 'Positive' },
          ].map((stat) => (
            <View
              key={stat.label}
              style={[
                styles.statBox,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: radii.l,
                },
              ]}
            >
              <Text style={[styles.statValue, { color: colors.primary }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
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
});
