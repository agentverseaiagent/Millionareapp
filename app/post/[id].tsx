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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { getPostById, getPostComments, createComment } from '../../src/features/posts/api';
import type { Post, PostComment } from '../../src/features/posts/types';
import { CATEGORY_LABELS } from '../../src/features/posts/types';
import { relativeTime, CATEGORY_STYLE } from '../../src/utils/postUtils';

const C = {
  bg: '#FFFFFF',
  surface: '#F8F8F8',
  border: '#EBEBEB',
  accent: '#E05A00',
  text: '#111111',
  textMuted: '#777777',
  textFaint: '#AAAAAA',
  inputBg: '#F5F5F5',
};

export default function PostScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [replyError, setReplyError] = useState<string | null>(null);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (!id) return;
    Promise.all([getPostById(id), getPostComments(id)])
      .then(([p, c]) => { setPost(p); setComments(c); })
      .finally(() => setLoading(false));
  }, [id]);

  const handleReply = useCallback(async () => {
    if (!replyText.trim() || !id) return;
    setReplyError(null);
    setSubmitting(true);
    try {
      const comment = await createComment(id, replyText.trim());
      setComments(prev => [...prev, comment]);
      setReplyText('');
      inputRef.current?.blur();
    } catch (err: any) {
      setReplyError(err?.message ?? 'Failed to post reply. Tap to retry.');
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
        <View style={[styles.replyBar, { paddingBottom: Math.max(insets.bottom, 10) }]}>
          {replyError && (
            <Text style={styles.replyError} onPress={handleReply}>
              {replyError}
            </Text>
          )}
          <View style={styles.replyRow}>
            <TextInput
              ref={inputRef}
              style={styles.replyInput}
              placeholder="Add a reply…"
              placeholderTextColor={C.textFaint}
              value={replyText}
              onChangeText={text => { setReplyText(text); setReplyError(null); }}
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
    backgroundColor: '#FFF4EE',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#FFD4B8',
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
    borderTopWidth: 1,
    borderTopColor: C.border,
    backgroundColor: C.bg,
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  replyRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  replyError: {
    fontSize: 12,
    color: '#DC2626',
    marginBottom: 6,
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
    backgroundColor: '#CCCCCC',
  },
  replyBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});
