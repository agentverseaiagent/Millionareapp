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
import { Link, useRouter } from 'expo-router';
import { signUp } from '../../src/features/auth/api';

const C = {
  bg: '#F5F5F5',
  surface: '#FFFFFF',
  border: '#E0E0E0',
  accent: '#E05A00',
  text: '#111111',
  textMuted: '#777777',
  error: '#DC2626',
  success: '#059669',
};

function parseSignUpError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes('user already registered') || m.includes('already been registered')) {
    return 'An account with this email already exists. Sign in instead.';
  }
  if (m.includes('password should be at least') || m.includes('password must be at least')) {
    return 'Password must be at least 6 characters.';
  }
  if (m.includes('unable to validate email') || m.includes('invalid email')) {
    return 'Please enter a valid email address.';
  }
  // SMTP / email delivery failures
  if (m.includes('sending confirmation email') || m.includes('error sending')) {
    return 'Could not send confirmation email. Please try again in a moment.';
  }
  // Supabase rate limit on email sends (default: 2/hour on free plan)
  if (m.includes('email rate limit exceeded') || m.includes('rate limit') || m.includes('too many')) {
    return 'Too many signup attempts. Please wait an hour before trying again, or use a different email.';
  }
  return message;
}

export default function SignUpScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSignUp() {
    setError(null);
    setLoading(true);
    try {
      const data = await signUp(email.trim(), password);
      // If auto-confirm is on, Supabase returns a session immediately.
      // The auth listener in _layout.tsx will route to tabs automatically.
      // Only show "check your email" when no session (confirmation required).
      if (!data.session) setSent(true);
    } catch (err: any) {
      setError(parseSignUpError(err.message ?? 'Something went wrong.'));
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <View style={styles.successContainer}>
        <Ionicons name="mail-outline" size={48} color={C.accent} />
        <Text style={styles.successTitle}>Check your email</Text>
        <Text style={styles.successBody}>
          We sent a confirmation link to{'\n'}
          <Text style={{ color: C.text }}>{email}</Text>
        </Text>
        <Text style={styles.successHint}>
          Click the link in the email to activate your account.{'\n'}
          Check your spam folder if you don't see it.
        </Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace('/(auth)/sign-in')}
        >
          <Text style={styles.backButtonText}>Back to Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.appName}>Garagetwits</Text>
        <Text style={styles.appTagline}>Community for car enthusiasts</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.formTitle}>Create Account</Text>

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
          placeholder="Password (min 6 characters)"
          placeholderTextColor={C.textMuted}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonLoading]}
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.buttonText}>Create Account</Text>
          }
        </TouchableOpacity>
      </View>

      <Link href="/(auth)/sign-in" style={styles.switchLink}>
        Already have an account? <Text style={styles.switchLinkAccent}>Sign in</Text>
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
  buttonLoading: { opacity: 0.7 },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
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
  successContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
    lineHeight: 22,
  },
  successHint: {
    fontSize: 13,
    color: C.textMuted,
    textAlign: 'center',
    lineHeight: 19,
    marginTop: 4,
  },
  backButton: {
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.surface,
  },
  backButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: C.text,
    textAlign: 'center',
  },
});
