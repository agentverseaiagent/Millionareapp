import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useSession } from '../src/features/auth/hooks';

export default function RootLayout() {
  const { session, loading } = useSession();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    const inAuthGroup = segments[0] === '(auth)';
    if (!session && !inAuthGroup) {
      router.replace('/(auth)/sign-in');
    } else if (session && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [session, loading, segments]);

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="vehicle/[slug]" options={{ title: 'Vehicle' }} />
      <Stack.Screen name="post/[id]" options={{ title: 'Post' }} />
    </Stack>
  );
}
