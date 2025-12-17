export function useAddToCart() {
  const cartLoading = ref<boolean>(false);
  const cartError = ref<Error | null>(null);

  const addItemToCart = async (product_id: number, size: string) => {
    cartLoading.value = true;
    const { data, error: cartError } = await fetchData<{ cartItemId: number }>(
      "/api/cart/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: product_id,
          size: size,
        }),
      }
    );

    cartLoading.value = false;

    if (cartError) {
      console.error(cartError);
      return null;
    }

    return data?.cartItemId ?? 0;
  };

  return {
    cartLoading,
    cartError,
    addItemToCart,
  };
}
