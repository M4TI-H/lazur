import type Delivery from "~/types/Delivery";

export function useFetchDelivery() {
  const {
    data: deliveries,
    pending: delivery_loading,
    error,
    refresh: delivery_refresh,
  } = useAsyncData<Delivery[]>("delivery", () =>
    $fetch(`/api/orders/fetch_delivery`)
  );

  return { deliveries, delivery_loading, error, delivery_refresh };
}
