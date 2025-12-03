export function useFetchAllImages(id: number) {
  const {
    data: images,
    pending: imagesLoading,
    error: imagesError,
    refresh: refreshImages,
  } = useAsyncData(`${id}-images`, () =>
    $fetch(`/api/garments/images/fetch_all/${id}`)
  );
  return { images, imagesLoading, imagesError, refreshImages };
}
