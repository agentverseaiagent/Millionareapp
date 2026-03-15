import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as Linking from 'expo-linking';
import { useSession } from '../src/features/auth/hooks';
import { supabase } from '../src/lib/supabase';

export default function RootLayout() {
  const { session, loading } = useSession();
  const segments = useSegments();
  const router = useRouter();

  // Handle email confirmation deep links
  useEffect(() => {
    const handleUrl = async (url: string) => {
      if (url.includes('code=')) {
        await supabase.auth.exchangeCodeForSession(url);
      } else if (url.includes('access_token')) {
        const hash = url.split('#')[1] ?? '';
        const params = new URLSearchParams(hash);
        const access_token = params.get('access_token');
        const refresh_token = params.get('refresh_token');
        if (access_token && refresh_token) {
          await supabase.auth.setSession({ access_token, refresh_token });
        }
      }
    };

    Linking.getInitialURL().then(url => {
      if (url) handleUrl(url);
    });

    const sub = Linking.addEventListener('url', ({ url }) => handleUrl(url));
    return () => sub.remove();
  }, []);

  // Protected routing — only runs after auth state is known
  useEffect(() => {
    if (loading) return;
    const inAuthGroup = segments[0] === '(auth)';
    if (!session && !inAuthGroup) {
      router.replace('/(auth)/sign-in');
    } else if (session && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [session, loading, segments]);

  // Show blank loading screen while auth state resolves — prevents flicker
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="vehicle/[slug]" options={{ headerShown: false }} />
      <Stack.Screen name="post/[id]" options={{ title: 'Post' }} />
    </Stack>
  );
}
