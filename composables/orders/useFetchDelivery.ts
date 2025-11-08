import type Delivery from "~/types/Delivery";

export function useFetchDelivery() {
  const {
    data: deliveries,
    pending: deliveryLoading,
    error: deliveryError,
    refresh: deliveryRrefresh,
  } = useAsyncData<Delivery[]>("delivery", () =>
    $fetch(`/api/orders/fetch_delivery`)
  );

  return { deliveries, deliveryLoading, deliveryError, deliveryRrefresh };
}
