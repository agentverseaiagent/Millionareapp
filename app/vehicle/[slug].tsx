import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function VehicleScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  return (
    <View>
      <Text>Vehicle: {slug}</Text>
    </View>
  );
}
