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
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { createPost } from '../../src/features/posts/api';
import { POST_CATEGORIES } from '../../src/features/posts/types';
import type { PostCategory } from '../../src/features/posts/types';
import { searchVehicles } from '../../src/features/vehicles/api';
import type { VehicleSearchResult } from '../../src/features/vehicles/types';

const C = {
  bg: '#0F0F0F',
  surface: '#1A1A1A',
  border: '#262626',
  accent: '#E05A00',
  text: '#F0F0F0',
  textMuted: '#888',
  textFaint: '#444',
  inputBg: '#141414',
};

const CATEGORY_ACCENT: Record<PostCategory, string> = {
  price_paid:    '#34D399',
  lease_finance: '#60A5FA',
  issue:         '#F87171',
  maintenance:   '#FBBF24',
  review:        '#A78BFA',
  question:      '#9CA3AF',
};

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

  const handleCancel = useCallback(() => {
    router.replace('/(tabs)');
  }, [router]);

  const handleModelSearch = useCallback(async (text: string) => {
    setModelQuery(text);
    setSelectedModel(null);
    if (!text.trim()) {
      setModelResults([]);
      return;
    }
    setSearchingModel(true);
    try {
      setModelResults(await searchVehicles(text));
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
      setError('Write something before posting.');
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

  const charsLeft = MAX_BODY - body.length;
  const canPost = body.trim().length > 0 && !submitting;

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      {/* ── Top action bar — always visible ── */}
      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <Text style={styles.actionBarTitle}>New Post</Text>

        <TouchableOpacity
          style={[styles.postBtn, !canPost && styles.postBtnDisabled]}
          onPress={handleSubmit}
          disabled={!canPost}
        >
          {submitting
            ? <ActivityIndicator color="#fff" size="small" />
            : <Text style={styles.postBtnText}>Post</Text>
          }
        </TouchableOpacity>
      </View>

      {/* ── Scrollable form body ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
      >
        {/* Body */}
        <TextInput
          style={styles.bodyInput}
          placeholder="Share your experience, question, or insight…"
          placeholderTextColor={C.textFaint}
          value={body}
          onChangeText={setBody}
          multiline
          maxLength={MAX_BODY}
          textAlignVertical="top"
        />
        <Text style={[styles.charCount, charsLeft < 50 && styles.charCountWarn]}>
          {charsLeft}
        </Text>

        <View style={styles.divider} />

        {/* Vehicle */}
        <Text style={styles.sectionLabel}>Vehicle</Text>
        {selectedModel ? (
          <View style={styles.selectedModel}>
            <View style={{ flex: 1 }}>
              <Text style={styles.selectedMake}>{selectedModel.make_name}</Text>
              <Text style={styles.selectedModelName}>{selectedModel.name}</Text>
            </View>
            <TouchableOpacity onPress={() => { setSelectedModel(null); setModelQuery(''); }}>
              <Ionicons name="close-circle" size={22} color={C.textMuted} />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TextInput
              style={styles.searchInput}
              placeholder="Search make or model (optional)…"
              placeholderTextColor={C.textFaint}
              value={modelQuery}
              onChangeText={handleModelSearch}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {searchingModel && (
              <ActivityIndicator size="small" color={C.accent} style={styles.smallLoader} />
            )}
            {modelResults.slice(0, 5).map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.modelOption}
                onPress={() => handleSelectModel(item)}
              >
                <Text style={styles.modelOptionMake}>{item.make_name}</Text>
                <Text style={styles.modelOptionName}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </>
        )}

        <View style={styles.divider} />

        {/* Category */}
        <Text style={styles.sectionLabel}>Category</Text>
        <View style={styles.categoryGrid}>
          {POST_CATEGORIES.map(cat => {
            const active = category === cat.value;
            const color = CATEGORY_ACCENT[cat.value];
            return (
              <TouchableOpacity
                key={cat.value}
                style={[styles.chip, active && { borderColor: color, backgroundColor: `${color}18` }]}
                onPress={() => setCategory(category === cat.value ? null : cat.value)}
              >
                <Text style={[styles.chipText, active && { color }]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {error && <Text style={styles.error}>{error}</Text>}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.bg,
  },
  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    backgroundColor: C.bg,
  },
  cancelBtn: {
    paddingVertical: 6,
    paddingRight: 12,
    minWidth: 60,
  },
  cancelText: {
    fontSize: 16,
    color: C.textMuted,
  },
  actionBarTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '700',
    color: C.text,
  },
  postBtn: {
    backgroundColor: C.accent,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
    minWidth: 60,
    alignItems: 'center',
  },
  postBtnDisabled: {
    backgroundColor: '#2A2A2A',
  },
  postBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 120,
  },
  bodyInput: {
    fontSize: 17,
    color: C.text,
    minHeight: 120,
    lineHeight: 25,
    paddingTop: 4,
  },
  charCount: {
    fontSize: 12,
    color: C.textFaint,
    textAlign: 'right',
    marginBottom: 4,
  },
  charCountWarn: {
    color: '#F87171',
  },
  divider: {
    height: 1,
    backgroundColor: C.border,
    marginVertical: 16,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: C.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: C.inputBg,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: C.text,
  },
  smallLoader: { marginTop: 10 },
  modelOption: {
    paddingVertical: 11,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  modelOptionMake: {
    fontSize: 10,
    fontWeight: '700',
    color: C.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 2,
  },
  modelOptionName: {
    fontSize: 15,
    color: C.text,
  },
  selectedModel: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.surface,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: C.border,
  },
  selectedMake: {
    fontSize: 10,
    fontWeight: '700',
    color: C.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 2,
  },
  selectedModelName: {
    fontSize: 15,
    color: C.text,
    fontWeight: '600',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  chipText: {
    fontSize: 13,
    color: C.textMuted,
    fontWeight: '500',
  },
  error: {
    color: '#F87171',
    fontSize: 14,
    marginTop: 14,
  },
});
