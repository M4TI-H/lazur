export function useFetchCoverImage(id: number) {
  const {
    data: cover,
    pending: coverLoading,
    error: coverError,
    refresh: refreshCover,
  } = useAsyncData(`${id}-cover-image`, () =>
    $fetch(`/api/garments/images/fetch_cover/${id}`)
  );
  return { cover, coverLoading, coverError, refreshCover };
}
