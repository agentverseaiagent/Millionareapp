import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <Ionicons name="notifications-outline" size={52} color="#CCCCCC" />
      <Text style={styles.title}>Notifications coming soon</Text>
      <Text style={styles.body}>
        You'll get alerts here when people interact with your posts.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    gap: 14,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111111',
    textAlign: 'center',
  },
  body: {
    fontSize: 14,
    color: '#777777',
    textAlign: 'center',
    lineHeight: 21,
  },
});
