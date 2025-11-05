import type Address from "~/types/Address";

export function useDeleteAddress() {
  const loading = ref<boolean>(false);
  const error = ref<Error | null>(null);

  const deleteAddress = async (id: number) => {
    loading.value = true;
    const { error } = await fetchData<Address>(`/api/accounts/delete/${id}`, {
      method: "DELETE",
    });

    loading.value = false;

    if (error) {
      console.error(error);
      return "error";
    }
  };

  return { loading, error, deleteAddress };
}
