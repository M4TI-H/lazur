import type Garment from "~/types/Garment";

export function useFetchTrendingCategories(category: Ref<string>) {
  const {
    data: catGarments,
    pending: catLoading,
    error: catError,
    refresh: catRefresh,
  } = useAsyncData<(Garment & { total_ordered: number })[]>(
    () => `trending-${category.value}-garments`,
    () =>
      $fetch("/api/garments/main/fetch_category_trending", {
        params: { category: category.value },
      }),
    { watch: [category] }
  );

  return { catGarments, catLoading, catError, catRefresh };
}
