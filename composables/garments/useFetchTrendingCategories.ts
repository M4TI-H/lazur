import type Garment from "~/types/Garment";

export function useFetchTrendingCategories(category: Ref<string>) {
  const {
    data: garments,
    pending: loading,
    error: error,
    refresh: refresh,
  } = useAsyncData<(Garment & { total_ordered: number })[]>(
    () => `trending-${category.value}-garments`,
    () =>
      $fetch("/api/garments/main/fetch_category_trending", {
        params: { category: category.value },
      }),
    { watch: [category] }
  );

  return { garments, loading, error, refresh };
}
