<script setup lang="ts">
import { useFetchSearchedGarments } from "~/composables/garments/useFetchSearched";
import { useInfiniteScroll } from "@vueuse/core";

const sortStore = useSortStore();
sortStore.loadFromStorage();

const { search } = defineProps<{
  search: string;
}>();

const {
  searchedGarments,
  loading,
  hasMore,
  fetchFirstPage,
  fetchNextPage,
  page,
} = useFetchSearchedGarments(8);

const listEl = ref<HTMLElement | null>(null);

await fetchFirstPage(sortStore.option, sortStore.ascending, search);

useInfiniteScroll(
  window,
  () => {
    if (!loading.value && hasMore.value)
      fetchNextPage(sortStore.option, sortStore.ascending, search);
  },
  { distance: 300 }
);

watch(
  () => [sortStore.option, sortStore.ascending],
  async () => {
    searchedGarments.value = [];
    page.value = 1;
    hasMore.value = true;
    await fetchFirstPage(sortStore.option, sortStore.ascending, search);
  }
);
</script>

<template>
  <section class="w-full flex flex-col">
    <p class="w-full text-center text-secondary">
      {{ searchedGarments.length }} results for "{{ search }}"
    </p>

    <div
      ref="listEl"
      class="w-full max-w-[100vw] flex flex-wrap items-start justify-center gap-4 md:gap-8 p-4 md:p-8 mx-auto"
    >
      <i v-if="loading" class="pi pi-spinner pi-spin text-2xl text-black"></i>
      <Item
        v-for="garment in searchedGarments"
        :key="garment.id"
        :itemData="garment"
      />
    </div>
  </section>
</template>
