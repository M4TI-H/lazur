import type Address from "~/types/Address";

export function useFetchOneAddress(id: number) {
  const {
    data: address,
    pending: addressLoading,
    error: addressError,
    refresh: addressRefresh,
  } = useAsyncData<Address>(`address-${id}`, () =>
    $fetch(`/api/accounts/fetch_one_address/${id}`)
  );

  return { address, addressLoading, addressError, addressRefresh };
}
