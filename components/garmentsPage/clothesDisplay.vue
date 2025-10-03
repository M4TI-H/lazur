<script setup lang="ts">
import { useFetchAllGarments } from "~/composables/garments/useFetchAll";
import { useInfiniteScroll } from "@vueuse/core";

const sortStore = useSortStore();
sortStore.loadFromStorage();

const { allGarments, loading, hasMore, fetchFirstPage, fetchNextPage, page } =
  useFetchAllGarments(8);

const listEl = ref<HTMLElement | null>(null);

await fetchFirstPage(sortStore.option, sortStore.ascending);

useInfiniteScroll(
  window,
  () => {
    if (!loading.value && hasMore.value)
      fetchNextPage(sortStore.option, sortStore.ascending);
  },
  { distance: 300 }
);

watch(
  () => [sortStore.option, sortStore.ascending],
  async () => {
    allGarments.value = [];
    page.value = 1;
    hasMore.value = true;
    await fetchFirstPage(sortStore.option, sortStore.ascending);
  }
);
</script>

<template>
  <div
    ref="listEl"
    class="w-full max-w-[100vw] flex flex-wrap items-start justify-center gap-4 md:gap-8 p-4 md:p-8 mx-auto"
  >
    <i v-if="loading" class="pi pi-spinner pi-spin text-2xl text-black"></i>
    <Item
      v-for="garment in allGarments"
      :key="garment.id"
      :itemData="garment"
    />
  </div>
</template>
