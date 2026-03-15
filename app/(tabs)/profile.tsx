import { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter, useFocusEffect } from 'expo-router';
import { supabase } from '../../src/lib/supabase';
import { signOut, getUserProfile, updateUsername, updateAvatar } from '../../src/features/auth/api';
import { UserAvatar } from '../../src/components/UserAvatar';
import { getFollowedModels, getFollowedMakes, unfollowMake } from '../../src/features/vehicles/api';
import { getPostsByAuthor, deletePost } from '../../src/features/posts/api';
import { PostCard } from '../../src/components/PostCard';
import type { VehicleSearchResult } from '../../src/features/vehicles/types';
import type { Post } from '../../src/features/posts/types';

const C = {
  bg: '#FFFFFF',
  surface: '#F8F8F8',
  border: '#EBEBEB',
  accent: '#E05A00',
  text: '#111111',
  textMuted: '#777777',
  textFaint: '#AAAAAA',
};

type Tab = 'posts' | 'following';

export default function ProfileScreen() {
  const router = useRouter();

  // Identity
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [editingUsername, setEditingUsername] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [savingUsername, setSavingUsername] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  // Tab
  const [tab, setTab] = useState<Tab>('posts');

  // My Posts
  const [myPosts, setMyPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);

  // Following
  const [followedMakes, setFollowedMakes] = useState<VehicleSearchResult[]>([]);
  const [followedModels, setFollowedModels] = useState<VehicleSearchResult[]>([]);
  const [followsLoading, setFollowsLoading] = useState(false);

  const initialLoadDone = useRef(false);

  const loadPosts = useCallback(async (uid: string) => {
    setPostsLoading(true);
    try {
      setMyPosts(await getPostsByAuthor(uid));
    } catch (e) {
      console.warn('loadPosts error:', e);
    } finally {
      setPostsLoading(false);
    }
  }, []);

  const loadFollows = useCallback(async () => {
    setFollowsLoading(true);
    try {
      const [makes, models] = await Promise.all([
        getFollowedMakes().catch(() => [] as VehicleSearchResult[]),
        getFollowedModels().catch(() => [] as VehicleSearchResult[]),
      ]);
      setFollowedMakes(makes);
      setFollowedModels(models);
    } finally {
      setFollowsLoading(false);
    }
  }, []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const user = data.user;
      setEmail(user?.email ?? null);
      setUserId(user?.id ?? null);
      if (user?.id) loadPosts(user.id);
    });
    getUserProfile().then(p => { if (p) { setUsername(p.username); setAvatarUrl(p.avatar_url); } });
    loadFollows().finally(() => { initialLoadDone.current = true; });
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (!initialLoadDone.current) return;
      loadFollows();
      if (userId) loadPosts(userId);
    }, [loadFollows, loadPosts, userId])
  );

  async function handleSignOut() {
    setSigningOut(true);
    try { await signOut(); } finally { setSigningOut(false); }
  }

  async function handleSaveUsername() {
    const trimmed = usernameInput.trim();
    setSavingUsername(true);
    try {
      await updateUsername(trimmed);
      setUsername(trimmed || null);
      setEditingUsername(false);
    } catch (e: any) {
      Alert.alert('Error', e.message ?? 'Could not save username');
    } finally {
      setSavingUsername(false);
    }
  }

  async function handleAvatarUpload() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Allow photo library access to upload an avatar.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (result.canceled || !result.assets[0]) return;
    if (!userId) return;
    setUploadingAvatar(true);
    try {
      const url = await updateAvatar(userId, result.assets[0].uri);
      setAvatarUrl(url);
    } catch (e: any) {
      Alert.alert('Upload failed', e.message ?? 'Could not upload photo');
    } finally {
      setUploadingAvatar(false);
    }
  }

  async function handleUnfollowMake(makeId: string) {
    await unfollowMake(makeId);
    setFollowedMakes(prev => prev.filter(m => m.id !== makeId));
  }

  async function handleDeletePost(postId: string) {
    await deletePost(postId);
    setMyPosts(prev => prev.filter(p => p.id !== postId));
  }

  // ── Static header — lives outside FlatList so TextInput never remounts ──

  const header = (
    <>
      {/* Identity row */}
      <View style={styles.userSection}>
        <TouchableOpacity onPress={handleAvatarUpload} disabled={uploadingAvatar} style={styles.avatarWrapper}>
          <UserAvatar avatarUrl={avatarUrl} size={44} />
          {uploadingAvatar
            ? <View style={styles.avatarOverlay}><ActivityIndicator size="small" color="#fff" /></View>
            : <View style={styles.avatarOverlay}><Ionicons name="camera" size={13} color="#fff" /></View>
          }
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          {editingUsername ? (
            <View style={styles.usernameEditRow}>
              <TextInput
                style={styles.usernameInput}
                value={usernameInput}
                onChangeText={setUsernameInput}
                placeholder="Enter username"
                placeholderTextColor={C.textFaint}
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus
                maxLength={30}
                returnKeyType="done"
                onSubmitEditing={handleSaveUsername}
                blurOnSubmit={false}
              />
              <TouchableOpacity
                style={styles.usernameSaveBtn}
                onPress={handleSaveUsername}
                disabled={savingUsername}
              >
                {savingUsername
                  ? <ActivityIndicator size="small" color="#fff" />
                  : <Text style={styles.usernameSaveBtnText}>Save</Text>
                }
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.usernameCancelBtn}
                onPress={() => setEditingUsername(false)}
              >
                <Text style={styles.usernameCancelText}>✕</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.usernameRow}
              onPress={() => { setUsernameInput(username ?? ''); setEditingUsername(true); }}
            >
              <Text style={styles.usernameDisplay}>
                {username ? `@${username}` : 'Set username'}
              </Text>
              <Ionicons name="pencil-outline" size={13} color={C.textFaint} style={{ marginLeft: 5 }} />
            </TouchableOpacity>
          )}
          <Text style={styles.emailDisplay} numberOfLines={1}>{email ?? '—'}</Text>
        </View>
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={handleSignOut}
          disabled={signingOut}
        >
          {signingOut
            ? <ActivityIndicator color={C.text} size="small" />
            : <Text style={styles.signOutText}>Sign Out</Text>
          }
        </TouchableOpacity>
      </View>

      {/* Tab bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabBtn, tab === 'posts' && styles.tabBtnActive]}
          onPress={() => setTab('posts')}
        >
          <Text style={[styles.tabText, tab === 'posts' && styles.tabTextActive]}>My Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, tab === 'following' && styles.tabBtnActive]}
          onPress={() => setTab('following')}
        >
          <Text style={[styles.tabText, tab === 'following' && styles.tabTextActive]}>Following</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  // ── Following tab ─────────────────────────────────────────────────────────

  if (tab === 'following') {
    const isEmpty = followedMakes.length === 0 && followedModels.length === 0;
    const followData: VehicleSearchResult[] = [...followedMakes, ...followedModels];

    return (
      <View style={styles.container}>
        {header}
        {followsLoading && isEmpty ? (
          <ActivityIndicator style={styles.loader} color={C.accent} />
        ) : isEmpty ? (
          <View style={styles.empty}>
            <Ionicons name="car-outline" size={40} color={C.textFaint} />
            <Text style={styles.emptyText}>Not following anything yet.</Text>
            <TouchableOpacity
              style={styles.discoverButton}
              onPress={() => router.push('/(tabs)/search')}
            >
              <Text style={styles.discoverButtonText}>Discover Makes & Models</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={followData}
            keyExtractor={item => item.is_make_result ? `make_${item.id}` : item.id}
            renderItem={({ item }) => {
              if (item.is_make_result) {
                return (
                  <View style={styles.makeRow}>
                    <TouchableOpacity
                      style={styles.makeRowMain}
                      onPress={() => router.push(`/make/${item.slug}`)}
                    >
                      <Ionicons name="car-outline" size={16} color={C.accent} style={{ marginRight: 10 }} />
                      <View>
                        <Text style={styles.makeRowName}>{item.name}</Text>
                        <Text style={styles.makeRowSub}>Make</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.unfollowBtn}
                      onPress={() => handleUnfollowMake(item.id)}
                    >
                      <Text style={styles.unfollowBtnText}>Unfollow</Text>
                    </TouchableOpacity>
                  </View>
                );
              }
              return (
                <TouchableOpacity
                  style={styles.modelRow}
                  onPress={() => router.push(`/vehicle/${item.slug}`)}
                >
                  <View style={styles.modelRowContent}>
                    <Text style={styles.modelRowMake}>{item.make_name}</Text>
                    <View style={styles.modelRowNameRow}>
                      <Text style={styles.modelRowName}>{item.name}</Text>
                      {item.is_discontinued && (
                        <Text style={styles.modelRowDiscontinued}>Discontinued</Text>
                      )}
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={C.textFaint} />
                </TouchableOpacity>
              );
            }}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
        )}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => router.push('/(tabs)/search')}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }

  // ── My Posts tab ──────────────────────────────────────────────────────────

  return (
    <View style={styles.container}>
      {header}
      {postsLoading ? (
        <ActivityIndicator style={styles.loader} color={C.accent} />
      ) : myPosts.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="create-outline" size={40} color={C.textFaint} />
          <Text style={styles.emptyText}>No posts yet.</Text>
          <TouchableOpacity
            style={styles.discoverButton}
            onPress={() => router.push('/(tabs)/create')}
          >
            <Text style={styles.discoverButtonText}>Write your first post</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={myPosts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <PostCard
              post={item}
              showModel
              currentUserId={userId ?? undefined}
              onDelete={handleDeletePost}
            />
          )}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },

  // ── Identity ──────────────────────────────────────────────────
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    gap: 12,
  },
  avatarWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  avatarOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 18,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  usernameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  usernameDisplay: {
    fontSize: 15,
    fontWeight: '700',
    color: C.text,
  },
  emailDisplay: {
    fontSize: 12,
    color: C.textMuted,
  },
  usernameEditRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  usernameInput: {
    flex: 1,
    fontSize: 14,
    color: C.text,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: C.surface,
  },
  usernameSaveBtn: {
    backgroundColor: C.accent,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
  },
  usernameSaveBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  usernameCancelBtn: { padding: 6 },
  usernameCancelText: { color: C.textMuted, fontSize: 16 },
  signOutButton: {
    backgroundColor: C.surface,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: C.border,
  },
  signOutText: { color: C.text, fontSize: 13, fontWeight: '600' },

  // ── Tab bar ───────────────────────────────────────────────────
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabBtnActive: { borderBottomColor: C.accent },
  tabText: { fontSize: 14, fontWeight: '600', color: C.textMuted },
  tabTextActive: { color: C.text },

  // ── Empty / loader ────────────────────────────────────────────
  loader: { marginTop: 40 },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 14,
  },
  emptyText: { color: C.textMuted, fontSize: 14, textAlign: 'center' },
  discoverButton: {
    backgroundColor: C.accent,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  discoverButtonText: { color: '#fff', fontSize: 14, fontWeight: '700' },

  // ── Following rows ────────────────────────────────────────────
  makeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    backgroundColor: '#FFFAF7',
  },
  makeRowMain: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  makeRowName: { fontSize: 15, fontWeight: '700', color: C.accent },
  makeRowSub: { fontSize: 11, color: C.textMuted, marginTop: 1 },
  unfollowBtn: {
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  unfollowBtnText: { fontSize: 12, color: C.textMuted, fontWeight: '600' },
  modelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  modelRowContent: { flex: 1 },
  modelRowMake: {
    fontSize: 10,
    fontWeight: '700',
    color: C.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 2,
  },
  modelRowNameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  modelRowName: { fontSize: 15, color: C.text, fontWeight: '500' },
  modelRowDiscontinued: { fontSize: 11, color: C.textFaint, fontStyle: 'italic' },

  // ── FAB ───────────────────────────────────────────────────────
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: C.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});
