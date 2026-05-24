import useSWR from 'swr';
import { Match } from '@/types/football';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  if (Array.isArray(data)) {
    return data;
  }
  return []; // Return empty array on error objects like rate limits
};

export function useLiveMatches() {
  const { data, error, isLoading, mutate } = useSWR<Match[]>(
    '/api/matches/live',
    fetcher,
    {
      refreshInterval: 15000, // Refresh every 15 seconds as per requirements
      revalidateOnFocus: true,
    }
  );

  return {
    matches: data || [],
    isLoading,
    isError: error,
    mutate
  };
}
