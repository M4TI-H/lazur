import type Address from "~/types/Address";

export function useFetchGuestAddress(id: number) {
  const {
    data: address,
    pending: addressLoading,
    error: addressError,
    refresh: addressRefresh,
  } = useAsyncData<Address>(`guest-address-${id}`, () =>
    $fetch(`/api/orders/guest/fetch_address/${id}`)
  );

  return { address, addressLoading, addressError, addressRefresh };
}
