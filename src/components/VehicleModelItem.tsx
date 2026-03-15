import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
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

interface Props {
  item: VehicleSearchResult;
  onPress: (item: VehicleSearchResult) => void;
}

export function VehicleModelItem({ item, onPress }: Props) {
  if (item.is_make_result) {
    return (
      <TouchableOpacity style={[styles.item, styles.makeItem]} onPress={() => onPress(item)}>
        <Ionicons name="car-outline" size={18} color={C.accent} style={styles.makeIcon} />
        <View style={styles.content}>
          <Text style={styles.makeName}>{item.name}</Text>
          <Text style={styles.makeSub}>Browse all {item.name} models</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color={C.textMuted} />
      </TouchableOpacity>
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
  },
  makeIcon: {
    marginRight: 12,
  },
  makeName: {
    fontSize: 16,
    fontWeight: '700',
    color: C.accent,
  },
  makeSub: {
    fontSize: 12,
    color: C.textMuted,
    marginTop: 2,
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
