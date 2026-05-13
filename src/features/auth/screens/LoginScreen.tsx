import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EyeIcon } from '../../../components/EyeIcon';
import { GradientButton } from '../../../components/GradientButton';
import { useTheme } from '../../../hooks/useTheme';
import { useAuthStore } from '../../../store/useAuthStore';
import { loginApi } from '../api/authApi';
import type { Colors } from '../../../utils/tokens';
import { AppLogo } from '../../../components/AppLogo';

export function LoginScreen() {
  const { colors, spacing, radii } = useTheme();
  const login = useAuthStore((s) => s.login);
  const styles = createStyles(colors, spacing, radii);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const token = await loginApi(email, password);
      login(token);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inner}
      >
        <View style={styles.logoWrapper}>
          <AppLogo size={220} />
        </View>

        <View style={styles.inputs}>
          <View style={styles.titleWrapper}>
            <Text style={styles.subtitle}>Welcome to com</Text><Text style={styles.subtitle}>Unity!</Text>
          </View>
          <TextInput
            value={email}
            onChangeText={setEmail} 
            placeholder="Email"
            placeholderTextColor={colors.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
          <View style={styles.passwordWrapper}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor={colors.textSecondary}
              secureTextEntry={!showPassword}
              style={styles.passwordInput}
            />
            <Pressable onPress={() => setShowPassword(p => !p)} style={styles.eyeButton}>
              <EyeIcon visible={showPassword} color={colors.textSecondary} />
            </Pressable>
          </View>
        {error && <Text style={styles.error}>{error}</Text>}
        <View style={styles.buttonWrapper}>
          <GradientButton
            label="Sign In"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
          />
        </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const createStyles = (
  colors: Colors,
  spacing: Record<string, number>,
  radii: Record<string, number>
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      position: 'relative',
    },
    logoWrapper: {
      top: 0,
      left: 0,
      right: 0,
      alignItems: 'center',
      flexDirection: 'column',
      marginBottom: spacing.l,
    },
    titleWrapper: {
      flexDirection: 'row',
    },
    inner: {
      flex: 1,
      paddingHorizontal: spacing.l,
    },
    title: {
      color: colors.primary,
      fontSize: 32,
      fontWeight: '700',
      marginBottom: spacing.xs,
    },
    subtitle: {
      color: colors.text,
      fontSize: 16,
      marginBottom: spacing.m,

    },
    inputs: {
      alignItems: 'center',
      width: '100%',
      gap: spacing.s,
      backgroundColor: colors.surface,
      padding: spacing.l,
      borderRadius: radii.xxl,
    },
    passwordWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      backgroundColor: colors.background,
      borderRadius: radii.l,
    },
    passwordInput: {
      flex: 1,
      color: colors.text,
      paddingHorizontal: spacing.m,
      paddingVertical: spacing.m,
      fontSize: 14,
    },
    eyeButton: {
      paddingHorizontal: spacing.m,
    },
    input: {
      backgroundColor: colors.background,
      width: '100%',
      color: colors.text,
      borderRadius: radii.l,
      paddingHorizontal: spacing.m,
      paddingVertical: spacing.m,
      fontSize: 14,
    },
    error: {
      color: colors.error,
      fontSize: 14,
      marginTop: spacing.s,
    },
    buttonWrapper: {
      width: '100%',
      marginTop: spacing.l,
    },
  });
