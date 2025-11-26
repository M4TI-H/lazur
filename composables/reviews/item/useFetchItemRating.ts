export function useFetchItemRating(id: number) {
  const {
    data: rating,
    pending: ratingLoading,
    error: ratingError,
    refresh: ratingRefresh,
  } = useAsyncData(`${id}-rating`, () =>
    $fetch(`/api/reviews/item/fetch_rating/${id}`)
  );

  return {
    rating,
    ratingLoading,
    ratingError,
    ratingRefresh,
  };
}
