import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import type { VehicleSearchResult } from '../features/vehicles/types';

interface Props {
  item: VehicleSearchResult;
  onPress: (item: VehicleSearchResult) => void;
}

export function VehicleModelItem({ item, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress(item)}>
      <Text style={styles.name}>{item.display_name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e5e5',
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 16,
    color: '#111',
  },
});
