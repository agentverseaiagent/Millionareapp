import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { CATEGORY_LABELS } from '../features/posts/types';
import type { Post } from '../features/posts/types';

function relativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
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

  return (
    <View style={styles.card}>
      <View style={styles.meta}>
        <Text style={styles.author}>{post.author_id.slice(0, 8)}</Text>
        {showModel && modelDisplay && (
          <TouchableOpacity onPress={() => router.push(`/vehicle/${post.vehicle_model!.slug}`)}>
            <Text style={styles.model}>{modelDisplay}</Text>
          </TouchableOpacity>
        )}
        {post.category && (
          <Text style={styles.category}>{CATEGORY_LABELS[post.category]}</Text>
        )}
        <Text style={styles.time}>{relativeTime(post.created_at)}</Text>
      </View>
      <Text style={styles.body}>{post.body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e5e5',
    backgroundColor: '#fff',
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 6,
  },
  author: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  model: {
    fontSize: 13,
    color: '#0066cc',
    fontWeight: '500',
  },
  category: {
    fontSize: 11,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  time: {
    fontSize: 12,
    color: '#aaa',
    marginLeft: 'auto',
  },
  body: {
    fontSize: 15,
    color: '#111',
    lineHeight: 22,
  },
});
