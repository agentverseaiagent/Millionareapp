import { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../src/lib/supabase';
import { signOut } from '../../src/features/auth/api';
import { getFollowedModels } from '../../src/features/vehicles/api';
import type { VehicleSearchResult } from '../../src/features/vehicles/types';

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
      <View style={styles.userSection}>
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

      <Text style={styles.sectionTitle}>Following</Text>

      {loading ? (
        <ActivityIndicator style={styles.loader} />
      ) : followedModels.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>You're not following any models yet.</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/search')}>
            <Text style={styles.emptyLink}>Search for a model →</Text>
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
              <Text style={styles.modelName}>{item.display_name}</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e5e5',
    gap: 12,
  },
  email: { flex: 1, fontSize: 15, color: '#333' },
  signOutButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: 90,
    alignItems: 'center',
  },
  signOutText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  loader: { marginTop: 24 },
  empty: { padding: 24, alignItems: 'center', gap: 10 },
  emptyText: { color: '#888', fontSize: 14 },
  emptyLink: { color: '#0066cc', fontSize: 14 },
  modelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e5e5',
  },
  modelName: { flex: 1, fontSize: 15, color: '#111' },
  chevron: { fontSize: 20, color: '#ccc' },
});
