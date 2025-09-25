import type Order from "~/types/Order";

export function useCreateOrder() {
  const loading = ref<boolean>(false);
  const error = ref<Error | null>(null);

  const createOrder = async (data: Order) => {
    loading.value = true;
    const { error } = await fetchData<Order>("/api/orders/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        surname: data.surname,
        address: data.address,
        email: data.email,
        phone: data.phone,
        delivery: data.delivery,
        total: data.total,
      }),
    });

    if (error) console.error(error);

    loading.value = false;
  };

  return {
    loading,
    error,
    createOrder,
  };
}
