import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import type { Post, PostCategory } from '../features/posts/types';
import { CATEGORY_LABELS } from '../features/posts/types';

const C = {
  bg: '#0F0F0F',
  surface: '#1A1A1A',
  border: '#262626',
  accent: '#E05A00',
  text: '#F0F0F0',
  textMuted: '#888',
  textFaint: '#555',
};

const CATEGORY_STYLE: Record<PostCategory, { bg: string; text: string }> = {
  price_paid:    { bg: '#0A2E1A', text: '#34D399' },
  lease_finance: { bg: '#0A1A2E', text: '#60A5FA' },
  issue:         { bg: '#2E0A0A', text: '#F87171' },
  maintenance:   { bg: '#2E1A0A', text: '#FBBF24' },
  review:        { bg: '#1A0A2E', text: '#A78BFA' },
  question:      { bg: '#1A1A1A', text: '#9CA3AF' },
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
}

export function PostCard({ post, showModel = true }: Props) {
  const router = useRouter();
  const makeName = post.vehicle_model?.vehicle_makes?.name;
  const modelName = post.vehicle_model?.name;
  const modelDisplay = makeName && modelName ? `${makeName} ${modelName}` : null;
  const catStyle = post.category ? CATEGORY_STYLE[post.category] : null;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/post/${post.id}`)}
      activeOpacity={0.75}
    >
      {/* Vehicle tag + time row */}
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
        <Text style={styles.time}>{relativeTime(post.created_at)}</Text>
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
    </TouchableOpacity>
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
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  vehicleTag: {
    backgroundColor: '#1E1E1E',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#333',
  },
  vehicleTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: C.accent,
    letterSpacing: 0.2,
  },
  time: {
    fontSize: 12,
    color: C.textFaint,
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
