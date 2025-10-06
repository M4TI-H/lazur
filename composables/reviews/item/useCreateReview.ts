import type ItemReview from "~/types/ItemReview";

export function useCreateReview() {
  const loading = ref<boolean>(false);
  const error = ref<Error | null>(null);

  const createReview = async (data: ItemReview) => {
    loading.value = true;
    const { error } = await fetchData<ItemReview>("/api/reviews/item/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item_id: data.item_id,
        name: data.name,
        review: data.review,
        rating: data.rating,
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
    createReview,
  };
}
