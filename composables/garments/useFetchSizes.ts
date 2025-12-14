export function useFetchSizes() {
  const sizesLoading = ref<boolean>(false);
  const sizesError = ref<Error | null>();
  const sizes = ref<string[]>([]);

  const fetchSizes = async (id: number) => {
    sizesLoading.value = true;

    const { data, error: sizesError } = await fetchData<string[]>(
      `/api/garments/fetch_sizes/${id}`
    );

    sizesLoading.value = false;

    if (sizesError) {
      console.error(sizesError);
      return null;
    }

    sizes.value = data ?? [];
  };

  return { sizes, sizesLoading, sizesError, fetchSizes };
}
