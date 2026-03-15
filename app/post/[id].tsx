import { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { getPostById, getPostComments, createComment } from '../../src/features/posts/api';
import type { Post, PostComment } from '../../src/features/posts/types';
import { CATEGORY_LABELS } from '../../src/features/posts/types';
import type { PostCategory } from '../../src/features/posts/types';

const C = {
  bg: '#0F0F0F',
  surface: '#1A1A1A',
  border: '#262626',
  accent: '#E05A00',
  text: '#F0F0F0',
  textMuted: '#888',
  textFaint: '#555',
  inputBg: '#141414',
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

export default function PostScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (!id) return;
    Promise.all([getPostById(id), getPostComments(id)])
      .then(([p, c]) => { setPost(p); setComments(c); })
      .finally(() => setLoading(false));
  }, [id]);

  const handleReply = useCallback(async () => {
    if (!replyText.trim() || !id) return;
    setSubmitting(true);
    try {
      const comment = await createComment(id, replyText.trim());
      setComments(prev => [...prev, comment]);
      setReplyText('');
      inputRef.current?.blur();
    } catch {
      // silently ignore — user can retry
    } finally {
      setSubmitting(false);
    }
  }, [id, replyText]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={C.accent} size="large" />
      </View>
    );
  }

  if (!post) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Post not found.</Text>
      </View>
    );
  }

  const makeName = post.vehicle_model?.vehicle_makes?.name;
  const modelName = post.vehicle_model?.name;
  const modelDisplay = makeName && modelName ? `${makeName} ${modelName}` : null;
  const catStyle = post.category ? CATEGORY_STYLE[post.category] : null;

  const PostHeader = (
    <View style={styles.postBlock}>
      {/* Vehicle tag */}
      {modelDisplay && (
        <TouchableOpacity
          style={styles.vehicleTag}
          onPress={() => router.push(`/vehicle/${post.vehicle_model!.slug}`)}
        >
          <Text style={styles.vehicleTagText}>{modelDisplay}</Text>
        </TouchableOpacity>
      )}

      {/* Body */}
      <Text style={styles.postBody}>{post.body}</Text>

      {/* Footer row */}
      <View style={styles.postFooter}>
        {post.category && catStyle && (
          <View style={[styles.categoryBadge, { backgroundColor: catStyle.bg }]}>
            <Text style={[styles.categoryText, { color: catStyle.text }]}>
              {CATEGORY_LABELS[post.category]}
            </Text>
          </View>
        )}
        <Text style={styles.postTime}>{relativeTime(post.created_at)}</Text>
      </View>

      {/* Comment count divider */}
      <View style={styles.commentHeader}>
        <Text style={styles.commentHeaderText}>
          {comments.length === 0 ? 'No replies yet' : `${comments.length} ${comments.length === 1 ? 'Reply' : 'Replies'}`}
        </Text>
      </View>
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Post',
          headerStyle: { backgroundColor: C.bg },
          headerTintColor: C.text,
          headerShadowVisible: false,
          headerBackTitle: 'Back',
        }}
      />
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          data={comments}
          keyExtractor={item => item.id}
          ListHeaderComponent={PostHeader}
          renderItem={({ item }) => (
            <View style={styles.commentRow}>
              <Text style={styles.commentBody}>{item.body}</Text>
              <Text style={styles.commentTime}>{relativeTime(item.created_at)}</Text>
            </View>
          )}
          ListEmptyComponent={null}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
        />

        {/* Reply input */}
        <View style={styles.replyBar}>
          <TextInput
            ref={inputRef}
            style={styles.replyInput}
            placeholder="Add a reply…"
            placeholderTextColor={C.textFaint}
            value={replyText}
            onChangeText={setReplyText}
            maxLength={500}
            multiline
          />
          <TouchableOpacity
            style={[styles.replyBtn, (!replyText.trim() || submitting) && styles.replyBtnDisabled]}
            onPress={handleReply}
            disabled={!replyText.trim() || submitting}
          >
            {submitting
              ? <ActivityIndicator size="small" color="#fff" />
              : <Text style={styles.replyBtnText}>Reply</Text>
            }
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: C.bg },
  notFound: { color: C.textMuted, fontSize: 15 },
  listContent: { paddingBottom: 16 },

  // Post block
  postBlock: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  vehicleTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#1E1E1E',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 10,
  },
  vehicleTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: C.accent,
  },
  postBody: {
    fontSize: 17,
    color: C.text,
    lineHeight: 26,
    marginBottom: 14,
  },
  postFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  categoryBadge: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  postTime: {
    fontSize: 12,
    color: C.textFaint,
    marginLeft: 'auto',
  },
  commentHeader: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: C.border,
  },
  commentHeaderText: {
    fontSize: 11,
    fontWeight: '700',
    color: C.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },

  // Comment rows
  commentRow: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    gap: 6,
  },
  commentBody: {
    fontSize: 15,
    color: C.text,
    lineHeight: 21,
  },
  commentTime: {
    fontSize: 11,
    color: C.textFaint,
  },

  // Reply bar
  replyBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: C.border,
    backgroundColor: C.bg,
    gap: 10,
  },
  replyInput: {
    flex: 1,
    backgroundColor: C.inputBg,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: C.text,
    maxHeight: 100,
  },
  replyBtn: {
    backgroundColor: C.accent,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  replyBtnDisabled: {
    backgroundColor: '#2A2A2A',
  },
  replyBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});
