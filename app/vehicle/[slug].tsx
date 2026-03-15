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
  getVehicleModelBySlug,
  isFollowingModel,
  followModel,
  unfollowModel,
} from '../../src/features/vehicles/api';
import { useModelFeed } from '../../src/features/posts/hooks';
import { PostCard } from '../../src/components/PostCard';
import type { VehicleModel } from '../../src/features/vehicles/types';

const C = {
  bg: '#FFFFFF',
  surface: '#F8F8F8',
  border: '#EBEBEB',
  accent: '#E05A00',
  text: '#111111',
  textMuted: '#777777',
  textFaint: '#AAAAAA',
};

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
        <ActivityIndicator color={C.accent} size="large" />
      </View>
    );
  }

  if (!model) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Vehicle not found.</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={16} color={C.accent} />
          <Text style={styles.backBtnText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const makeName = (model.make as any)?.name ?? '';
  const isDiscontinued = model.is_active === false;
  const fullName = isDiscontinued
    ? `${makeName} ${model.name} (Discontinued)`.trim()
    : `${makeName} ${model.name}`.trim();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: fullName,
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
        renderItem={({ item }) => <PostCard post={item} showModel={false} />}
        refreshControl={
          <RefreshControl
            refreshing={postsLoading}
            onRefresh={refresh}
            tintColor={C.accent}
          />
        }
        ListHeaderComponent={
          <>
            {isDiscontinued && (
              <View style={styles.discontinuedBanner}>
                <Ionicons name="information-circle-outline" size={15} color={C.textMuted} />
                <Text style={styles.discontinuedBannerText}>
                  This model has been discontinued. Community posts are still visible.
                </Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.postPrompt}
              onPress={() => router.push({
                pathname: '/(tabs)/create',
                params: {
                  preMakeId: model.make?.id ?? model.make_id,
                  preMakeName: makeName,
                  preModelId: model.id,
                  preModelSlug: model.slug,
                  preModelName: model.name,
                },
              })}
            >
              <Text style={styles.postPromptText}>
                Share something about the {model.name}…
              </Text>
              <Ionicons name="create-outline" size={16} color={C.textFaint} />
            </TouchableOpacity>
          </>
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
              <Text style={styles.emptyText}>No posts for this model yet.</Text>
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
  followBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: C.accent,
  },
  followBtnTextActive: {
    color: '#fff',
  },
  discontinuedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 12,
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: C.border,
  },
  discontinuedBannerText: {
    flex: 1,
    fontSize: 13,
    color: C.textMuted,
    lineHeight: 18,
  },
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
  postPromptText: {
    flex: 1,
    color: C.textFaint,
    fontSize: 14,
  },
  notFound: { color: C.textMuted, fontSize: 15 },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  backBtnText: { color: C.accent, fontSize: 14 },
  errorText: { color: '#F87171', fontSize: 14 },
  emptyText: { color: C.text, fontSize: 15, fontWeight: '600' },
  emptySubtext: { color: C.textMuted, fontSize: 13 },
});
