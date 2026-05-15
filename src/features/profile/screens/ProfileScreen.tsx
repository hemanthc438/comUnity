import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Image } from 'react-native';
import { useAuthStore } from '../../../store/useAuthStore';
import { useTheme } from '../../../hooks/useTheme';
import { useThemeStore } from '../../../store/useThemeStore';
import { GradientButton } from '../../../components/GradientButton';
import { ScreenWrapper } from '../../../components/ScreenWrapper';
import { CustomAlert } from '../../../components/modals/CustomAlert';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const ProfileScreen = () => {
  const { colors, spacing, radii } = useTheme();
  const { mode, setMode } = useThemeStore();
  const email = useAuthStore((s) => s.email);
  const name = email?.split('@')[0] || 'User';
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [shouldCrash, setShouldCrash] = useState(false);

  if (shouldCrash) {
    const corruptedData: any = null;
    console.log(corruptedData.avatarUrl);
  }

  return (
    <ScreenWrapper style={[styles.container, { backgroundColor: colors.background, paddingHorizontal: spacing.l }]}>

      <View style={styles.content}>
        <View style={[
          styles.profileCard,
          {
            backgroundColor: colors.surface,
            borderRadius: radii.l,
            padding: spacing.l
          }
        ]}>
          <View
            style={[styles.avatar, { borderColor: colors.border }]}
          />
          <View style={styles.profileInfo}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.nameText, { color: colors.text }]}>
              {name}
            </Text>
            <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.emailText, { color: colors.textSecondary }]}>
              {email}
            </Text>
          </View>
        </View>

        <View style={[styles.settingRow, { paddingVertical: spacing.l }]}>
          <View style={styles.settingLabelContainer}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primary + '15' }]}>
              <MaterialCommunityIcons name="theme-light-dark" size={22} color={colors.primary} />
            </View>
            <Text style={[styles.settingLabel, { color: colors.text }]}>Dark Mode</Text>
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

      <View style={{ marginBottom: spacing.l }}>
        <GradientButton label='Test Error Boundary' onPress={() => setShouldCrash(true)} showArrow={false} color={colors.primary} />
      </View>

      <View style={{ marginBottom: spacing.l }}>
        <GradientButton label='Logout' onPress={() => setShowLogoutAlert(true)} showArrow={false} color={colors.error} />
      </View>

      <CustomAlert
        visible={showLogoutAlert}
        title="Log out?"
        subtitle="You'll need to sign in again to access your account."
        onDismiss={() => setShowLogoutAlert(false)}
        actions={[
          { label: 'Cancel', onPress: () => setShowLogoutAlert(false) },
          { label: 'Log out', variant: 'destructive', onPress: () => useAuthStore.getState().logout() },
        ]}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  emailText: {
    fontSize: 14,
    fontWeight: '500',
  },
  settingsSection: {
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  settingsHeader: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
});
