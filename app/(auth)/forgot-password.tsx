import { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { requestPasswordReset } from '../../src/features/auth/api';

const C = {
  bg: '#0A0A0A',
  surface: '#181818',
  border: '#2A2A2A',
  accent: '#E05A00',
  text: '#F0F0F0',
  textMuted: '#888',
  error: '#F87171',
};

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleRequest() {
    if (!email.trim()) return;
    setLoading(true);
    try {
      await requestPasswordReset(email.trim());
    } catch (err: any) {
      console.error('[forgot-password] reset request failed:', err.message);
    } finally {
      setLoading(false);
      // Always show success — prevents email enumeration
      setSent(true);
    }
  }

  if (sent) {
    return (
      <View style={styles.successContainer}>
        <Ionicons name="mail-outline" size={48} color={C.accent} />
        <Text style={styles.successTitle}>Check your email</Text>
        <Text style={styles.successBody}>
          If an account exists for{'\n'}
          <Text style={{ color: C.text }}>{email.trim()}</Text>
          {'\n'}you'll receive a reset link shortly.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace('/(auth)/sign-in')}
        >
          <Text style={styles.buttonText}>Back to Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableOpacity style={styles.backRow} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={20} color={C.textMuted} />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Reset password</Text>
      <Text style={styles.body}>
        Enter your email and we'll send you a reset link.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={C.textMuted}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoFocus
      />

      <TouchableOpacity
        style={[styles.button, (!email.trim() || loading) && styles.buttonDisabled]}
        onPress={handleRequest}
        disabled={!email.trim() || loading}
      >
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.buttonText}>Send reset link</Text>
        }
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: C.bg,
    paddingTop: 60,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 40,
  },
  backText: {
    color: C.textMuted,
    fontSize: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: C.text,
    marginBottom: 10,
  },
  body: {
    fontSize: 14,
    color: C.textMuted,
    marginBottom: 28,
    lineHeight: 20,
  },
  input: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    color: C.text,
  },
  button: {
    backgroundColor: C.accent,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#2A2A2A',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  successContainer: {
    flex: 1,
    backgroundColor: C.bg,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    gap: 14,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: C.text,
    textAlign: 'center',
  },
  successBody: {
    fontSize: 15,
    color: C.textMuted,
    textAlign: 'center',
    lineHeight: 23,
  },
});
