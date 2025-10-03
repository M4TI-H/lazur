<script setup lang="ts">
import { useFetchAllGarments } from "~/composables/garments/useFetchAll";
import { useInfiniteScroll } from "@vueuse/core";

const { allGarments, loading, hasMore, fetchFirstPage, fetchNextPage, page } =
  useFetchAllGarments(8);
const listEl = ref<HTMLElement | null>(null);

await fetchFirstPage();

useInfiniteScroll(
  window,
  () => {
    if (!loading.value && hasMore.value) fetchNextPage();
  },
  { distance: 300 }
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
