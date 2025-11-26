export function useFetchReviews() {
  const {
    data: reviews,
    pending: loading,
    error,
    refresh,
  } = useAsyncData("reviews", () => $fetch(`/api/reviews/fetch_recent`));

  return { reviews, loading, error, refresh };
}
