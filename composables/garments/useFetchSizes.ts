import type Garment from "~/types/Garment";

export function useFetchSizes(id: number) {
  const {
    data: sizes,
    pending: loading,
    error,
    refresh,
  } = useAsyncData<Garment>(`garment-sizes-${id}`, () =>
    $fetch("/api/garments/fetch_sizes", {
      params: { id },
    })
  );

  return { sizes, loading, error, refresh };
}
