export function useFetchItemRating(id: number) {
  const rating = ref<number>();
  const ratingLoading = ref<boolean>(false);
  const ratingError = ref<string>();

  if (id) {
    const {
      data: rating,
      pending: ratingLoading,
      error: ratingError,
      refresh: ratingRefresh,
    } = useAsyncData<number>(
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

  return {
    rating,
    ratingLoading,
    ratingError,
    ratingRefresh: async () => {},
  };
}
