import { useState, useCallback } from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useGlobalFeed, useFollowingFeed } from '../../src/features/posts/hooks';
import { PostCard } from '../../src/components/PostCard';

const C = {
  bg: '#0F0F0F',
  surface: '#1A1A1A',
  border: '#262626',
  accent: '#E05A00',
  text: '#F0F0F0',
  textMuted: '#888',
};

type FeedMode = 'following' | 'all';

export default function HomeScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<FeedMode>('following');
  const globalFeed = useGlobalFeed();
  const followingFeed = useFollowingFeed();

  const active = mode === 'all' ? globalFeed : followingFeed;

  const handleRefresh = useCallback(() => {
    globalFeed.refresh();
    followingFeed.refresh();
  }, [globalFeed, followingFeed]);

  const isLoading = active.loading && active.posts.length === 0;

  const followingEmpty = mode === 'following' && !followingFeed.loading && followingFeed.posts.length === 0;

  return (
    <View style={styles.container}>
      {/* Feed mode toggle */}
      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[styles.toggleBtn, mode === 'following' && styles.toggleBtnActive]}
          onPress={() => setMode('following')}
        >
          <Text style={[styles.toggleText, mode === 'following' && styles.toggleTextActive]}>
            Following
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleBtn, mode === 'all' && styles.toggleBtnActive]}
          onPress={() => setMode('all')}
        >
          <Text style={[styles.toggleText, mode === 'all' && styles.toggleTextActive]}>
            All
          </Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator color={C.accent} size="large" />
        </View>
      ) : active.error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{active.error}</Text>
        </View>
      ) : followingEmpty ? (
        <View style={styles.center}>
          <Text style={styles.emptyTitle}>Your feed is empty</Text>
          <Text style={styles.emptyBody}>
            Follow vehicle models to see posts here.
          </Text>
          <TouchableOpacity
            style={styles.discoverButton}
            onPress={() => router.push('/(tabs)/search')}
          >
            <Text style={styles.discoverButtonText}>Discover Models</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={active.posts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <PostCard post={item} showModel />}
          refreshControl={
            <RefreshControl
              refreshing={active.loading}
              onRefresh={handleRefresh}
              tintColor={C.accent}
            />
          }
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.emptyBody}>No posts yet. Be the first to post.</Text>
            </View>
          }
          contentContainerStyle={active.posts.length === 0 ? styles.emptyList : undefined}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
  },
  toggleRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    backgroundColor: C.bg,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  toggleBtnActive: {
    borderBottomColor: C.accent,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: C.textMuted,
  },
  toggleTextActive: {
    color: C.text,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    gap: 12,
  },
  emptyList: {
    flexGrow: 1,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: C.text,
    textAlign: 'center',
  },
  emptyBody: {
    fontSize: 14,
    color: C.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
  errorText: {
    color: '#F87171',
    fontSize: 14,
    textAlign: 'center',
  },
  discoverButton: {
    marginTop: 8,
    backgroundColor: C.accent,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  discoverButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
