import { useState, useCallback } from 'react';
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useVehicleSearch } from '../../src/features/vehicles/hooks';
import { VehicleModelItem } from '../../src/components/VehicleModelItem';
import type { VehicleSearchResult } from '../../src/features/vehicles/types';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const { results, loading, error, search } = useVehicleSearch();
  const router = useRouter();

  const handleChange = useCallback((text: string) => {
    setQuery(text);
    search(text);
  }, [search]);

  const handleSelect = useCallback((item: VehicleSearchResult) => {
    router.push(`/vehicle/${item.slug}`);
  }, [router]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search car model (e.g. CR-V, Tacoma, Model 3)"
        placeholderTextColor="#aaa"
        value={query}
        onChangeText={handleChange}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
      {loading && (
        <View style={styles.loadingRow}>
          <ActivityIndicator size="small" />
        </View>
      )}
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={results}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <VehicleModelItem item={item} onPress={handleSelect} />}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          query.length > 0 && !loading ? (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No models found for "{query}"</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    margin: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#111',
    backgroundColor: '#fafafa',
  },
  loadingRow: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  error: {
    color: '#d00',
    fontSize: 14,
    textAlign: 'center',
    padding: 12,
  },
  empty: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    color: '#888',
    fontSize: 14,
  },
});
