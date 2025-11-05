import type ItemReview from "~/types/ItemReview";

export function useFetchItemReviews() {
  const {
    data: reviews,
    pending: loading,
    error,
    refresh,
  } = useAsyncData<(ItemReview & { name: string })[]>("item-reviews", () =>
    $fetch(`/api/reviews/item/fetch_reviews`)
  );

  return { reviews, loading, error, refresh };
}
