import type Address from "~/types/Address";

export function useFetchUserAddresses() {
  const {
    data: addresses,
    pending: addressesLoading,
    error: addressesError,
    refresh: addressesRefresh,
  } = useAsyncData<Address[]>("user-addresses", () =>
    $fetch("/api/accounts/fetch_users_addresses")
  );

  return { addresses, addressesLoading, addressesError, addressesRefresh };
}
