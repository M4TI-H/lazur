import type Garment from "~/types/Garment";
import type Order from "~/types/Order";

export function useCreateOrder() {
  const loading = ref<boolean>(false);
  const error = ref<Error | null>(null);

  const createOrder = async (
    data: Order,
    cart: (Garment & { quantity: number; size: string })[]
  ) => {
    loading.value = true;
    const { data: response, error } = await fetchData<{
      order_id: number;
      order_token: number;
    }>("/api/orders/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        items: cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          size: item.size,
          price_at_order: item.price,
        })),
      }),
    });

    loading.value = false;

    if (error) {
      console.error(error);
      return;
    }

    return response;
  };

  return {
    loading,
    error,
    createOrder,
  };
}
