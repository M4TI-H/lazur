import type CartItem from "~/types/CartItem";

export function useFetchCart() {
  const cartLoading = ref<boolean>(false);
  const cartError = ref<Error | null>();
  const cartItems = ref<CartItem[]>([]);

  const fetchCart = async () => {
    cartLoading.value = true;

    const { data, error: cartError } = await fetchData<CartItem[]>(
      `/api/cart/fetch`
    );

    cartLoading.value = false;

    if (cartError) {
      console.error(cartError);
      return null;
    }

    cartItems.value = data ?? [];

    return;
  };

  return { cartItems, cartLoading, cartError, fetchCart };
}
