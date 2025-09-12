import type Garment from "~/types/Garment";

export function useFetchCategory(category: string) {
  const {
    data: garments,
    pending: loading,
    error,
    refresh,
  } = useAsyncData<Garment[]>(`garments-${category}`, () =>
    $fetch(`/api/garments/fetch-category/${category}`)
  );

  return { garments, loading, error, refresh };
}
