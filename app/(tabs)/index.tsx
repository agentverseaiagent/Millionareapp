import { FlatList, View, Text, ActivityIndicator, StyleSheet, RefreshControl } from 'react-native';
import { useGlobalFeed } from '../../src/features/posts/hooks';
import { PostCard } from '../../src/components/PostCard';

export default function HomeScreen() {
  const { posts, loading, error, refresh } = useGlobalFeed();

  if (loading && posts.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <PostCard post={item} showModel />}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}
      ListEmptyComponent={
        <View style={styles.center}>
          <Text style={styles.empty}>No posts yet. Be the first to post.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    marginTop: 60,
  },
  error: { color: '#d00', fontSize: 14, textAlign: 'center' },
  empty: { color: '#888', fontSize: 14, textAlign: 'center' },
});
