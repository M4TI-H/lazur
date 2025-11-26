export function useFetchGuestOrder(id: number, token: string) {
  const {
    data: order,
    pending: orderLoading,
    error: orderError,
    refresh: orderRefresh,
  } = useAsyncData(`guest-order-${id}`, () =>
    $fetch(`/api/orders/guest/fetch/${id}`, {
      params: { token },
    })
  );

  return { order, orderLoading, orderError, orderRefresh };
}
