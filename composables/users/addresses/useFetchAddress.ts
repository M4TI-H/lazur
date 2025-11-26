import type Address from "~/types/Address";

export function useFetchOneAddress() {
  const addressLoading = ref<boolean>(false);
  const addressError = ref<Error | null>(null);
  const address = ref<Address | null>(null);

  const fetchAddress = async (id: number) => {
    addressLoading.value = true;
    const { data, error: addressError } = await fetchData<Address>(
      `/api/accounts/addresses/fetch_one/${id}`
    );

    addressLoading.value = false;

    if (addressError) {
      console.error(addressError);
      return null;
    }

    address.value = data ?? null;
  };

  return { address, fetchAddress, addressLoading, addressError };
}
