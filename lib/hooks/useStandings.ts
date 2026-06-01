import useSWR from 'swr';
import { Standing } from '@/types/football';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useStandings(leagueId: number = 39, season: number = 2024) {
  const { data, error, isLoading } = useSWR(
    `/api/standings?league=${leagueId}&season=${season}`,
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 60000 }
  );

  let standings: Standing[] = [];
  if (data && data[0]?.league?.standings?.[0]) {
    // This matches the format we wrapped it in the API route
    standings = data[0].league.standings[0];
  } else if (Array.isArray(data)) {
    // If it's already a flat array of Standings (e.g., from some mock routes)
    standings = data;
  }

  return {
    standings,
    isLoading,
    isError: error,
  };
}
