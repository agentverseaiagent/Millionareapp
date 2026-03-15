import { Image, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  avatarUrl: string | null | undefined;
  size?: number;
}

export function UserAvatar({ avatarUrl, size = 36 }: Props) {
  const radius = size / 2;

  if (avatarUrl) {
    return (
      <Image
        source={{ uri: avatarUrl }}
        style={{ width: size, height: size, borderRadius: radius }}
      />
    );
  }

  return (
    <View style={[styles.placeholder, { width: size, height: size, borderRadius: radius }]}>
      <Ionicons name="person" size={size * 0.5} color="#AAAAAA" />
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
});
