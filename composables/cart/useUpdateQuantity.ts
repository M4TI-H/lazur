export function useUpdateQuantity() {
  const cartLoading = ref<boolean>(false);
  const cartError = ref<Error | null>(null);

  const updateQuantity = async (id: number, delta: number) => {
    cartLoading.value = true;
    const { error: cartError } = await fetchData(`/api/cart/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ delta }),
    });

    cartLoading.value = false;

    if (cartError) {
      console.error(cartError);
      return;
    }
  };

  return { cartLoading, cartError, updateQuantity };
}
