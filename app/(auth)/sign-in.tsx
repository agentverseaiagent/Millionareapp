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
import { Link, useRouter } from 'expo-router';
import { signIn } from '../../src/features/auth/api';

const C = {
  bg: '#F5F5F5',
  surface: '#FFFFFF',
  border: '#E0E0E0',
  accent: '#E05A00',
  text: '#111111',
  textMuted: '#777777',
  error: '#DC2626',
};

function parseSignInError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes('email not confirmed')) {
    return 'Your email is not confirmed yet. Check your inbox for a confirmation link.';
  }
  if (m.includes('invalid login credentials') || m.includes('invalid email or password')) {
    return 'Incorrect email or password.';
  }
  if (m.includes('too many requests') || m.includes('rate limit')) {
    return 'Too many attempts. Please wait a moment and try again.';
  }
  return message;
}

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignIn() {
    setError(null);
    setLoading(true);
    try {
      await signIn(email.trim(), password);
    } catch (err: any) {
      setError(parseSignInError(err.message ?? 'Something went wrong.'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.appName}>Garagetwits</Text>
        <Text style={styles.appTagline}>Real owner insight, model by model</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.formTitle}>Sign In</Text>

        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={C.textMuted}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={C.textMuted}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonLoading]}
          onPress={handleSignIn}
          disabled={loading}
        >
          {loading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.buttonText}>Sign In</Text>
          }
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => router.push('/(auth)/forgot-password')}
        >
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <Link href="/(auth)/sign-up" style={styles.switchLink}>
        Don't have an account? <Text style={styles.switchLinkAccent}>Sign up</Text>
      </Link>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: C.bg,
  },
  header: {
    marginBottom: 40,
  },
  appName: {
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.5,
    color: C.text,
    marginBottom: 4,
  },
  appTagline: {
    fontSize: 14,
    color: C.textMuted,
  },
  form: {
    backgroundColor: C.surface,
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: C.border,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: C.text,
    marginBottom: 18,
  },
  errorBox: {
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  errorText: {
    color: C.error,
    fontSize: 13,
    lineHeight: 18,
  },
  input: {
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    fontSize: 16,
    color: C.text,
  },
  button: {
    backgroundColor: C.accent,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonLoading: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  forgotButton: {
    marginTop: 14,
    alignItems: 'center',
  },
  forgotText: {
    color: C.textMuted,
    fontSize: 14,
  },
  switchLink: {
    textAlign: 'center',
    color: C.textMuted,
    fontSize: 14,
  },
  switchLinkAccent: {
    color: C.accent,
    fontWeight: '600',
  },
});
