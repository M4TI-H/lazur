import type Garment from "~/types/Garment";

export function useFetchSingleGarment(id: number) {
  const {
    data: garment,
    pending: loading,
    error,
    refresh,
  } = useFetch<Garment>(`/api/garments/fetch/${id}`, {
    lazy: true,
    key: `garment-${id}`,
  });

  return { garment, loading, error, refresh };
}
