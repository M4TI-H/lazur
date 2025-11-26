export function useFetchDelivery() {
  const {
    data: deliveries,
    pending: deliveryLoading,
    error: deliveryError,
    refresh: deliveryRefresh,
  } = useAsyncData("delivery", () => $fetch(`/api/orders/fetch_delivery`));

  return { deliveries, deliveryLoading, deliveryError, deliveryRefresh };
}
