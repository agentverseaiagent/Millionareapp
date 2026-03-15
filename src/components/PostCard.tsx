import { View, Text, StyleSheet, TouchableOpacity, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import type { Post, PostCategory } from '../features/posts/types';
import { CATEGORY_LABELS } from '../features/posts/types';

const C = {
  bg: '#FFFFFF',
  surface: '#F8F8F8',
  border: '#EBEBEB',
  accent: '#E05A00',
  text: '#111111',
  textMuted: '#777777',
  textFaint: '#AAAAAA',
};

const CATEGORY_STYLE: Record<PostCategory, { bg: string; text: string }> = {
  general:       { bg: '#F3F4F6', text: '#6B7280' },
  price_paid:    { bg: '#ECFDF5', text: '#059669' },
  lease_finance: { bg: '#EFF6FF', text: '#2563EB' },
  issue:         { bg: '#FEF2F2', text: '#DC2626' },
  maintenance:   { bg: '#FFFBEB', text: '#D97706' },
  review:        { bg: '#F5F3FF', text: '#7C3AED' },
  question:      { bg: '#F3F4F6', text: '#6B7280' },
};

function relativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'now';
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  return `${Math.floor(days / 7)}w`;
}

interface Props {
  post: Post;
  showModel?: boolean;
  currentUserId?: string;
  onDelete?: (postId: string) => void;
}

export function PostCard({ post, showModel = true, currentUserId, onDelete }: Props) {
  const router = useRouter();
  const makeName = post.vehicle_model?.vehicle_makes?.name;
  const modelName = post.vehicle_model?.name;
  const modelDisplay = makeName && modelName ? `${makeName} ${modelName}` : null;
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
        {showModel && modelDisplay ? (
          <TouchableOpacity
            onPress={e => { e.stopPropagation?.(); router.push(`/vehicle/${post.vehicle_model!.slug}`); }}
            style={styles.vehicleTag}
            hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          >
            <Text style={styles.vehicleTagText}>{modelDisplay}</Text>
          </TouchableOpacity>
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
