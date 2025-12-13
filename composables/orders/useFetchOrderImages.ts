export function useFetchOrderImages() {
  const imagesLoading = ref<boolean>(false);
  const imagesError = ref<Error | null>(null);
  const orderImages = ref<{ url: string }[]>([]);

  const fetchImages = async (id: number) => {
    imagesLoading.value = true;
    const { data, error: imagesError } = await fetchData<{ url: string }[]>(
      `/api/orders/fetch_order_images/${id}`
    );

    imagesLoading.value = false;

    if (imagesError) {
      console.error(imagesError);
      return null;
    }

    orderImages.value = data ?? [];
  };

  return { orderImages, imagesLoading, imagesError, fetchImages };
}
