import type Review from "~/types/Review";

export function useFetchReviews() {
  const {
    data: reviews,
    pending: loading,
    error,
    refresh,
  } = useAsyncData<Review[]>("reviews", () =>
    $fetch(`/api/reviews/fetch_recent`)
  );

  return { reviews, loading, error, refresh };
}
