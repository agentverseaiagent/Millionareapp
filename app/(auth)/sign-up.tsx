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
import { signUp, updateUsername } from '../../src/features/auth/api';

function validateUsername(u: string): string | null {
  const t = u.trim();
  if (!t) return 'Display name is required.';
  if (t.length < 2) return 'Display name must be at least 2 characters.';
  if (t.length > 30) return 'Display name must be 30 characters or fewer.';
  if (!/^[a-zA-Z0-9_]+$/.test(t)) return 'Only letters, numbers, and underscores allowed.';
  return null;
}

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
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSignUp() {
    setError(null);
    setConfirmError(null);
    const uErr = validateUsername(username);
    if (uErr) { setUsernameError(uErr); return; }
    if (password !== confirmPassword) {
      setConfirmError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const data = await signUp(email.trim(), password);
      // Persist username immediately — do not wait for a second profile-edit step.
      // If this fails (e.g. duplicate username), the user still lands in the app
      // and the create-post gate will direct them to fix it from the profile screen.
      try { await updateUsername(username.trim()); } catch {}
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
          style={[styles.input, usernameError ? styles.inputError : null]}
          placeholder="Display Name (visible on your posts)"
          placeholderTextColor={C.textMuted}
          autoCapitalize="none"
          autoCorrect={false}
          value={username}
          onChangeText={t => { setUsername(t); setUsernameError(null); }}
        />
        {usernameError && (
          <Text style={styles.fieldError}>{usernameError}</Text>
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
          onChangeText={t => { setPassword(t); setConfirmError(null); }}
        />

        <TextInput
          style={[styles.input, confirmError ? styles.inputError : null]}
          placeholder="Confirm password"
          placeholderTextColor={C.textMuted}
          secureTextEntry
          value={confirmPassword}
          onChangeText={t => { setConfirmPassword(t); setConfirmError(null); }}
        />
        {confirmError && (
          <Text style={styles.fieldError}>{confirmError}</Text>
        )}

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
  inputError: {
    borderColor: C.error,
    marginBottom: 4,
  },
  fieldError: {
    fontSize: 12,
    color: C.error,
    marginBottom: 12,
    marginTop: 0,
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
