import useSWR from 'swr';
import { Standing } from '@/types/football';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  if (Array.isArray(data) && data.length > 0 && data[0].league?.standings?.[0]) {
    return data[0].league.standings[0];
  }
  return [];
};

export function useStandings(leagueId: number = 39) {
  const { data, error, isLoading } = useSWR<Standing[]>(
    `/api/standings?league=${leagueId}`,
    fetcher
  );

  return {
    standings: data || [],
    isLoading,
    isError: error
  };
}
