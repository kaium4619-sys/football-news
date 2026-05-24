import useSWR from "swr";
import { Match } from "@/types/football";

const fetcher = async (url: string): Promise<Match[]> => {
  const res = await fetch(url);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
};

export function useResults(count = 5) {
  const { data, error, isLoading } = useSWR<Match[]>(
    `/api/results?count=${count}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60_000, // 1 min — results don't change fast
    }
  );

  return {
    results: data || [],
    isLoading,
    isError: error,
  };
}
