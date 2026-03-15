import { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import { supabase } from '../../src/lib/supabase';
import { signOut } from '../../src/features/auth/api';
import { getFollowedModels, getFollowedMakes, unfollowMake } from '../../src/features/vehicles/api';
import type { VehicleSearchResult } from '../../src/features/vehicles/types';

const C = {
  bg: '#FFFFFF',
  surface: '#F8F8F8',
  border: '#EBEBEB',
  accent: '#E05A00',
  text: '#111111',
  textMuted: '#777777',
  textFaint: '#AAAAAA',
};

export default function ProfileScreen() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [followedMakes, setFollowedMakes] = useState<VehicleSearchResult[]>([]);
  const [followedModels, setFollowedModels] = useState<VehicleSearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);
  const initialLoadDone = useRef(false);

  const loadFollows = useCallback(async () => {
    const [makes, models] = await Promise.all([
      getFollowedMakes().catch(() => [] as VehicleSearchResult[]),
      getFollowedModels().catch(() => [] as VehicleSearchResult[]),
    ]);
    setFollowedMakes(makes);
    setFollowedModels(models);
  }, []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
    loadFollows().finally(() => {
      setLoading(false);
      initialLoadDone.current = true;
    });
  }, []);

  // Silent refresh when tab gains focus (e.g. after follow/unfollow elsewhere)
  useFocusEffect(
    useCallback(() => {
      if (!initialLoadDone.current) return;
      loadFollows();
    }, [loadFollows])
  );

  async function handleSignOut() {
    setSigningOut(true);
    try {
      await signOut();
    } finally {
      setSigningOut(false);
    }
  }

  async function handleUnfollowMake(makeId: string) {
    await unfollowMake(makeId);
    setFollowedMakes(prev => prev.filter(m => m.id !== makeId));
  }

  const isEmpty = followedMakes.length === 0 && followedModels.length === 0;

  return (
    <View style={styles.container}>
      {/* User header */}
      <View style={styles.userSection}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={22} color={C.textMuted} />
        </View>
        <Text style={styles.email} numberOfLines={1}>{email ?? '—'}</Text>
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={handleSignOut}
          disabled={signingOut}
        >
          {signingOut
            ? <ActivityIndicator color="#fff" size="small" />
            : <Text style={styles.signOutText}>Sign Out</Text>
          }
        </TouchableOpacity>
      </View>

      {/* Following section header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Following</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/search')}>
          <Text style={styles.addLink}>+ Add</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
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
          data={[...followedMakes, ...followedModels]}
          keyExtractor={item => item.is_make_result ? `make_${item.id}` : item.id}
          renderItem={({ item }) => {
            if (item.is_make_result) {
              // Make row: tapping opens search scoped to this make; unfollow button on right
              return (
                <View style={styles.makeRow}>
                  <TouchableOpacity
                    style={styles.makeRowMain}
                    onPress={() => router.push('/(tabs)/search')}
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
            // Model row: tapping opens vehicle page
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
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: C.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: C.border,
  },
  email: {
    flex: 1,
    fontSize: 14,
    color: C.textMuted,
  },
  signOutButton: {
    backgroundColor: C.surface,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    minWidth: 82,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: C.border,
  },
  signOutText: { color: C.text, fontSize: 13, fontWeight: '600' },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    color: C.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },
  addLink: {
    fontSize: 14,
    color: C.accent,
    fontWeight: '600',
  },
  loader: { marginTop: 32 },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    paddingHorizontal: 32,
  },
  emptyText: { color: C.textMuted, fontSize: 14, textAlign: 'center' },
  discoverButton: {
    backgroundColor: C.accent,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  discoverButtonText: { color: '#fff', fontSize: 14, fontWeight: '700' },

  // Make row
  makeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    backgroundColor: '#FFFAF7',
  },
  makeRowMain: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  makeRowName: {
    fontSize: 15,
    fontWeight: '700',
    color: C.accent,
  },
  makeRowSub: {
    fontSize: 11,
    color: C.textMuted,
    marginTop: 1,
  },
  unfollowBtn: {
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  unfollowBtnText: {
    fontSize: 12,
    color: C.textMuted,
    fontWeight: '600',
  },

  // Model row
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
  modelRowNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modelRowName: { fontSize: 15, color: C.text, fontWeight: '500' },
  modelRowDiscontinued: {
    fontSize: 11,
    color: C.textFaint,
    fontStyle: 'italic',
  },
});
