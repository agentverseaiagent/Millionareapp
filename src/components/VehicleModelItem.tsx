import { TouchableOpacity, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { VehicleSearchResult } from '../features/vehicles/types';

const C = {
  bg: '#FFFFFF',
  border: '#EBEBEB',
  accent: '#E05A00',
  text: '#111111',
  textMuted: '#777777',
  textFaint: '#AAAAAA',
};

interface FollowState {
  isFollowing: boolean;
  loading: boolean;
  onToggle: () => void;
}

interface Props {
  item: VehicleSearchResult;
  onPress: (item: VehicleSearchResult) => void;
  followState?: FollowState;
}

export function VehicleModelItem({ item, onPress, followState }: Props) {
  if (item.is_make_result) {
    return (
      <View style={[styles.item, styles.makeItem]}>
        {/* Tappable area → expands search to this make */}
        <TouchableOpacity style={styles.makeMainArea} onPress={() => onPress(item)}>
          <Ionicons name="car-outline" size={18} color={C.accent} style={styles.makeIcon} />
          <View style={styles.content}>
            <Text style={styles.makeName}>{item.name}</Text>
            <Text style={styles.makeSub}>View {item.name} posts & models</Text>
          </View>
        </TouchableOpacity>

        {/* Follow/Unfollow button */}
        {followState && (
          <TouchableOpacity
            style={[styles.followBtn, followState.isFollowing && styles.followBtnActive]}
            onPress={followState.onToggle}
            disabled={followState.loading}
          >
            {followState.loading ? (
              <ActivityIndicator size="small" color={followState.isFollowing ? '#fff' : C.accent} />
            ) : (
              <Text style={[styles.followBtnText, followState.isFollowing && styles.followBtnTextActive]}>
                {followState.isFollowing ? 'Following' : 'Follow'}
              </Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress(item)}>
      <View style={styles.content}>
        <Text style={styles.make}>{item.make_name}</Text>
        <View style={styles.nameRow}>
          <Text style={styles.model}>{item.name}</Text>
          {item.is_discontinued && (
            <Text style={styles.discontinued}>Discontinued</Text>
          )}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={16} color={C.textMuted} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    backgroundColor: C.bg,
  },
  makeItem: {
    backgroundColor: '#FFFAF7',
    paddingVertical: 10,
  },
  makeMainArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  makeIcon: {
    marginRight: 12,
  },
  makeName: {
    fontSize: 15,
    fontWeight: '700',
    color: C.accent,
  },
  makeSub: {
    fontSize: 12,
    color: C.textMuted,
    marginTop: 2,
  },
  followBtn: {
    borderWidth: 1,
    borderColor: C.accent,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
    minWidth: 82,
    alignItems: 'center',
    marginLeft: 10,
  },
  followBtnActive: {
    backgroundColor: C.accent,
    borderColor: C.accent,
  },
  followBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: C.accent,
  },
  followBtnTextActive: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  make: {
    fontSize: 11,
    fontWeight: '600',
    color: C.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  model: {
    fontSize: 16,
    color: C.text,
    fontWeight: '500',
  },
  discontinued: {
    fontSize: 11,
    color: C.textFaint,
    fontWeight: '500',
    fontStyle: 'italic',
  },
});
