export function useFetchSingleGarment(id: number) {
  const {
    data: garment,
    pending: loading,
    error,
    refresh,
  } = useAsyncData(`garment-${id}`, () => $fetch(`/api/garments/fetch/${id}`));

  return { garment, loading, error, refresh };
}
