import { View, Text, StyleSheet, TouchableOpacity, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import type { Post } from '../features/posts/types';
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

export function PostCard({ post, showModel = true, currentUserId, onDelete }: Props) {
  const router = useRouter();

  // Build vehicle label from make/model/trim/year — handle both old and new post shapes
  const vehicleLabel = (() => {
    if (post.vehicle_model) {
      const make = post.vehicle_model.vehicle_makes?.name ?? post.vehicle_make?.name ?? '';
      const model = post.vehicle_model.name;
      const base = `${make} ${model}`.trim();
      const parts = [base];
      if (post.vehicle_trim?.name) parts.push(post.vehicle_trim.name);
      if (post.vehicle_year) parts.push(String(post.vehicle_year));
      return parts.join(' · ');
    }
    if (post.vehicle_make) return post.vehicle_make.name;
    return null;
  })();
  const modelSlug = post.vehicle_model?.slug ?? null;

  const catStyle = post.category ? CATEGORY_STYLE[post.category] : null;
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
      {/* Vehicle tag + time + delete row */}
      <View style={styles.topRow}>
        {showModel && vehicleLabel ? (
          modelSlug ? (
            <TouchableOpacity
              onPress={e => { e.stopPropagation?.(); router.push(`/vehicle/${modelSlug}`); }}
              style={styles.vehicleTag}
              hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
            >
              <Text style={styles.vehicleTagText}>{vehicleLabel}</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.vehicleTag}>
              <Text style={styles.vehicleTagText}>{vehicleLabel}</Text>
            </View>
          )
        ) : (
          <View />
        )}
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

      {/* Body */}
      <Text style={styles.body}>{post.body}</Text>

      {/* Category badge */}
      {post.category && catStyle && (
        <View style={[styles.categoryBadge, { backgroundColor: catStyle.bg }]}>
          <Text style={[styles.categoryText, { color: catStyle.text }]}>
            {CATEGORY_LABELS[post.category]}
          </Text>
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
  cardPressed: {
    opacity: 0.75,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
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
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
  },
  time: {
    fontSize: 12,
    color: C.textFaint,
  },
  deleteBtn: {
    padding: 2,
  },
  body: {
    fontSize: 15,
    color: C.text,
    lineHeight: 22,
    marginBottom: 10,
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
