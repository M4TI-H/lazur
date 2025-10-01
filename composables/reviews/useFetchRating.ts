import type Review from "~/types/Review";

export function useFetchRating(rating: Ref<number>) {
  const {
    data: ratingReviews,
    pending: ratingLoading,
    error: ratingError,
    refresh: ratingRefresh,
  } = useAsyncData<Review[]>(
    () => `${rating}-star-reviews`,
    () =>
      $fetch(`/api/reviews/fetch_rating`, {
        params: { rating: rating.value },
      }),
    { watch: [rating] }
  );

  return { ratingReviews, ratingLoading, ratingError, ratingRefresh };
}
