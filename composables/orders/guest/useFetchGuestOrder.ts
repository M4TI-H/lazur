import type Address from "~/types/Address";
import type Order from "~/types/Order";

export function useFetchGuestOrder(id: number, token: string) {
  const {
    data: order,
    pending: orderLoading,
    error: orderError,
    refresh: orderRefresh,
  } = useAsyncData<
    Order & { delivery: { name: string } } & { address: Address }
  >(`guest-order-${id}`, () =>
    $fetch(`/api/orders/guest/fetch/${id}`, {
      params: { token },
    })
  );

  return { order, orderLoading, orderError, orderRefresh };
}
