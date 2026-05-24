import useSWR from "swr";
import { Match } from "@/types/football";

const fetcher = async (url: string): Promise<Match[]> => {
  const res = await fetch(url);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
};

export function useFixtures(leagueId: number, date?: string) {
  const today = date ?? new Date().toISOString().slice(0, 10);
  const { data, error, isLoading } = useSWR<Match[]>(
    `/api/fixtures?league=${leagueId}&date=${today}&season=2024`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 300_000, // 5 min
    }
  );

  return {
    fixtures: data || [],
    isLoading,
    isError: error,
  };
}
