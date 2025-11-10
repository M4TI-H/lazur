import type Address from "~/types/Address";

export function useCreateAddress() {
  const loading = ref<boolean>(false);
  const error = ref<Error | null>(null);

  const createAddress = async (addressData: Address) => {
    loading.value = true;
    const { data, error } = await fetchData<{ address_id: number }>(
      "/api/accounts/create_address",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country: addressData.country,
          city: addressData.city,
          postal_code: addressData.postal_code,
          street: addressData.street,
          building_num: addressData.building_num,
          flat_num: addressData.flat_num,
        }),
      }
    );

    loading.value = false;

    if (error) {
      console.error(error);
      return null;
    }

    return data?.address_id ?? null;
  };

  return {
    loading,
    error,
    createAddress,
  };
}
