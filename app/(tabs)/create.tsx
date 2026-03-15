import { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { createPost } from '../../src/features/posts/api';
import { POST_CATEGORIES } from '../../src/features/posts/types';
import type { PostCategory } from '../../src/features/posts/types';
import { searchVehicleModels } from '../../src/features/vehicles/api';
import type { VehicleSearchResult } from '../../src/features/vehicles/types';

const MAX_BODY = 500;

export default function CreateScreen() {
  const router = useRouter();
  const [body, setBody] = useState('');
  const [category, setCategory] = useState<PostCategory | null>(null);
  const [selectedModel, setSelectedModel] = useState<VehicleSearchResult | null>(null);
  const [modelQuery, setModelQuery] = useState('');
  const [modelResults, setModelResults] = useState<VehicleSearchResult[]>([]);
  const [searchingModel, setSearchingModel] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleModelSearch = useCallback(async (text: string) => {
    setModelQuery(text);
    setSelectedModel(null);
    if (!text.trim()) {
      setModelResults([]);
      return;
    }
    setSearchingModel(true);
    try {
      setModelResults(await searchVehicleModels(text));
    } catch {
      setModelResults([]);
    } finally {
      setSearchingModel(false);
    }
  }, []);

  const handleSelectModel = useCallback((item: VehicleSearchResult) => {
    setSelectedModel(item);
    setModelQuery(item.display_name);
    setModelResults([]);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!body.trim()) {
      setError('Post body is required.');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await createPost({
        body: body.trim(),
        vehicle_model_id: selectedModel?.id,
        category: category ?? undefined,
      });
      setBody('');
      setCategory(null);
      setSelectedModel(null);
      setModelQuery('');
      router.replace('/(tabs)');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }, [body, selectedModel, category, router]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.label}>Post</Text>
        <TextInput
          style={styles.bodyInput}
          placeholder="Share your experience, question, or insight..."
          placeholderTextColor="#aaa"
          value={body}
          onChangeText={setBody}
          multiline
          maxLength={MAX_BODY}
          textAlignVertical="top"
        />
        <Text style={styles.charCount}>{body.length}/{MAX_BODY}</Text>

        <Text style={styles.label}>Vehicle (optional)</Text>
        {selectedModel ? (
          <View style={styles.selectedModel}>
            <Text style={styles.selectedModelText}>{selectedModel.display_name}</Text>
            <TouchableOpacity onPress={() => { setSelectedModel(null); setModelQuery(''); }}>
              <Text style={styles.clearModel}>✕</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Search for a car model..."
              placeholderTextColor="#aaa"
              value={modelQuery}
              onChangeText={handleModelSearch}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {searchingModel && <ActivityIndicator size="small" style={styles.smallLoader} />}
            {modelResults.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.modelOption}
                onPress={() => handleSelectModel(item)}
              >
                <Text style={styles.modelOptionText}>{item.display_name}</Text>
              </TouchableOpacity>
            ))}
          </>
        )}

        <Text style={styles.label}>Category (optional)</Text>
        <View style={styles.categoryRow}>
          {POST_CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat.value}
              style={[styles.chip, category === cat.value && styles.chipActive]}
              onPress={() => setCategory(category === cat.value ? null : cat.value)}
            >
              <Text style={[styles.chipText, category === cat.value && styles.chipTextActive]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity
          style={[styles.submitButton, (!body.trim() || submitting) && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={!body.trim() || submitting}
        >
          {submitting
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.submitButtonText}>Post</Text>
          }
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
    marginTop: 20,
  },
  bodyInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#111',
    minHeight: 120,
  },
  charCount: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'right',
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: '#111',
  },
  smallLoader: { marginTop: 8 },
  modelOption: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  modelOptionText: { fontSize: 15, color: '#111' },
  selectedModel: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  selectedModelText: { flex: 1, fontSize: 15, color: '#111', fontWeight: '500' },
  clearModel: { fontSize: 16, color: '#888', paddingLeft: 8 },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chipActive: { backgroundColor: '#000', borderColor: '#000' },
  chipText: { fontSize: 13, color: '#555' },
  chipTextActive: { color: '#fff' },
  error: { color: '#d00', fontSize: 14, marginTop: 12 },
  submitButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 40,
  },
  submitButtonDisabled: { backgroundColor: '#bbb' },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
