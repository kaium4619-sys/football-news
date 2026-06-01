import useSWR from 'swr';
import { Match } from '@/types/football';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  if (Array.isArray(data)) {
    return data;
  }
  return []; // Return empty array on error objects
};

/**
 * Returns recent results strictly via the live API.
 */
export function useResults(count = 5) {
  const { data, error, isLoading } = useSWR<Match[]>(
    `/api/results?count=${count}`,
    fetcher,
    {
      refreshInterval: 60000,
      revalidateOnFocus: true,
    }
  );

  return {
    results: data || [],
    isLoading,
    isError: error,
  };
}
