import { useState, useEffect, useCallback, useRef } from 'react';

interface Experience {
  _id: string;
  username: string;
  userAvatar: string;
  image: string;
  title: string;
  merchant: string;
  likes: number;
  aspectRatio: "3:4" | "16:9";
  hashtags?: string[];
  createdAt: Date;
}

export function useExperiences(aspectRatio?: "3:4" | "16:9" | "all", initialLimit: number = 10) {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  // Function to fetch experiences with the given cursor
  const fetchExperiences = useCallback(async (cursor: string | null = null) => {
    try {
      setLoading(true);
      
      let url = `/api/experiences?limit=${initialLimit}`;
      if (cursor) {
        url += `&cursor=${cursor}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch experiences');
      }
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch experiences');
      }
      
      // Filter by aspect ratio if specified
      let filteredData = result.data;
      if (aspectRatio && aspectRatio !== 'all') {
        filteredData = result.data.filter((exp: Experience) => exp.aspectRatio === aspectRatio);
      }
      
      // Update state based on whether this is the initial load or a "load more" action
      setExperiences(prevExperiences => 
        cursor ? [...prevExperiences, ...filteredData] : filteredData
      );
      
      setHasMore(result.hasMore);
      setNextCursor(result.nextCursor);
      setInitialLoadDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [aspectRatio, initialLimit]);

  // Initial load
  useEffect(() => {
    setExperiences([]);
    setNextCursor(null);
    setHasMore(true);
    fetchExperiences(null);
  }, [fetchExperiences]);

  // Function to load more experiences
  const loadMore = useCallback(() => {
    if (!loading && hasMore && nextCursor) {
      fetchExperiences(nextCursor);
    }
  }, [loading, hasMore, nextCursor, fetchExperiences]);

  return { 
    experiences, 
    loading, 
    error, 
    hasMore, 
    loadMore,
    initialLoadDone
  };
} 