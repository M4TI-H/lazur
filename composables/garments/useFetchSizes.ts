export function useFetchSizes(id: number) {
  const {
    data: sizes,
    pending: loading,
    error,
    refresh,
  } = useAsyncData(`garment-sizes-${id}`, () =>
    $fetch("/api/garments/fetch_sizes", {
      params: { id },
    })
  );

  return { sizes, loading, error, refresh };
}
