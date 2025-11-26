export function useFetchItemReviews(id: number) {
  const {
    data: reviews,
    pending: loading,
    error,
    refresh,
  } = useAsyncData(`${id}-item-reviews`, () =>
    $fetch(`/api/reviews/item/fetch_reviews/${id}`)
  );

  return { reviews, loading, error, refresh };
}
