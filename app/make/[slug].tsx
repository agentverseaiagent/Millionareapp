import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import {
  getVehicleMakeBySlug,
  isFollowingMake,
  followMake,
  unfollowMake,
} from '../../src/features/vehicles/api';
import { useMakeFeed } from '../../src/features/posts/hooks';
import { PostCard } from '../../src/components/PostCard';

const C = {
  bg: '#FFFFFF',
  surface: '#F8F8F8',
  border: '#EBEBEB',
  accent: '#E05A00',
  text: '#111111',
  textMuted: '#777777',
  textFaint: '#AAAAAA',
};

export default function MakeScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();

  const [make, setMake] = useState<{ id: string; name: string; slug: string } | null>(null);
  const [makeLoading, setMakeLoading] = useState(true);
  const [following, setFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  const { posts, loading: postsLoading, error, refresh } = useMakeFeed(make?.id ?? null);

  useEffect(() => {
    if (!slug) return;
    setMakeLoading(true);
    getVehicleMakeBySlug(slug).then(m => {
      setMake(m);
      if (m) isFollowingMake(m.id).then(setFollowing);
    }).finally(() => setMakeLoading(false));
  }, [slug]);

  const handleFollow = useCallback(async () => {
    if (!make) return;
    setFollowLoading(true);
    try {
      if (following) {
        await unfollowMake(make.id);
        setFollowing(false);
      } else {
        await followMake(make.id);
        setFollowing(true);
      }
    } catch {
      // silently ignore
    } finally {
      setFollowLoading(false);
    }
  }, [make, following]);

  if (makeLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={C.accent} size="large" />
      </View>
    );
  }

  if (!make) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Make not found.</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={16} color={C.accent} />
          <Text style={styles.backBtnText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: make.name,
          headerStyle: { backgroundColor: C.bg },
          headerTintColor: C.text,
          headerShadowVisible: false,
          headerBackTitle: 'Back',
          headerRight: () => (
            <TouchableOpacity
              onPress={handleFollow}
              disabled={followLoading}
              style={[styles.followBtn, following && styles.followBtnActive]}
            >
              {followLoading ? (
                <ActivityIndicator size="small" color={following ? '#fff' : C.accent} />
              ) : (
                <Text style={[styles.followBtnText, following && styles.followBtnTextActive]}>
                  {following ? 'Following' : 'Follow'}
                </Text>
              )}
            </TouchableOpacity>
          ),
        }}
      />

      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <PostCard post={item} showModel />}
        refreshControl={
          <RefreshControl
            refreshing={postsLoading}
            onRefresh={refresh}
            tintColor={C.accent}
          />
        }
        ListHeaderComponent={
          <TouchableOpacity
            style={styles.postPrompt}
            onPress={() => router.push({
              pathname: '/(tabs)/create',
              params: {
                preMakeId: make.id,
                preMakeName: make.name,
              },
            })}
          >
            <Text style={styles.postPromptText}>
              Share something about {make.name}…
            </Text>
            <Ionicons name="create-outline" size={16} color={C.textFaint} />
          </TouchableOpacity>
        }
        ListEmptyComponent={
          postsLoading ? (
            <View style={styles.center}>
              <ActivityIndicator color={C.accent} />
            </View>
          ) : error ? (
            <View style={styles.center}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : (
            <View style={styles.center}>
              <Ionicons name="chatbubble-outline" size={36} color={C.textFaint} />
              <Text style={styles.emptyText}>No posts about {make.name} yet.</Text>
              <Text style={styles.emptySubtext}>Be the first to share your experience.</Text>
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    marginTop: 40,
    gap: 10,
  },
  followBtn: {
    borderWidth: 1,
    borderColor: C.accent,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    minWidth: 80,
    alignItems: 'center',
  },
  followBtnActive: {
    backgroundColor: C.accent,
    borderColor: C.accent,
  },
  followBtnText: { fontSize: 13, fontWeight: '700', color: C.accent },
  followBtnTextActive: { color: '#fff' },
  postPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 12,
    padding: 14,
    backgroundColor: C.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: C.border,
    gap: 8,
  },
  postPromptText: { flex: 1, color: C.textFaint, fontSize: 14 },
  notFound: { color: C.textMuted, fontSize: 15 },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  backBtnText: { color: C.accent, fontSize: 14 },
  errorText: { color: '#F87171', fontSize: 14 },
  emptyText: { color: C.text, fontSize: 15, fontWeight: '600' },
  emptySubtext: { color: C.textMuted, fontSize: 13 },
});
