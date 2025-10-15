import type Garment from "~/types/Garment";

export function useFetchSearchedGarments(limit: number) {
  const searchedGarments = ref<Garment[]>([]);
  const loading = ref<boolean>(false);
  const hasMore = ref<boolean>(true);
  const error = ref<Error | null>(null);
  const page = ref<number>(1);

  //fetch first page SSR
  const fetchFirstPage = async (
    option: string,
    ascending: boolean,
    search: string
  ) => {
    loading.value = true;
    try {
      const data = await $fetch<Garment[]>("/api/garments/fetch_searched", {
        params: {
          page: page.value,
          limit: limit,
          option: option,
          ascending: ascending,
          search: search,
        },
      });
      searchedGarments.value.push(...data);
      page.value += 1;
      hasMore.value = data.length === limit;
    } catch (err: any) {
      error.value = err;
    }

    loading.value = false;
  };

  //fetch all the other on client's side
  const fetchNextPage = async (
    option: string,
    ascending: boolean,
    search: string
  ) => {
    if (!hasMore.value || loading.value) return;

    loading.value = true;

    try {
      const newData = await $fetch<Garment[]>("/api/garments/fetch_searched", {
        params: {
          page: page.value,
          limit: limit,
          sort: option,
          ascending: ascending,
          search: search,
        },
      });

      searchedGarments.value.push(...newData);
      page.value += 1;
      if (newData.length < limit) hasMore.value = false;
    } catch (error: any) {
      error.value = error;
    }

    loading.value = false;
  };

  return {
    searchedGarments,
    loading,
    error,
    hasMore,
    fetchFirstPage,
    fetchNextPage,
    page,
  };
}
