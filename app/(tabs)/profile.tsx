import { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { supabase } from '../../src/lib/supabase';
import { signOut } from '../../src/features/auth/api';
import { getFollowedModels } from '../../src/features/vehicles/api';
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
  const [followedModels, setFollowedModels] = useState<VehicleSearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
    getFollowedModels()
      .then(setFollowedModels)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleSignOut() {
    setSigningOut(true);
    try {
      await signOut();
    } finally {
      setSigningOut(false);
    }
  }

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

      {/* Following section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Following</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/search')}>
          <Text style={styles.addLink}>+ Add</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator style={styles.loader} color={C.accent} />
      ) : followedModels.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="car-outline" size={40} color={C.textFaint} />
          <Text style={styles.emptyText}>Not following any models yet.</Text>
          <TouchableOpacity
            style={styles.discoverButton}
            onPress={() => router.push('/(tabs)/search')}
          >
            <Text style={styles.discoverButtonText}>Discover Models</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={followedModels}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.modelRow}
              onPress={() => router.push(`/vehicle/${item.slug}`)}
            >
              <View style={styles.modelRowContent}>
                <Text style={styles.modelRowMake}>{item.make_name}</Text>
                <Text style={styles.modelRowName}>{item.name}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={C.textFaint} />
            </TouchableOpacity>
          )}
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
  modelRowName: { fontSize: 15, color: C.text, fontWeight: '500' },
});
