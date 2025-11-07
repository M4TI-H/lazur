export function useFetchItemRating(id: number) {
  const {
    data: rating,
    pending: ratingLoading,
    error: ratingError,
    refresh: ratingRefresh,
  } = useAsyncData<{ avg_rating: number & { review_count: number } }>(
    () => `${id}-rating`,
    () => $fetch(`/api/reviews/item/fetch_rating/${id}`)
  );

  return {
    rating,
    ratingLoading,
    ratingError,
    ratingRefresh,
  };
}
