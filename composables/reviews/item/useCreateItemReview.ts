import type ItemReview from "~/types/ItemReview";

export function useCreateItemReview() {
  const loading = ref<boolean>(false);
  const error = ref<Error | null>(null);

  const createItemReview = async (
    item_id: number,
    review: string,
    rating: number
  ) => {
    loading.value = true;
    const { error } = await fetchData<ItemReview>("/api/reviews/item/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item_id: item_id,
        review: review,
        rating: rating,
      }),
    });

    loading.value = false;

    if (error) {
      console.error(error);
      return "error";
    }
  };

  return {
    loading,
    error,
    createItemReview,
  };
}
