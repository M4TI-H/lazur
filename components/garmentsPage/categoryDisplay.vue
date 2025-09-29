<script setup lang="ts">
import { useInfiniteScroll } from "@vueuse/core";
import { useFetchCategory } from "~/composables/garments/useFetchCategory";

const { category } = defineProps<{
  category: string;
}>();

const { garments, loading, hasMore, fetchFirstPage, fetchNextPage, page } =
  useFetchCategory(category, 8);

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
  <p class="text-sm text-secondary">Results: 1 - {{ 8 * page }}</p>

  <div
    ref="listEl"
    class="w-full max-w-[100vw] flex flex-wrap items-start justify-center gap-4 md:gap-8 p-4 md:p-8 mx-auto"
  >
    <i v-if="loading" class="pi pi-spinner pi-spin text-2xl text-black"></i>
    <Item v-for="garment in garments" :key="garment.id" :itemData="garment" />
  </div>
</template>
