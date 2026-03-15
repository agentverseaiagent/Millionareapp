import { useState, useEffect, useCallback, useRef } from 'react';
import { getGlobalFeed, getFollowingFeed, getMakeFeed, getModelFeed } from './api';
import type { Post } from './types';

const PAGE_SIZE = 20;

export function useGlobalFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const offsetRef = useRef(0);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    offsetRef.current = 0;
    try {
      const data = await getGlobalFeed(PAGE_SIZE, 0);
      setPosts(data);
      setHasMore(data.length === PAGE_SIZE);
      offsetRef.current = data.length;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const data = await getGlobalFeed(PAGE_SIZE, offsetRef.current);
      setPosts(prev => {
        const seen = new Set(prev.map(p => p.id));
        return [...prev, ...data.filter(p => !seen.has(p.id))];
      });
      setHasMore(data.length === PAGE_SIZE);
      offsetRef.current += data.length;
    } catch {
      // ignore — user can pull-to-refresh
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore]);

  useEffect(() => { refresh(); }, [refresh]);

  return { posts, loading, loadingMore, hasMore, error, refresh, loadMore };
}

export function useFollowingFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const offsetRef = useRef(0);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    offsetRef.current = 0;
    try {
      const data = await getFollowingFeed(PAGE_SIZE, 0);
      setPosts(data);
      setHasMore(data.length === PAGE_SIZE);
      offsetRef.current = data.length;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const data = await getFollowingFeed(PAGE_SIZE, offsetRef.current);
      setPosts(prev => {
        const seen = new Set(prev.map(p => p.id));
        return [...prev, ...data.filter(p => !seen.has(p.id))];
      });
      setHasMore(data.length === PAGE_SIZE);
      offsetRef.current += data.length;
    } catch {
      // ignore — user can pull-to-refresh
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore]);

  useEffect(() => { refresh(); }, [refresh]);

  return { posts, loading, loadingMore, hasMore, error, refresh, loadMore };
}

export function useMakeFeed(vehicleMakeId: string | null) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!vehicleMakeId) {
      setPosts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      setPosts(await getMakeFeed(vehicleMakeId));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [vehicleMakeId]);

  useEffect(() => { refresh(); }, [refresh]);

  return { posts, loading, error, refresh };
}

export function useModelFeed(vehicleModelId: string | null) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!vehicleModelId) {
      setPosts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      setPosts(await getModelFeed(vehicleModelId));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [vehicleModelId]);

  useEffect(() => { refresh(); }, [refresh]);

  return { posts, loading, error, refresh };
}
