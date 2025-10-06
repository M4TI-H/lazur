import type Garment from "~/types/Garment";

export function useFetchCategory(category: string, limit: number) {
  const garments = ref<Garment[]>([]);
  const loading = ref<boolean>(false);
  const hasMore = ref<boolean>(true);
  const error = ref<Error | null>(null);
  const page = ref<number>(1);

  //fetch first page SSR
  const fetchFirstPage = async (option: string, ascending: boolean) => {
    loading.value = true;
    try {
      const data = await $fetch<Garment[]>(
        `/api/garments/fetch-category/${category}`,
        {
          params: {
            page: page.value,
            limit: limit,
            option: option,
            ascending: ascending,
          },
        }
      );
      garments.value.push(...data);
      page.value += 1;
      hasMore.value = data.length === limit;
    } catch (err: any) {
      error.value = err;
    }

    loading.value = false;
  };

  //fetch all the other on client's side
  const fetchNextPage = async (option: string, ascending: boolean) => {
    if (!hasMore.value || loading.value) return;

    loading.value = true;

    try {
      const newData = await $fetch<Garment[]>(
        `/api/garments/fetch-category/${category}`,
        {
          params: {
            page: page.value,
            limit: limit,
            sort: option,
            ascending: ascending,
          },
        }
      );

      garments.value.push(...newData);
      page.value += 1;
      if (newData.length < limit) hasMore.value = false;
    } catch (error: any) {
      error.value = error;
    }

    loading.value = false;
  };

  return {
    garments,
    loading,
    error,
    hasMore,
    fetchFirstPage,
    fetchNextPage,
    page,
  };
}
