import { useState, useCallback, useEffect } from 'react';
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
import { useRouter, useLocalSearchParams } from 'expo-router';
import { createPost } from '../../src/features/posts/api';
import { POST_CATEGORIES } from '../../src/features/posts/types';
import type { PostCategory } from '../../src/features/posts/types';
import { CATEGORY_ACCENT } from '../../src/utils/postUtils';
import { searchVehicles, getTrimsForModel } from '../../src/features/vehicles/api';
import type { VehicleSearchResult, VehicleTrim } from '../../src/features/vehicles/types';

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

const MAX_BODY = 500;

interface VehicleAttachment {
  make_id: string;
  make_name: string;
  model_id?: string;
  model_name?: string;
  model_slug?: string;
  trim_id?: string;
  trim_name?: string;
}

export default function CreateScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    preMakeId?: string;
    preMakeName?: string;
    preModelId?: string;
    preModelSlug?: string;
    preModelName?: string;
  }>();

  const [body, setBody] = useState('');
  const [category, setCategory] = useState<PostCategory | null>(null);
  const [attachment, setAttachment] = useState<VehicleAttachment | null>(null);
  const [year, setYear] = useState('');
  const [modelQuery, setModelQuery] = useState('');
  const [modelResults, setModelResults] = useState<VehicleSearchResult[]>([]);
  const [searchingModel, setSearchingModel] = useState(false);
  const [trims, setTrims] = useState<VehicleTrim[]>([]);
  const [trimsLoading, setTrimsLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pre-select from route params (navigated from a vehicle page)
  useEffect(() => {
    if (params.preModelId && params.preModelName && params.preMakeName) {
      setAttachment({
        make_id: params.preMakeId ?? '',
        make_name: params.preMakeName,
        model_id: params.preModelId,
        model_name: params.preModelName,
        model_slug: params.preModelSlug ?? '',
      });
      setModelQuery('');
      setModelResults([]);
    }
  }, [params.preModelId]);

  // Fetch trims whenever a model is selected
  useEffect(() => {
    if (!attachment?.model_id) {
      setTrims([]);
      return;
    }
    setTrimsLoading(true);
    getTrimsForModel(attachment.model_id)
      .then(setTrims)
      .finally(() => setTrimsLoading(false));
  }, [attachment?.model_id]);

  const handleCancel = useCallback(() => {
    if (params.preModelSlug) {
      router.replace(`/vehicle/${params.preModelSlug}`);
    } else {
      router.replace('/(tabs)');
    }
  }, [router, params.preModelSlug]);

  const handleModelSearch = useCallback(async (text: string) => {
    setModelQuery(text);
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

  const handleSelectResult = useCallback((item: VehicleSearchResult) => {
    if (item.is_make_result) {
      setAttachment({ make_id: item.make_id, make_name: item.name });
    } else {
      setAttachment({
        make_id: item.make_id,
        make_name: item.make_name,
        model_id: item.id,
        model_name: item.name,
        model_slug: item.slug,
      });
    }
    setYear('');
    setModelQuery('');
    setModelResults([]);
  }, []);

  const clearAttachment = useCallback(() => {
    setAttachment(null);
    setYear('');
    setTrims([]);
    setModelQuery('');
    setModelResults([]);
  }, []);

  const handleSelectTrim = useCallback((trim: VehicleTrim) => {
    setAttachment(prev => {
      if (!prev) return prev;
      // toggle off if already selected
      if (prev.trim_id === trim.id) {
        const { trim_id, trim_name, ...rest } = prev;
        return rest;
      }
      return { ...prev, trim_id: trim.id, trim_name: trim.name };
    });
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!body.trim()) {
      setError('Write something before posting.');
      return;
    }
    const yearNum = year ? parseInt(year, 10) : undefined;
    if (year && (isNaN(yearNum!) || yearNum! < 1900 || yearNum! > 2030)) {
      setError('Enter a valid year (1900–2030).');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await createPost({
        body: body.trim(),
        vehicle_make_id: attachment?.make_id,
        vehicle_model_id: attachment?.model_id,
        vehicle_trim_id: attachment?.trim_id,
        vehicle_year: yearNum,
        category: category ?? 'general',
      });
      setBody('');
      setCategory(null);
      setAttachment(null);
      setYear('');
      setModelQuery('');
      router.replace('/(tabs)');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }, [body, attachment, year, category, router]);

  const charsLeft = MAX_BODY - body.length;
  const canPost = body.trim().length > 0 && !submitting;

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      {/* ── Top action bar ── */}
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

      {/* ── Scrollable form ── */}
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

        {attachment ? (
          <>
            {/* Selected vehicle card */}
            <View style={styles.selectedCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.selectedMakeLabel}>{attachment.make_name}</Text>
                {attachment.model_name && (
                  <Text style={styles.selectedModelName}>{attachment.model_name}</Text>
                )}
                {!attachment.model_name && (
                  <Text style={styles.selectedMakeOnly}>Make-level post</Text>
                )}
              </View>
              <TouchableOpacity onPress={clearAttachment} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons name="close-circle" size={22} color={C.textMuted} />
              </TouchableOpacity>
            </View>

            {/* Trim picker — only when model selected and trims exist */}
            {attachment.model_id && (
              trimsLoading ? (
                <ActivityIndicator size="small" color={C.accent} style={styles.smallLoader} />
              ) : trims.length > 0 ? (
                <>
                  <Text style={styles.subLabel}>Trim (optional)</Text>
                  <View style={styles.chipRow}>
                    {trims.map(trim => {
                      const active = attachment.trim_id === trim.id;
                      return (
                        <TouchableOpacity
                          key={trim.id}
                          style={[styles.chip, active && styles.chipActive]}
                          onPress={() => handleSelectTrim(trim)}
                        >
                          <Text style={[styles.chipText, active && styles.chipTextActive]}>
                            {trim.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </>
              ) : null
            )}

            {/* Year input */}
            <Text style={styles.subLabel}>Year (optional)</Text>
            <TextInput
              style={styles.yearInput}
              placeholder="e.g. 2024"
              placeholderTextColor={C.textFaint}
              value={year}
              onChangeText={setYear}
              keyboardType="number-pad"
              maxLength={4}
            />
          </>
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
            {modelResults.slice(0, 8).map(item => (
              <TouchableOpacity
                key={item.is_make_result ? `make_${item.id}` : item.id}
                style={[styles.resultRow, item.is_make_result && styles.resultRowMake]}
                onPress={() => handleSelectResult(item)}
              >
                {item.is_make_result ? (
                  <View style={styles.makeResultInner}>
                    <Ionicons name="business-outline" size={14} color={C.accent} style={{ marginTop: 1 }} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.makeResultName}>{item.name}</Text>
                      <Text style={styles.makeResultSub}>All {item.name} posts</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={14} color={C.textFaint} />
                  </View>
                ) : (
                  <>
                    <Text style={styles.resultMake}>{item.make_name}</Text>
                    <View style={styles.resultNameRow}>
                      <Text style={styles.resultName}>{item.name}</Text>
                      {item.is_discontinued && (
                        <Text style={styles.resultDiscontinued}>Discontinued</Text>
                      )}
                    </View>
                  </>
                )}
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
    backgroundColor: '#CCCCCC',
  },
  postBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  scroll: { flex: 1 },
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
  subLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: C.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 12,
    marginBottom: 8,
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
  resultRow: {
    paddingVertical: 11,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  resultRowMake: {
    backgroundColor: '#FFFAF7',
  },
  makeResultInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  makeResultName: {
    fontSize: 14,
    fontWeight: '700',
    color: C.accent,
  },
  makeResultSub: {
    fontSize: 11,
    color: C.textMuted,
    marginTop: 1,
  },
  resultMake: {
    fontSize: 10,
    fontWeight: '700',
    color: C.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 2,
  },
  resultNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  resultName: {
    fontSize: 15,
    color: C.text,
  },
  resultDiscontinued: {
    fontSize: 11,
    color: '#AAAAAA',
    fontStyle: 'italic',
  },
  selectedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.surface,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: C.border,
  },
  selectedMakeLabel: {
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
  selectedMakeOnly: {
    fontSize: 13,
    color: C.textMuted,
    fontStyle: 'italic',
  },
  yearInput: {
    backgroundColor: C.inputBg,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: C.text,
    width: 110,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
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
  chipActive: {
    borderColor: C.accent,
    backgroundColor: '#FFF4EE',
  },
  chipText: {
    fontSize: 13,
    color: C.textMuted,
    fontWeight: '500',
  },
  chipTextActive: {
    color: C.accent,
    fontWeight: '700',
  },
  error: {
    color: '#F87171',
    fontSize: 14,
    marginTop: 14,
  },
});
