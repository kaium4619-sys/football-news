import useSWR from 'swr';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
};

/**
 * Hook to fetch verified competitions from the live API.
 * Used in client components (Navbar, Tables page).
 */
export function useCompetitions() {
  const { data, error, isLoading } = useSWR(
    '/api/competitions',
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 3600000, // 1 hour
    }
  );

  return {
    competitions: data || [],
    isLoading,
    isError: error,
  };
}
