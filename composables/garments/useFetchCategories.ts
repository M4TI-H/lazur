export function useFetchCategories() {
  const {
    data: categories,
    pending: loading,
    error,
    refresh,
  } = useAsyncData<string>("categories", () =>
    $fetch("/api/garments/fetch_categories")
  );

  return { categories, loading, error, refresh };
}
