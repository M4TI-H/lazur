import type Order from "~/types/Order";
import type Address from "~/types/Address";

export function useFetchOrder(id: number, token: string, isLoggedIn: boolean) {
  let path = "";
  if (isLoggedIn) {
    path = `/api/orders/fetch/${id}`;
  } else {
    path = `/api/orders/guest/fetch/${id}`;
  }

  const {
    data: order,
    pending: orderLoading,
    error: orderError,
    refresh: orderRefresh,
  } = useAsyncData(`order-${id}`, () =>
    $fetch<Order & { delivery: { name: string } } & { address: Address }>(
      path,
      {
        params: { token },
      }
    )
  );

  return { order, orderLoading, orderError, orderRefresh };
}
