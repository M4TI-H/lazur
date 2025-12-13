export function useFetchTrendingCategories(category: Ref<string>) {
  const {
    data: garments,
    pending: loading,
    error: error,
    refresh: refresh,
  } = useAsyncData(
    () => `trending-${category.value}-garments`,
    () => $fetch(`api/garments/fetch_category_trending/${category.value}`),
    { watch: [category] }
  );

  return { garments, loading, error, refresh };
}
