import { useState, useCallback, useEffect, useRef } from 'react';
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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Vehicle search (initial, when nothing selected)
  const [vehicleQuery, setVehicleQuery] = useState('');
  const [vehicleResults, setVehicleResults] = useState<VehicleSearchResult[]>([]);
  const [searching, setSearching] = useState(false);

  // Model search (when make is selected and user wants to add a model)
  const [addingModel, setAddingModel] = useState(false);
  const [modelQuery, setModelQuery] = useState('');
  const [modelResults, setModelResults] = useState<VehicleSearchResult[]>([]);
  const [searchingModel, setSearchingModel] = useState(false);

  // Trim
  const [trims, setTrims] = useState<VehicleTrim[]>([]);
  const [trimsLoading, setTrimsLoading] = useState(false);

  const modelInputRef = useRef<TextInput>(null);

  // Pre-select from route params
  useEffect(() => {
    if (params.preModelId && params.preModelName && params.preMakeName) {
      setAttachment({
        make_id: params.preMakeId ?? '',
        make_name: params.preMakeName,
        model_id: params.preModelId,
        model_name: params.preModelName,
        model_slug: params.preModelSlug ?? '',
      });
    }
  }, [params.preModelId]);

  // Fetch trims when model is selected
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

  // Initial vehicle search (no make selected yet)
  const handleVehicleSearch = useCallback(async (text: string) => {
    setVehicleQuery(text);
    if (!text.trim()) {
      setVehicleResults([]);
      return;
    }
    setSearching(true);
    try {
      setVehicleResults(await searchVehicles(text));
    } catch {
      setVehicleResults([]);
    } finally {
      setSearching(false);
    }
  }, []);

  // Model search (scoped to selected make)
  const handleModelSearch = useCallback(async (text: string) => {
    setModelQuery(text);
    if (!text.trim()) {
      setModelResults([]);
      return;
    }
    setSearchingModel(true);
    try {
      const all = await searchVehicles(text);
      // Keep only models from the selected make
      setModelResults(all.filter(r => !r.is_make_result && r.make_id === attachment?.make_id));
    } catch {
      setModelResults([]);
    } finally {
      setSearchingModel(false);
    }
  }, [attachment?.make_id]);

  const handleSelectResult = useCallback((item: VehicleSearchResult) => {
    if (item.is_make_result) {
      setAttachment({ make_id: item.make_id, make_name: item.name });
    } else {
      setAttachment(prev => ({
        make_id: item.make_id,
        make_name: item.make_name,
        model_id: item.id,
        model_name: item.name,
        model_slug: item.slug,
        // carry over trim if previously chosen for same make
        trim_id: prev?.make_id === item.make_id ? prev?.trim_id : undefined,
        trim_name: prev?.make_id === item.make_id ? prev?.trim_name : undefined,
      }));
      setAddingModel(false);
      setModelQuery('');
      setModelResults([]);
    }
    setYear('');
    setVehicleQuery('');
    setVehicleResults([]);
  }, []);

  const handleOpenModelSearch = useCallback(() => {
    setAddingModel(true);
    setModelQuery('');
    setModelResults([]);
    // seed with make name so user sees models immediately
    if (attachment?.make_name) {
      handleModelSearch(attachment.make_name);
    }
    setTimeout(() => modelInputRef.current?.focus(), 100);
  }, [attachment?.make_name, handleModelSearch]);

  const clearAttachment = useCallback(() => {
    setAttachment(null);
    setYear('');
    setTrims([]);
    setAddingModel(false);
    setVehicleQuery('');
    setVehicleResults([]);
    setModelQuery('');
    setModelResults([]);
  }, []);

  const clearModel = useCallback(() => {
    setAttachment(prev => prev ? { make_id: prev.make_id, make_name: prev.make_name } : null);
    setYear('');
    setTrims([]);
    setAddingModel(false);
  }, []);

  const handleSelectTrim = useCallback((trim: VehicleTrim) => {
    setAttachment(prev => {
      if (!prev) return prev;
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
      router.replace('/(tabs)');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }, [body, attachment, year, category, router]);

  const charsLeft = MAX_BODY - body.length;
  const canPost = body.trim().length > 0 && !submitting;

  // ── Render helpers ──────────────────────────────────────────────────────────

  function renderVehicleSection() {
    // ── No attachment: initial search ──────────────────────────────
    if (!attachment) {
      return (
        <>
          <TextInput
            style={styles.searchInput}
            placeholder="Search make or model (optional)…"
            placeholderTextColor={C.textFaint}
            value={vehicleQuery}
            onChangeText={handleVehicleSearch}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searching && (
            <ActivityIndicator size="small" color={C.accent} style={styles.smallLoader} />
          )}
          {vehicleResults.slice(0, 8).map(item => (
            <TouchableOpacity
              key={item.is_make_result ? `make_${item.id}` : item.id}
              style={[styles.resultRow, item.is_make_result && styles.resultRowMake]}
              onPress={() => handleSelectResult(item)}
            >
              {item.is_make_result ? (
                <View style={styles.makeResultInner}>
                  <Ionicons name="car-outline" size={15} color={C.accent} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.makeResultName}>{item.name}</Text>
                    <Text style={styles.makeResultSub}>Post about all {item.name} vehicles</Text>
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
      );
    }

    // ── Make selected, no model yet ────────────────────────────────
    if (!attachment.model_id) {
      return (
        <>
          {/* Make badge */}
          <View style={styles.selectedCard}>
            <Ionicons name="car-outline" size={18} color={C.accent} style={{ marginRight: 10 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.selectedMakeLabel}>Make</Text>
              <Text style={styles.selectedMakeName}>{attachment.make_name}</Text>
            </View>
            <TouchableOpacity
              onPress={clearAttachment}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="close-circle" size={22} color={C.textMuted} />
            </TouchableOpacity>
          </View>

          {/* Add model prompt */}
          {!addingModel ? (
            <View style={styles.addModelRow}>
              <TouchableOpacity style={styles.addModelBtn} onPress={handleOpenModelSearch}>
                <Ionicons name="add-circle-outline" size={16} color={C.accent} />
                <Text style={styles.addModelBtnText}>Add a specific model</Text>
              </TouchableOpacity>
              <Text style={styles.addModelHint}>  or post about {attachment.make_name} only</Text>
            </View>
          ) : (
            <>
              <Text style={styles.subLabel}>Search {attachment.make_name} models</Text>
              <TextInput
                ref={modelInputRef}
                style={styles.searchInput}
                placeholder={`e.g. CR-V, Civic, Pilot…`}
                placeholderTextColor={C.textFaint}
                value={modelQuery}
                onChangeText={handleModelSearch}
                autoCapitalize="none"
                autoCorrect={false}
              />
              {searchingModel && (
                <ActivityIndicator size="small" color={C.accent} style={styles.smallLoader} />
              )}
              {modelResults.slice(0, 6).map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.resultRow}
                  onPress={() => handleSelectResult(item)}
                >
                  <Text style={styles.resultMake}>{item.make_name}</Text>
                  <View style={styles.resultNameRow}>
                    <Text style={styles.resultName}>{item.name}</Text>
                    {item.is_discontinued && (
                      <Text style={styles.resultDiscontinued}>Discontinued</Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.cancelModelSearch}
                onPress={() => { setAddingModel(false); setModelQuery(''); setModelResults([]); }}
              >
                <Text style={styles.cancelModelSearchText}>Cancel — keep {attachment.make_name} only</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      );
    }

    // ── Make + model selected ──────────────────────────────────────
    return (
      <>
        {/* Make + model card */}
        <View style={styles.selectedCard}>
          <Ionicons name="car-sport-outline" size={18} color={C.accent} style={{ marginRight: 10 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.selectedMakeLabel}>{attachment.make_name}</Text>
            <Text style={styles.selectedModelName}>{attachment.model_name}</Text>
          </View>
          <View style={styles.selectedCardActions}>
            <TouchableOpacity
              onPress={clearModel}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              style={styles.changeModelBtn}
            >
              <Text style={styles.changeModelText}>Change</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={clearAttachment}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              style={{ marginLeft: 12 }}
            >
              <Ionicons name="close-circle" size={22} color={C.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Trim */}
        {trimsLoading ? (
          <ActivityIndicator size="small" color={C.accent} style={styles.smallLoader} />
        ) : trims.length > 0 ? (
          <>
            <Text style={styles.subLabel}>Trim  <Text style={styles.optionalTag}>optional</Text></Text>
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
        ) : null}

        {/* Year */}
        <Text style={styles.subLabel}>Year  <Text style={styles.optionalTag}>optional</Text></Text>
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
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* ── Top action bar ────────────────────────────────────────── */}
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

      {/* ── Scrollable form ───────────────────────────────────────── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
      >
        {/* ── Body ──────────────────────────────────────────────── */}
        <TextInput
          style={styles.bodyInput}
          placeholder="Share your experience, question, or insight…"
          placeholderTextColor={C.textFaint}
          value={body}
          onChangeText={setBody}
          multiline
          maxLength={MAX_BODY}
          textAlignVertical="top"
          autoFocus={!params.preModelId}
        />
        <View style={styles.charRow}>
          <Text style={[styles.charCount, charsLeft < 50 && styles.charCountWarn]}>
            {charsLeft} characters left
          </Text>
        </View>

        {/* ── Category ──────────────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Category  <Text style={styles.optionalTag}>optional</Text></Text>
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
                  <Text style={[styles.chipText, active && { color, fontWeight: '700' }]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ── Vehicle ───────────────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Vehicle  <Text style={styles.optionalTag}>optional</Text></Text>
          {renderVehicleSection()}
        </View>

        {error && (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle-outline" size={16} color="#F87171" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* ── Submit button (bottom of form) ────────────────────── */}
        <TouchableOpacity
          style={[styles.submitBtn, !canPost && styles.submitBtnDisabled]}
          onPress={handleSubmit}
          disabled={!canPost}
        >
          {submitting
            ? <ActivityIndicator color="#fff" size="small" />
            : <Text style={styles.submitBtnText}>Post</Text>
          }
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.bg,
  },

  // ── Action bar ────────────────────────────────────────────────
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
  postBtnDisabled: { backgroundColor: '#CCCCCC' },
  postBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },

  // ── Scroll / form ─────────────────────────────────────────────
  scroll: { flex: 1 },
  scrollContent: {
    padding: 16,
    paddingBottom: 60,
    gap: 0,
  },

  // ── Body ──────────────────────────────────────────────────────
  bodyInput: {
    fontSize: 17,
    color: C.text,
    minHeight: 130,
    lineHeight: 26,
    paddingTop: 4,
  },
  charRow: {
    alignItems: 'flex-end',
    marginTop: 4,
    marginBottom: 4,
  },
  charCount: {
    fontSize: 12,
    color: C.textFaint,
  },
  charCountWarn: { color: '#F87171' },

  // ── Section ───────────────────────────────────────────────────
  section: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: C.border,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: C.text,
    marginBottom: 12,
  },
  optionalTag: {
    fontSize: 11,
    fontWeight: '400',
    color: C.textFaint,
  },
  subLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: C.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 14,
    marginBottom: 8,
  },

  // ── Category grid ─────────────────────────────────────────────
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  // ── Chips ─────────────────────────────────────────────────────
  chipRow: {
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
  chipText: { fontSize: 13, color: C.textMuted, fontWeight: '500' },
  chipTextActive: { color: C.accent, fontWeight: '700' },

  // ── Search inputs ─────────────────────────────────────────────
  searchInput: {
    backgroundColor: C.inputBg,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: C.text,
  },
  smallLoader: { marginTop: 10 },

  // ── Search result rows ────────────────────────────────────────
  resultRow: {
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  resultRowMake: {
    backgroundColor: '#FFFAF7',
    paddingHorizontal: 8,
    borderRadius: 6,
    marginTop: 2,
  },
  makeResultInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  makeResultName: {
    fontSize: 15,
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
  resultName: { fontSize: 15, color: C.text },
  resultDiscontinued: { fontSize: 11, color: '#AAAAAA', fontStyle: 'italic' },

  // ── Selected vehicle card ─────────────────────────────────────
  selectedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8F4',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: '#FFD4B8',
  },
  selectedMakeLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: C.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  selectedMakeName: {
    fontSize: 16,
    fontWeight: '700',
    color: C.text,
  },
  selectedModelName: {
    fontSize: 16,
    fontWeight: '600',
    color: C.text,
  },
  selectedCardActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeModelBtn: {
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  changeModelText: {
    fontSize: 12,
    color: C.textMuted,
    fontWeight: '600',
  },

  // ── Add model row ─────────────────────────────────────────────
  addModelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    flexWrap: 'wrap',
    gap: 4,
  },
  addModelBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 4,
  },
  addModelBtnText: {
    fontSize: 14,
    color: C.accent,
    fontWeight: '600',
  },
  addModelHint: {
    fontSize: 13,
    color: C.textMuted,
  },
  cancelModelSearch: {
    marginTop: 10,
    paddingVertical: 8,
    alignItems: 'center',
  },
  cancelModelSearchText: {
    fontSize: 13,
    color: C.textMuted,
  },

  // ── Year input ────────────────────────────────────────────────
  yearInput: {
    backgroundColor: C.inputBg,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: C.text,
    width: 120,
  },

  // ── Error ─────────────────────────────────────────────────────
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 16,
  },
  errorText: {
    color: '#F87171',
    fontSize: 14,
    flex: 1,
  },

  // ── Bottom submit button ──────────────────────────────────────
  submitBtn: {
    marginTop: 28,
    backgroundColor: C.accent,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  submitBtnDisabled: { backgroundColor: '#CCCCCC' },
  submitBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
