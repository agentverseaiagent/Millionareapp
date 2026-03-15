import { useState, useCallback, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useVehicleSearch } from '../../src/features/vehicles/hooks';
import { followMake, unfollowMake, getFollowedMakes } from '../../src/features/vehicles/api';
import { VehicleModelItem } from '../../src/components/VehicleModelItem';
import type { VehicleSearchResult } from '../../src/features/vehicles/types';

const C = {
  bg: '#FFFFFF',
  surface: '#F8F8F8',
  border: '#EBEBEB',
  accent: '#E05A00',
  text: '#111111',
  textMuted: '#777777',
  inputBg: '#F5F5F5',
};

const HINT_EXAMPLES = ['honda', 'crv', 'honda crv', 'nissan', 'rogue', 'mazda', 'cx5', 'cx-5'];

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const { results, loading, search } = useVehicleSearch();
  const router = useRouter();

  // Set of make IDs the user is currently following
  const [followedMakeIds, setFollowedMakeIds] = useState<Set<string>>(new Set());
  // Set of make IDs with a pending follow/unfollow request in flight
  const [followLoadingIds, setFollowLoadingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    getFollowedMakes()
      .then(makes => setFollowedMakeIds(new Set(makes.map(m => m.id))))
      .catch(() => {});
  }, []);

  const handleChange = useCallback((text: string) => {
    setQuery(text);
    search(text);
  }, [search]);

  const handleSelect = useCallback((item: VehicleSearchResult) => {
    if (item.is_make_result) {
      // Scope search to show all models for this make
      const makeQuery = item.name + ' ';
      setQuery(makeQuery);
      search(makeQuery);
      return;
    }
    router.push(`/vehicle/${item.slug}`);
  }, [router, search]);

  const handleMakeFollowToggle = useCallback(async (item: VehicleSearchResult) => {
    const id = item.id;
    setFollowLoadingIds(prev => new Set([...prev, id]));
    try {
      if (followedMakeIds.has(id)) {
        await unfollowMake(id);
        setFollowedMakeIds(prev => { const s = new Set(prev); s.delete(id); return s; });
      } else {
        await followMake(id);
        setFollowedMakeIds(prev => new Set([...prev, id]));
      }
    } catch {
      // silently ignore — user can retry
    } finally {
      setFollowLoadingIds(prev => { const s = new Set(prev); s.delete(id); return s; });
    }
  }, [followedMakeIds]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search makes and models…"
          placeholderTextColor={C.textMuted}
          value={query}
          onChangeText={handleChange}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          returnKeyType="search"
        />
      </View>

      {loading && (
        <View style={styles.loadingRow}>
          <ActivityIndicator size="small" color={C.accent} />
        </View>
      )}

      {!query && !loading && (
        <View style={styles.hintSection}>
          <Text style={styles.hintTitle}>Try searching</Text>
          <View style={styles.hintPills}>
            {HINT_EXAMPLES.map(ex => (
              <Text
                key={ex}
                style={styles.hintPill}
                onPress={() => handleChange(ex)}
              >
                {ex}
              </Text>
            ))}
          </View>
        </View>
      )}

      <FlatList
        data={results}
        keyExtractor={item => item.is_make_result ? `make_${item.id}` : item.id}
        renderItem={({ item }) => (
          <VehicleModelItem
            item={item}
            onPress={handleSelect}
            followState={item.is_make_result ? {
              isFollowing: followedMakeIds.has(item.id),
              loading: followLoadingIds.has(item.id),
              onToggle: () => handleMakeFollowToggle(item),
            } : undefined}
          />
        )}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          query.length > 0 && !loading ? (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No results for "{query}"</Text>
            </View>
          ) : null
        }
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
  },
  searchBar: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  input: {
    backgroundColor: C.inputBg,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 16,
    color: C.text,
  },
  loadingRow: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  hintSection: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  hintTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: C.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 12,
  },
  hintPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  hintPill: {
    backgroundColor: '#FFF4EE',
    color: C.accent,
    fontSize: 13,
    fontWeight: '500',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFD4B8',
    overflow: 'hidden',
  },
  empty: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    color: C.textMuted,
    fontSize: 14,
  },
});
