import { useState, useEffect } from 'react';

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
}

export function useExperiences(aspectRatio?: "3:4" | "16:9" | "all", limit?: number) {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/experiences');
        
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
        
        // Apply limit if provided
        if (limit && limit > 0) {
          filteredData = filteredData.slice(0, limit);
        }
        
        setExperiences(filteredData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, [aspectRatio, limit]);

  return { experiences, loading, error };
} 