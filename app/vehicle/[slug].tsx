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
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  getVehicleModelBySlug,
  isFollowingModel,
  followModel,
  unfollowModel,
} from '../../src/features/vehicles/api';
import { useModelFeed } from '../../src/features/posts/hooks';
import { PostCard } from '../../src/components/PostCard';
import type { VehicleModel } from '../../src/features/vehicles/types';

export default function VehicleScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const [model, setModel] = useState<VehicleModel | null>(null);
  const [modelLoading, setModelLoading] = useState(true);
  const [following, setFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const { posts, loading: postsLoading, error, refresh } = useModelFeed(model?.id ?? null);

  useEffect(() => {
    if (!slug) return;
    setModelLoading(true);
    getVehicleModelBySlug(slug).then(m => {
      setModel(m);
      if (m) isFollowingModel(m.id).then(setFollowing);
    }).finally(() => setModelLoading(false));
  }, [slug]);

  const handleFollow = useCallback(async () => {
    if (!model) return;
    setFollowLoading(true);
    try {
      if (following) {
        await unfollowModel(model.id);
        setFollowing(false);
      } else {
        await followModel(model.id);
        setFollowing(true);
      }
    } catch {
      // silently ignore — user can retry
    } finally {
      setFollowLoading(false);
    }
  }, [model, following]);

  if (modelLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!model) {
    return (
      <View style={styles.center}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.notFound}>Vehicle not found.</Text>
      </View>
    );
  }

  const makeName = (model.make as any)?.name ?? '';
  const fullName = `${makeName} ${model.name}`.trim();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.modelName} numberOfLines={1}>{fullName}</Text>
        <TouchableOpacity
          style={[styles.followButton, following && styles.followButtonActive]}
          onPress={handleFollow}
          disabled={followLoading}
        >
          <Text style={[styles.followButtonText, following && styles.followButtonTextActive]}>
            {followLoading ? '…' : following ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <PostCard post={item} showModel={false} />}
        refreshControl={<RefreshControl refreshing={postsLoading} onRefresh={refresh} />}
        ListHeaderComponent={
          <TouchableOpacity
            style={styles.postPrompt}
            onPress={() => router.push('/(tabs)/create')}
          >
            <Text style={styles.postPromptText}>Share something about the {model.name}…</Text>
          </TouchableOpacity>
        }
        ListEmptyComponent={
          postsLoading ? (
            <View style={styles.center}>
              <ActivityIndicator />
            </View>
          ) : error ? (
            <View style={styles.center}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : (
            <View style={styles.center}>
              <Text style={styles.emptyText}>No posts yet for this model.</Text>
              <Text style={styles.emptySubtext}>Be the first to share your experience.</Text>
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, marginTop: 40 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e5e5',
    gap: 8,
  },
  backButton: { paddingRight: 4 },
  backText: { fontSize: 26, color: '#000', lineHeight: 28 },
  modelName: { flex: 1, fontSize: 17, fontWeight: '700', color: '#111' },
  followButton: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  followButtonActive: { backgroundColor: '#000' },
  followButtonText: { fontSize: 13, fontWeight: '600', color: '#000' },
  followButtonTextActive: { color: '#fff' },
  postPrompt: {
    margin: 12,
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  postPromptText: { color: '#888', fontSize: 14 },
  backLink: { color: '#0066cc', fontSize: 15, marginBottom: 12 },
  notFound: { color: '#888', fontSize: 14 },
  errorText: { color: '#d00', fontSize: 14 },
  emptyText: { color: '#555', fontSize: 15, fontWeight: '500', marginBottom: 6 },
  emptySubtext: { color: '#aaa', fontSize: 13 },
});
