import { View, Text, StyleSheet, TouchableOpacity, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { UserAvatar } from './UserAvatar';
import type { Post, PostVehicleAttachment } from '../features/posts/types';
import { CATEGORY_LABELS } from '../features/posts/types';
import { relativeTime, CATEGORY_STYLE } from '../utils/postUtils';

const C = {
  bg: '#FFFFFF',
  surface: '#F8F8F8',
  border: '#EBEBEB',
  accent: '#E05A00',
  text: '#111111',
  textMuted: '#777777',
  textFaint: '#AAAAAA',
};

interface Props {
  post: Post;
  showModel?: boolean;
  currentUserId?: string;
  onDelete?: (postId: string) => void;
}

function vehicleLabel(v: PostVehicleAttachment): string {
  const parts: string[] = [];
  if (v.make_name) parts.push(v.make_name);
  if (v.model_name) parts.push(v.model_name);
  else if (parts.length === 0) return '';
  if (v.trim_name) parts.push(v.trim_name);
  if (v.year) parts.push(String(v.year));
  return parts.join(' · ');
}

export function PostCard({ post, showModel = true, currentUserId, onDelete }: Props) {
  const router = useRouter();

  // Build vehicle list — prefer new vehicle_attachments, fall back to old FK joins
  const vehicles: { label: string; slug: string | null }[] = (() => {
    if (post.vehicle_attachments?.length > 0) {
      return post.vehicle_attachments
        .map(v => ({ label: vehicleLabel(v), slug: v.model_slug ?? null }))
        .filter(v => v.label);
    }
    // Legacy single-vehicle fallback
    if (post.vehicle_model) {
      const make = post.vehicle_model.vehicle_makes?.name ?? post.vehicle_make?.name ?? '';
      const model = post.vehicle_model.name;
      const parts = [`${make} ${model}`.trim()];
      if (post.vehicle_trim?.name) parts.push(post.vehicle_trim.name);
      if (post.vehicle_year) parts.push(String(post.vehicle_year));
      return [{ label: parts.join(' · '), slug: post.vehicle_model.slug }];
    }
    if (post.vehicle_make) {
      return [{ label: post.vehicle_make.name, slug: null }];
    }
    return [];
  })();

  // Build categories list — prefer new array, fall back to old single
  const cats = post.categories?.length > 0
    ? post.categories
    : post.category ? [post.category] : [];

  const isOwner = !!currentUserId && currentUserId === post.author_id;

  const handleDelete = () => {
    Alert.alert('Delete post', 'Are you sure you want to delete this post?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => onDelete?.(post.id) },
    ]);
  };

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => router.push(`/post/${post.id}`)}
    >
      {/* Top row: vehicle tags + time + delete */}
      <View style={styles.topRow}>
        <View style={styles.vehicleTags}>
          {showModel && vehicles.map((v, i) =>
            v.slug ? (
              <TouchableOpacity
                key={i}
                onPress={e => { e.stopPropagation?.(); router.push(`/vehicle/${v.slug}`); }}
                style={styles.vehicleTag}
                hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
              >
                <Text style={styles.vehicleTagText}>{v.label}</Text>
              </TouchableOpacity>
            ) : (
              <View key={i} style={styles.vehicleTag}>
                <Text style={styles.vehicleTagText}>{v.label}</Text>
              </View>
            )
          )}
        </View>
        <View style={styles.topRight}>
          <Text style={styles.time}>{relativeTime(post.created_at)}</Text>
          {isOwner && (
            <TouchableOpacity
              onPress={e => { e.stopPropagation?.(); handleDelete(); }}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              style={styles.deleteBtn}
            >
              <Ionicons name="trash-outline" size={15} color="#AAAAAA" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Author */}
      {post.author?.username && (
        <View style={styles.authorRow}>
          <UserAvatar avatarUrl={post.author.avatar_url} size={22} />
          <Text style={styles.author}>@{post.author.username}</Text>
        </View>
      )}

      {/* Body */}
      <Text style={styles.body}>{post.body}</Text>

      {/* Category badges */}
      {cats.length > 0 && (
        <View style={styles.categoryRow}>
          {cats.map(cat => {
            const catStyle = CATEGORY_STYLE[cat];
            if (!catStyle) return null;
            return (
              <View key={cat} style={[styles.categoryBadge, { backgroundColor: catStyle.bg }]}>
                <Text style={[styles.categoryText, { color: catStyle.text }]}>
                  {CATEGORY_LABELS[cat]}
                </Text>
              </View>
            );
          })}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    backgroundColor: C.bg,
  },
  cardPressed: { opacity: 0.75 },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 8,
  },
  vehicleTags: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  vehicleTag: {
    backgroundColor: '#FFF4EE',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#FFD4B8',
  },
  vehicleTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: C.accent,
    letterSpacing: 0.2,
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
  },
  time: { fontSize: 12, color: C.textFaint },
  deleteBtn: { padding: 2 },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  author: {
    fontSize: 12,
    color: C.textMuted,
    fontWeight: '500',
  },
  body: {
    fontSize: 15,
    color: C.text,
    lineHeight: 22,
    marginBottom: 10,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
