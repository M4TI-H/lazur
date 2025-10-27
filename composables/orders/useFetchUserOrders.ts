import type Order from "~/types/Order";

export function useFetchUserOrders() {
  const {
    data: orders,
    pending: loading,
    error,
    refresh,
  } = useAsyncData<(Order & { item_count: number })[]>("user-orders", () =>
    $fetch("/api/orders/fetch_users_orders")
  );

  return { orders, loading, error, refresh };
}
