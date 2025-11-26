export function useFetchCategories() {
  const {
    data: categories,
    pending: loading,
    error,
    refresh: refreshCategories,
  } = useAsyncData("category", () => $fetch("/api/garments/fetch_categories"));
  return { categories, loading, error, refreshCategories };
}
