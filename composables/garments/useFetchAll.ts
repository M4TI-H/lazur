import type Garment from "~/types/Garment";

export function useFetchAllGarments(limit: number) {
  const allGarments = ref<Garment[]>([]);
  const loading = ref<boolean>(false);
  const hasMore = ref<boolean>(true);
  const error = ref<Error | null>(null);
  const page = ref<number>(1);

  //fetch first page SSR
  const fetchFirstPage = async () => {
    loading.value = true;
    try {
      const data = await $fetch<Garment[]>("/api/garments/fetch-all", {
        params: { page: page.value, limit: limit },
      });
      allGarments.value.push(...data);
      page.value += 1;
      hasMore.value = data.length === limit;
    } catch (err: any) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  //fetch all the other on client's side
  const fetchNextPage = async () => {
    if (!hasMore.value || loading.value) return;

    loading.value = true;

    try {
      const newData = await $fetch<Garment[]>("/api/garments/fetch-all", {
        params: { page: page.value, limit: limit },
      });

      allGarments.value.push(...newData);
      page.value += 1;
      if (newData.length < limit) hasMore.value = false;
    } catch (error: any) {
      error.value = error;
    }

    loading.value = false;
  };

  return {
    allGarments,
    loading,
    error,
    hasMore,
    fetchFirstPage,
    fetchNextPage,
  };
}
