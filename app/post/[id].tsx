import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function PostScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View>
      <Text>Post: {id}</Text>
    </View>
  );
}
