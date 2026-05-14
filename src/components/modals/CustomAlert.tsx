import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface AlertAction {
  label: string;
  onPress: () => void;
  variant?: 'default' | 'destructive';
}

interface Props {
  visible: boolean;
  title: string;
  subtitle?: string;
  actions: AlertAction[];
  onDismiss: () => void;
}

export const CustomAlert = ({ visible, title, subtitle, actions, onDismiss }: Props) => {
  const { colors, radii } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <Pressable style={styles.overlay} onPress={onDismiss}>
        <Pressable
          style={[styles.sheet, { backgroundColor: colors.surface, borderColor: colors.border }]}
          onPress={() => {}}
        >
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          {subtitle && (
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
          )}

          <View style={styles.actions}>
            {actions.map((action) => (
              <Pressable
                key={action.label}
                onPress={action.onPress}
                style={[
                  styles.btn,
                  { borderRadius: radii.full },
                  action.variant === 'destructive'
                    ? styles.btnDestructive
                    : { borderWidth: 1, borderColor: colors.border },
                ]}
              >
                <Text
                  style={[
                    styles.btnText,
                    { color: action.variant === 'destructive' ? '#fff' : colors.text },
                  ]}
                >
                  {action.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  sheet: {
    width: '100%',
    borderRadius: 20,
    borderWidth: 1,
    padding: 24,
    gap: 8,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  btn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnDestructive: {
    backgroundColor: '#E53E3E',
    borderColor: '#E53E3E',
    borderWidth: 1,
  },
  btnText: {
    fontSize: 14,
    fontWeight: '700',
  },
});
