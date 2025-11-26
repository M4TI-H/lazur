export function useFetchUserOrders() {
  const {
    data: orders,
    pending: loading,
    error,
    refresh,
  } = useAsyncData("user-orders", () =>
    $fetch("/api/orders/fetch_users_orders")
  );

  return { orders, loading, error, refresh };
}
