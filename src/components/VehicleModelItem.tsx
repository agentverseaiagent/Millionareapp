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
