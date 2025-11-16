import type Address from "~/types/Address";
import type Garment from "~/types/Garment";
import type Order from "~/types/Order";

export function useCreateGuestOrder() {
  const loading = ref<boolean>(false);
  const error = ref<Error | null>(null);

  const createGuestOrder = async (
    data: Order & { address: Address },
    cart: (Garment & { quantity: number; size: string })[]
  ) => {
    loading.value = true;
    const { data: response, error } = await fetchData<{
      order_id: number;
      address_id: number;
    }>("/api/orders/create_guest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        total: data.total,
        delivery_id: data.delivery_id,
        address: data.address,
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
      return null;
    }

    return response;
  };

  return {
    loading,
    error,
    createGuestOrder,
  };
}
