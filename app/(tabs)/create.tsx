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
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router';
import { useProfile, hasValidUsername } from '../../src/features/auth/hooks';
import { createPost } from '../../src/features/posts/api';
import { POST_CATEGORIES } from '../../src/features/posts/types';
import type { PostCategory, PostVehicleAttachment } from '../../src/features/posts/types';
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
const MAX_VEHICLES = 3;

// Picker state for the in-progress vehicle being selected
interface PickerState {
  make_id: string;
  make_name: string;
  model_id?: string;
  model_name?: string;
  model_slug?: string;
  trim_id?: string;
  trim_name?: string;
  year?: string; // string while editing, converted on add
}

export default function CreateScreen() {
  const router = useRouter();
  const { profile, loading: profileLoading, refetch: refetchProfile } = useProfile();

  useFocusEffect(useCallback(() => { refetchProfile(); }, [refetchProfile]));

  const params = useLocalSearchParams<{
    preMakeId?: string;
    preMakeName?: string;
    preModelId?: string;
    preModelSlug?: string;
    preModelName?: string;
  }>();

  const [body, setBody] = useState('');
  const [categories, setCategories] = useState<PostCategory[]>([]);
  const [vehicles, setVehicles] = useState<PostVehicleAttachment[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Vehicle picker state
  const [pickerOpen, setPickerOpen] = useState(false);
  const [picker, setPicker] = useState<PickerState | null>(null);
  const [addingModel, setAddingModel] = useState(false);
  const [vehicleQuery, setVehicleQuery] = useState('');
  const [vehicleResults, setVehicleResults] = useState<VehicleSearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [modelQuery, setModelQuery] = useState('');
  const [modelResults, setModelResults] = useState<VehicleSearchResult[]>([]);
  const [searchingModel, setSearchingModel] = useState(false);
  const [trims, setTrims] = useState<VehicleTrim[]>([]);
  const [trimsLoading, setTrimsLoading] = useState(false);

  const modelInputRef = useRef<TextInput>(null);

  // Pre-select from route params
  useEffect(() => {
    if (params.preModelId && params.preModelName && params.preMakeName) {
      setVehicles([{
        make_id: params.preMakeId ?? '',
        make_name: params.preMakeName,
        model_id: params.preModelId,
        model_name: params.preModelName,
        model_slug: params.preModelSlug ?? '',
      }]);
    }
  }, [params.preModelId]);

  // Fetch trims when model is selected in picker
  useEffect(() => {
    if (!picker?.model_id) { setTrims([]); return; }
    setTrimsLoading(true);
    getTrimsForModel(picker.model_id).then(setTrims).finally(() => setTrimsLoading(false));
  }, [picker?.model_id]);

  const handleCancel = useCallback(() => {
    if (params.preModelSlug) router.replace(`/vehicle/${params.preModelSlug}`);
    else router.replace('/(tabs)');
  }, [router, params.preModelSlug]);

  // ── Category toggle ──────────────────────────────────────────────────────
  const toggleCategory = useCallback((cat: PostCategory) => {
    setCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  }, []);

  // ── Vehicle search ───────────────────────────────────────────────────────
  const handleVehicleSearch = useCallback(async (text: string) => {
    setVehicleQuery(text);
    if (!text.trim()) { setVehicleResults([]); return; }
    setSearching(true);
    try { setVehicleResults(await searchVehicles(text)); }
    catch { setVehicleResults([]); }
    finally { setSearching(false); }
  }, []);

  const handleModelSearch = useCallback(async (text: string) => {
    setModelQuery(text);
    if (!text.trim()) { setModelResults([]); return; }
    setSearchingModel(true);
    try {
      const all = await searchVehicles(text);
      setModelResults(all.filter(r => !r.is_make_result && r.make_id === picker?.make_id));
    }
    catch { setModelResults([]); }
    finally { setSearchingModel(false); }
  }, [picker?.make_id]);

  const openPicker = useCallback(() => {
    setPicker(null);
    setAddingModel(false);
    setVehicleQuery('');
    setVehicleResults([]);
    setModelQuery('');
    setModelResults([]);
    setTrims([]);
    setPickerOpen(true);
  }, []);

  const closePicker = useCallback(() => {
    setPickerOpen(false);
    setPicker(null);
    setAddingModel(false);
    setVehicleQuery('');
    setVehicleResults([]);
  }, []);

  const handleSelectResult = useCallback((item: VehicleSearchResult) => {
    if (item.is_make_result) {
      setPicker({ make_id: item.make_id, make_name: item.name });
    } else {
      setPicker(prev => ({
        make_id: item.make_id,
        make_name: item.make_name,
        model_id: item.id,
        model_name: item.name,
        model_slug: item.slug,
        trim_id: prev?.make_id === item.make_id ? prev?.trim_id : undefined,
        trim_name: prev?.make_id === item.make_id ? prev?.trim_name : undefined,
      }));
      setAddingModel(false);
      setModelQuery('');
      setModelResults([]);
    }
    setVehicleQuery('');
    setVehicleResults([]);
  }, []);

  const handleOpenModelSearch = useCallback(() => {
    setAddingModel(true);
    setModelQuery('');
    setModelResults([]);
    if (picker?.make_name) handleModelSearch(picker.make_name);
    setTimeout(() => modelInputRef.current?.focus(), 100);
  }, [picker?.make_name, handleModelSearch]);

  const handleSelectTrim = useCallback((trim: VehicleTrim) => {
    setPicker(prev => {
      if (!prev) return prev;
      if (prev.trim_id === trim.id) {
        const { trim_id, trim_name, ...rest } = prev;
        return rest;
      }
      return { ...prev, trim_id: trim.id, trim_name: trim.name };
    });
  }, []);

  const handleAddVehicle = useCallback(() => {
    if (!picker) return;
    const yearNum = picker.year ? parseInt(picker.year, 10) : undefined;
    const v: PostVehicleAttachment = {
      make_id: picker.make_id,
      make_name: picker.make_name,
      model_id: picker.model_id,
      model_name: picker.model_name,
      model_slug: picker.model_slug,
      trim_id: picker.trim_id,
      trim_name: picker.trim_name,
      year: yearNum && !isNaN(yearNum) ? yearNum : undefined,
    };
    setVehicles(prev => [...prev, v]);
    closePicker();
  }, [picker, closePicker]);

  // ── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = useCallback(async () => {
    if (!body.trim()) { setError('Write something before posting.'); return; }
    setError(null);
    setSubmitting(true);
    try {
      await createPost({
        body: body.trim(),
        categories: categories.length > 0 ? categories : ['general'],
        vehicle_attachments: vehicles,
      });
      router.replace('/(tabs)');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }, [body, categories, vehicles, router]);

  const charsLeft = MAX_BODY - body.length;
  const canPost = body.trim().length > 0 && !submitting;

  // ── Vehicle picker render ────────────────────────────────────────────────
  function renderPicker() {
    if (!pickerOpen) return null;

    // No make selected yet — show search
    if (!picker) {
      return (
        <View style={styles.pickerBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search make or model…"
            placeholderTextColor={C.textFaint}
            value={vehicleQuery}
            onChangeText={handleVehicleSearch}
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus
          />
          {searching && <ActivityIndicator size="small" color={C.accent} style={styles.smallLoader} />}
          <ScrollView
            style={styles.resultsScroll}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled
          >
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
                      <Text style={styles.makeResultSub}>All {item.name} vehicles</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={14} color={C.textFaint} />
                  </View>
                ) : (
                  <>
                    <Text style={styles.resultMake}>{item.make_name}</Text>
                    <View style={styles.resultNameRow}>
                      <Text style={styles.resultName}>{item.name}</Text>
                      {item.is_discontinued && <Text style={styles.resultDiscontinued}>Discontinued</Text>}
                    </View>
                  </>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.cancelPickerBtn} onPress={closePicker}>
            <Text style={styles.cancelPickerText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      );
    }

    // Make selected, no model yet
    if (!picker.model_id) {
      return (
        <View style={styles.pickerBox}>
          <View style={styles.pickerSelectedCard}>
            <Ionicons name="car-outline" size={16} color={C.accent} style={{ marginRight: 8 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.pickerMakeLabel}>Make</Text>
              <Text style={styles.pickerMakeName}>{picker.make_name}</Text>
            </View>
          </View>

          {!addingModel ? (
            <>
              <TouchableOpacity style={styles.addModelBtn} onPress={handleOpenModelSearch}>
                <Ionicons name="add-circle-outline" size={15} color={C.accent} />
                <Text style={styles.addModelBtnText}>Add a specific model</Text>
              </TouchableOpacity>
              <View style={styles.pickerActions}>
                <TouchableOpacity style={styles.addVehicleConfirmBtn} onPress={handleAddVehicle}>
                  <Text style={styles.addVehicleConfirmText}>Tag this post with {picker.make_name}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelPickerBtn} onPress={closePicker}>
                  <Text style={styles.cancelPickerText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.subLabel}>Search {picker.make_name} models</Text>
              <TextInput
                ref={modelInputRef}
                style={styles.searchInput}
                placeholder="e.g. CR-V, Civic…"
                placeholderTextColor={C.textFaint}
                value={modelQuery}
                onChangeText={handleModelSearch}
                autoCapitalize="none"
                autoCorrect={false}
              />
              {searchingModel && <ActivityIndicator size="small" color={C.accent} style={styles.smallLoader} />}
              <ScrollView
                style={styles.resultsScroll}
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled
              >
                {modelResults.map(item => (
                  <TouchableOpacity key={item.id} style={styles.resultRow} onPress={() => handleSelectResult(item)}>
                    <Text style={styles.resultMake}>{item.make_name}</Text>
                    <View style={styles.resultNameRow}>
                      <Text style={styles.resultName}>{item.name}</Text>
                      {item.is_discontinued && <Text style={styles.resultDiscontinued}>Discontinued</Text>}
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity onPress={() => { setAddingModel(false); setModelQuery(''); setModelResults([]); }}>
                <Text style={styles.cancelPickerText}>← Back</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      );
    }

    // Make + model selected — show trim/year + confirm
    return (
      <View style={styles.pickerBox}>
        <View style={styles.pickerSelectedCard}>
          <Ionicons name="car-sport-outline" size={16} color={C.accent} style={{ marginRight: 8 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.pickerMakeLabel}>{picker.make_name}</Text>
            <Text style={styles.pickerMakeName}>{picker.model_name}</Text>
          </View>
          <TouchableOpacity onPress={() => setPicker(prev => prev ? { make_id: prev.make_id, make_name: prev.make_name } : null)}>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>

        {trimsLoading ? (
          <ActivityIndicator size="small" color={C.accent} style={styles.smallLoader} />
        ) : trims.length > 0 ? (
          <>
            <Text style={styles.subLabel}>Trim  <Text style={styles.optionalTag}>optional</Text></Text>
            <View style={styles.chipRow}>
              {trims.map(trim => {
                const active = picker.trim_id === trim.id;
                return (
                  <TouchableOpacity key={trim.id} style={[styles.chip, active && styles.chipActive]} onPress={() => handleSelectTrim(trim)}>
                    <Text style={[styles.chipText, active && styles.chipTextActive]}>{trim.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        ) : null}

        <Text style={styles.subLabel}>Year  <Text style={styles.optionalTag}>optional</Text></Text>
        <TextInput
          style={styles.yearInput}
          placeholder="e.g. 2024"
          placeholderTextColor={C.textFaint}
          value={picker.year ?? ''}
          onChangeText={t => setPicker(prev => prev ? { ...prev, year: t } : prev)}
          keyboardType="number-pad"
          maxLength={4}
        />

        <View style={styles.pickerActions}>
          <TouchableOpacity style={styles.addVehicleConfirmBtn} onPress={handleAddVehicle}>
            <Text style={styles.addVehicleConfirmText}>
              Tag this post with {[picker.make_name, picker.model_name, picker.trim_name, picker.year].filter(Boolean).join(' · ')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelPickerBtn} onPress={closePicker}>
            <Text style={styles.cancelPickerText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* Action bar */}
      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.actionBarTitle}>New Post</Text>
        <TouchableOpacity
          style={[styles.postBtn, (!canPost || !hasValidUsername(profile?.username)) && styles.postBtnDisabled]}
          onPress={handleSubmit}
          disabled={!canPost || !hasValidUsername(profile?.username)}
        >
          {submitting
            ? <ActivityIndicator color="#fff" size="small" />
            : <Text style={styles.postBtnText}>Post</Text>
          }
        </TouchableOpacity>
      </View>

      {profileLoading ? (
        <View style={styles.gateCenter}>
          <ActivityIndicator color={C.accent} size="large" />
        </View>
      ) : !hasValidUsername(profile?.username) ? (
        <View style={styles.usernameGate}>
          <Ionicons name="person-circle-outline" size={52} color={C.textFaint} />
          <Text style={styles.gateTitle}>Display name required</Text>
          <Text style={styles.gateBody}>
            Set a display name on your profile before you can post.
          </Text>
          <TouchableOpacity
            style={styles.gateBtn}
            onPress={() => router.replace('/(tabs)/profile')}
          >
            <Text style={styles.gateBtnText}>Go to Profile</Text>
          </TouchableOpacity>
        </View>
      ) : (
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
          autoFocus={!params.preModelId}
        />
        <View style={styles.charRow}>
          <Text style={[styles.charCount, charsLeft < 50 && styles.charCountWarn]}>
            {charsLeft} characters left
          </Text>
        </View>

        {/* Category — multi-select */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            Category  <Text style={styles.optionalTag}>optional · select any that apply</Text>
          </Text>
          <View style={styles.chipRow}>
            {POST_CATEGORIES.map(cat => {
              const active = categories.includes(cat.value);
              const color = CATEGORY_ACCENT[cat.value];
              return (
                <TouchableOpacity
                  key={cat.value}
                  style={[styles.chip, active && { borderColor: color, backgroundColor: `${color}18` }]}
                  onPress={() => toggleCategory(cat.value)}
                >
                  <Text style={[styles.chipText, active && { color, fontWeight: '700' }]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Vehicles — multi-select */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            Vehicles  <Text style={styles.optionalTag}>optional · up to {MAX_VEHICLES}</Text>
          </Text>

          {/* Added vehicles list */}
          {vehicles.map((v, i) => {
            const parts: string[] = [];
            if (v.make_name) parts.push(v.make_name);
            if (v.model_name) parts.push(v.model_name);
            if (v.trim_name) parts.push(v.trim_name);
            if (v.year) parts.push(String(v.year));
            const label = parts.join(' · ');
            return (
              <View key={i} style={styles.addedVehicleRow}>
                <Ionicons name="car-sport-outline" size={15} color={C.accent} style={{ marginRight: 8 }} />
                <Text style={styles.addedVehicleLabel} numberOfLines={1}>{label}</Text>
                <TouchableOpacity
                  onPress={() => setVehicles(prev => prev.filter((_, idx) => idx !== i))}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Ionicons name="close-circle" size={18} color={C.textMuted} />
                </TouchableOpacity>
              </View>
            );
          })}

          {/* Picker */}
          {renderPicker()}

          {/* Add vehicle button — shown when picker is closed and under limit */}
          {!pickerOpen && vehicles.length < MAX_VEHICLES && (
            <TouchableOpacity style={styles.addVehicleBtn} onPress={openPicker}>
              <Ionicons name="add-circle-outline" size={16} color={C.accent} />
              <Text style={styles.addVehicleBtnText}>
                {vehicles.length === 0 ? 'Add a vehicle' : 'Add another vehicle'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {error && (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle-outline" size={16} color="#F87171" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

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
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },

  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  cancelBtn: { paddingVertical: 6, paddingRight: 12, minWidth: 60 },
  cancelText: { fontSize: 16, color: C.textMuted },
  actionBarTitle: { flex: 1, textAlign: 'center', fontSize: 15, fontWeight: '700', color: C.text },
  postBtn: {
    backgroundColor: C.accent, borderRadius: 20,
    paddingHorizontal: 18, paddingVertical: 8, minWidth: 60, alignItems: 'center',
  },
  postBtnDisabled: { backgroundColor: '#CCCCCC' },
  postBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },

  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 60 },

  bodyInput: {
    fontSize: 17, color: C.text, minHeight: 130, lineHeight: 26, paddingTop: 4,
  },
  charRow: { alignItems: 'flex-end', marginTop: 4, marginBottom: 4 },
  charCount: { fontSize: 12, color: C.textFaint },
  charCountWarn: { color: '#F87171' },

  section: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: C.border,
  },
  sectionLabel: { fontSize: 13, fontWeight: '700', color: C.text, marginBottom: 12 },
  optionalTag: { fontSize: 11, fontWeight: '400', color: C.textFaint },
  subLabel: {
    fontSize: 12, fontWeight: '600', color: C.textMuted,
    textTransform: 'uppercase', letterSpacing: 0.5,
    marginTop: 12, marginBottom: 8,
  },

  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { borderWidth: 1, borderColor: C.border, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 7 },
  chipActive: { borderColor: C.accent, backgroundColor: '#FFF4EE' },
  chipText: { fontSize: 13, color: C.textMuted, fontWeight: '500' },
  chipTextActive: { color: C.accent, fontWeight: '700' },

  // Added vehicle rows
  addedVehicleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8F4',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
    borderWidth: 1,
    borderColor: '#FFD4B8',
    marginBottom: 8,
  },
  addedVehicleLabel: { flex: 1, fontSize: 14, fontWeight: '600', color: C.text },

  // Add vehicle button
  addVehicleBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingVertical: 10,
  },
  addVehicleBtnText: { fontSize: 14, color: C.accent, fontWeight: '600' },

  // Picker box
  pickerBox: {
    backgroundColor: C.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: C.border,
    padding: 12,
    marginTop: 4,
    marginBottom: 8,
  },
  searchInput: {
    backgroundColor: C.bg,
    borderWidth: 1, borderColor: C.border, borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, color: C.text,
  },
  smallLoader: { marginTop: 10 },
  resultsScroll: { maxHeight: 280 },
  resultRow: { paddingVertical: 12, paddingHorizontal: 4, borderBottomWidth: 1, borderBottomColor: C.border },
  resultRowMake: { backgroundColor: '#FFFAF7', paddingHorizontal: 8, borderRadius: 6, marginTop: 2 },
  makeResultInner: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  makeResultName: { fontSize: 15, fontWeight: '700', color: C.accent },
  makeResultSub: { fontSize: 11, color: C.textMuted, marginTop: 1 },
  resultMake: { fontSize: 10, fontWeight: '700', color: C.accent, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 2 },
  resultNameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  resultName: { fontSize: 15, color: C.text },
  resultDiscontinued: { fontSize: 11, color: '#AAAAAA', fontStyle: 'italic' },
  pickerSelectedCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.bg, borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 10,
    borderWidth: 1, borderColor: '#FFD4B8',
    marginBottom: 10,
  },
  pickerMakeLabel: { fontSize: 10, fontWeight: '700', color: C.accent, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 1 },
  pickerMakeName: { fontSize: 15, fontWeight: '600', color: C.text },
  changeText: { fontSize: 12, color: C.textMuted, fontWeight: '600' },
  addModelBtn: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 8 },
  addModelBtnText: { fontSize: 14, color: C.accent, fontWeight: '600' },
  pickerActions: { marginTop: 10, gap: 6 },
  addVehicleConfirmBtn: {
    backgroundColor: C.accent, borderRadius: 10,
    paddingVertical: 11, alignItems: 'center',
  },
  addVehicleConfirmText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  cancelPickerBtn: { paddingVertical: 6, alignItems: 'center' },
  cancelPickerText: { fontSize: 13, color: C.textMuted },
  yearInput: {
    backgroundColor: C.bg, borderWidth: 1, borderColor: C.border, borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 11, fontSize: 15, color: C.text, width: 120,
  },

  gateCenter: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  usernameGate: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 36,
    gap: 14,
  },
  gateTitle: { fontSize: 18, fontWeight: '700', color: C.text, textAlign: 'center' },
  gateBody: { fontSize: 14, color: C.textMuted, textAlign: 'center', lineHeight: 20 },
  gateBtn: {
    marginTop: 4,
    backgroundColor: C.accent,
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  gateBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },

  errorBox: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 16 },
  errorText: { color: '#F87171', fontSize: 14, flex: 1 },

  submitBtn: {
    marginTop: 28, backgroundColor: C.accent, borderRadius: 12,
    paddingVertical: 15, alignItems: 'center',
  },
  submitBtnDisabled: { backgroundColor: '#CCCCCC' },
  submitBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
