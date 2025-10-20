<script setup lang="ts">
import { useInfiniteScroll } from "@vueuse/core";
import { useFetchCategory } from "~/composables/garments/useFetchCategory";

const sortStore = useSortStore();
sortStore.loadFromStorage();

const { category, gender } = defineProps<{
  category: string;
  gender: string;
}>();

const { garments, loading, hasMore, fetchFirstPage, fetchNextPage, page } =
  useFetchCategory(category, 8);

const listEl = ref<HTMLElement | null>(null);

await fetchFirstPage(sortStore.option, sortStore.ascending, gender);

useInfiniteScroll(
  window,
  () => {
    if (!loading.value && hasMore.value)
      fetchNextPage(sortStore.option, sortStore.ascending, gender);
  },
  { distance: 300 }
);

watch(
  () => [sortStore.option, sortStore.ascending],
  async () => {
    garments.value = [];
    page.value = 1;
    hasMore.value = true;
    await fetchFirstPage(sortStore.option, sortStore.ascending, gender);
  }
);
</script>

<template>
  <div
    ref="listEl"
    class="w-full max-w-[100vw] flex flex-wrap items-start justify-center gap-4 md:gap-8 px-4 md:px-8 mx-auto"
  >
    <i v-if="loading" class="pi pi-spinner pi-spin text-2xl text-black"></i>
    <Item
      v-for="garment in garments"
      :key="garment.id"
      :itemData="garment"
      :gender="gender"
    />
  </div>
</template>
