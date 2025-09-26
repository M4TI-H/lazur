import type Order from "~/types/Order";

export function useFetchOrder(id: number) {
  const {
    data: order,
    pending: loading,
    error,
    refresh,
  } = useAsyncData<Order>(`order-${id}`, () =>
    $fetch(`/api/orders/fetch/${id}`)
  );

  return { order, loading, error, refresh };
}
