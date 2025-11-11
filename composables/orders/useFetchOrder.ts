import type Order from "~/types/Order";

export function useFetchOrder(id: number) {
  const {
    data: order,
    pending: orderLoading,
    error: orderError,
    refresh: orderRefresh,
  } = useAsyncData<Order & { delivery: { name: string } }>(`order-${id}`, () =>
    $fetch(`/api/orders/fetch/${id}`)
  );

  return { order, orderLoading, orderError, orderRefresh };
}
