export function useFetchUserAddresses() {
  const {
    data: addresses,
    pending: addressesLoading,
    error: addressesError,
    refresh: addressesRefresh,
  } = useAsyncData("user-addresses", () =>
    $fetch("/api/accounts/addresses/fetch_users_addresses")
  );

  return { addresses, addressesLoading, addressesError, addressesRefresh };
}
