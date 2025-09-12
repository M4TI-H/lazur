import type Garment from "~/types/Garment";

export function useFetchSingleGarment(id: number) {
  const {
    data: garment,
    pending: loading,
    error,
    refresh,
  } = useAsyncData<Garment>(`garment-${id}`, () =>
    $fetch(`/api/garments/fetch/${id}`)
  );

  return { garment, loading, error, refresh };
}
