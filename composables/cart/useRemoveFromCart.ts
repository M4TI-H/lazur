export function useRemoveFromCart() {
  const cartLoading = ref<boolean>(false);
  const cartError = ref<Error | null>(null);

  const removeFromCart = async (id: number) => {
    cartLoading.value = true;
    const { error: cartError } = await fetchData(`/api/cart/remove/${id}`, {
      method: "DELETE",
    });

    cartLoading.value = false;

    if (cartError) {
      console.error(cartError);
      return;
    }
  };

  return { cartLoading, cartError, removeFromCart };
}
