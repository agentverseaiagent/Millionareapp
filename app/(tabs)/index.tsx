import React, { useState, useCallback } from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useGlobalFeed, useFollowingFeed } from '../../src/features/posts/hooks';
import { deletePost } from '../../src/features/posts/api';
import { PostCard } from '../../src/components/PostCard';
import { useSession } from '../../src/features/auth/hooks';

const C = {
  bg: '#FFFFFF',
  surface: '#F8F8F8',
  border: '#EBEBEB',
  accent: '#E05A00',
  text: '#111111',
  textMuted: '#777777',
};

type FeedMode = 'following' | 'all';

export default function HomeScreen() {
  const router = useRouter();
  const { session } = useSession();
  const currentUserId = session?.user?.id;
  const [mode, setMode] = useState<FeedMode>('following');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const globalFeed = useGlobalFeed();
  const followingFeed = useFollowingFeed();

  const active = mode === 'all' ? globalFeed : followingFeed;

  // Silently refresh following feed whenever this tab gains focus (e.g. after follow/unfollow)
  useFocusEffect(
    useCallback(() => {
      followingFeed.refresh();
    }, [followingFeed.refresh])
  );

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await Promise.all([globalFeed.refresh(), followingFeed.refresh()]);
    setIsRefreshing(false);
  }, [globalFeed, followingFeed]);

  const handleDelete = useCallback(async (postId: string) => {
    await deletePost(postId);
    globalFeed.refresh();
    followingFeed.refresh();
  }, [globalFeed, followingFeed]);

  const isLoading = active.loading && active.posts.length === 0;

  const followingEmpty = mode === 'following' && !followingFeed.loading && followingFeed.posts.length === 0;

  const toggle = (
    <>
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
      <View style={styles.refreshHintRow}>
        <Text style={styles.refreshHintText}>↓ Swipe down to refresh</Text>
      </View>
    </>
  );

  let emptyComponent: React.ReactElement | null = null;
  if (isLoading) {
    emptyComponent = (
      <View style={styles.center}>
        <ActivityIndicator color={C.accent} size="large" />
      </View>
    );
  } else if (active.error) {
    emptyComponent = (
      <View style={styles.center}>
        <Text style={styles.errorText}>{active.error}</Text>
      </View>
    );
  } else if (followingEmpty) {
    emptyComponent = (
      <View style={styles.center}>
        <Text style={styles.emptyTitle}>Your feed is empty</Text>
        <Text style={styles.emptyBody}>Follow vehicle models to see posts here.</Text>
        <TouchableOpacity
          style={styles.discoverButton}
          onPress={() => router.push('/(tabs)/search')}
        >
          <Text style={styles.discoverButtonText}>Discover Models</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    emptyComponent = (
      <View style={styles.center}>
        <Text style={styles.emptyBody}>No posts yet. Be the first to post.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={active.posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            showModel
            currentUserId={currentUserId}
            onDelete={handleDelete}
          />
        )}
        ListHeaderComponent={toggle}
        ListEmptyComponent={emptyComponent}
        contentContainerStyle={active.posts.length === 0 ? styles.emptyList : styles.listContent}
        alwaysBounceVertical
        overScrollMode="always"
        onEndReached={() => active.loadMore?.()}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          active.loadingMore ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator color={C.accent} size="small" />
            </View>
          ) : null
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={C.accent}
          />
        }
      />
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
  listContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  refreshHintRow: {
    alignItems: 'center',
    paddingVertical: 6,
    backgroundColor: C.surface,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  refreshHintText: {
    fontSize: 12,
    color: C.textMuted,
    letterSpacing: 0.2,
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
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});
