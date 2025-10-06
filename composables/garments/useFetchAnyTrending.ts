import type Garment from "~/types/Garment";

export function useFetchAnyTrending() {
  const {
    data: garments,
    pending: loading,
    error,
    refresh,
  } = useAsyncData<(Garment & { total_ordered: number })[]>(
    "trending-garments",
    () => $fetch("/api/garments/main/fetch_any_trending")
  );

  return { garments, loading, error, refresh };
}
