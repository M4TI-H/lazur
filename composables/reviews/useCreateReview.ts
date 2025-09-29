import type Review from "~/types/Review";

export function useCreateReview() {
  const loading = ref<boolean>(false);
  const error = ref<Error | null>(null);

  const createReview = async (data: Review) => {
    loading.value = true;
    const { error } = await fetchData<Review>("/api/reviews/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        review: data.review,
        quality: data.quality,
        price: data.price,
        satisfaction: data.satisfaction,
        experience: data.experience,
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
