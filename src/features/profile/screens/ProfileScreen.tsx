import React from 'react';
import { View, Text, Pressable, StyleSheet, Switch } from 'react-native';
import { useAuthStore } from '../../../store/useAuthStore';
import { useTheme } from '../../../hooks/useTheme';
import { useThemeStore } from '../../../store/useThemeStore';
import { GradientButton } from '../../../components/GradientButton';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const ProfileScreen = () => {
  const { colors, spacing, radii } = useTheme();
  const { mode, setMode } = useThemeStore();
  const email = useAuthStore((s) => s.email);
  const name = email?.split('@')[0] || 'User';
  const handleLogout = () => {
    useAuthStore.getState().logout();
  }
  return (
    <ScreenWrapper style={[styles.container,{backgroundColor: colors.background, padding: spacing.l}]}>
      <View style={styles.profileContent}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.m, marginBottom: spacing.l }}>
          <View style={{ width: 64, height: 64, borderRadius: radii.full, backgroundColor: colors.primary }} />
          <View>
            <Text style={[styles.sectionLabel, { color: colors.text }]}>{name}</Text>
            <Text style={{ color: colors.text, opacity: 0.7 }}>{email}</Text>
          </View>
        </View>
      <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginBottom: spacing.l }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.s }}>
          <MaterialCommunityIcons name="theme-light-dark" size={20} color={colors.text} />
          <Text style={[styles.sectionLabel, { color: colors.text }]}>Dark Mode</Text>
        </View>
        <Switch
          value={mode === 'dark'}
          onValueChange={(value) => setMode(value ? 'dark' : 'light')}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={colors.surface}
          ios_backgroundColor={colors.border}
        />
      </View>
      </View>

      <GradientButton label='Logout' onPress={handleLogout} showArrow={false} color={colors.error} />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'space-between',
  },
  profileContent: {
      flex: 1,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.8,
    },
  themeRow: {
    flexDirection: 'row',
    padding: 4,
    borderWidth: 1,
  },
  themeOption: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  themeOptionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  logoutButton: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  logoutText: { fontSize: 16, fontWeight: '600' },
});
