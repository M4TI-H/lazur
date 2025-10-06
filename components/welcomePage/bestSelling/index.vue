<script setup lang="ts">
import type Garment from "~/types/Garment";
import { useFetchAnyTrending } from "~/composables/garments/useFetchAnyTrending";
import { useFetchTrendingCategories } from "~/composables/garments/useFetchTrendingCategories";

const category = ref<string>("any");

const { garments, loading, refresh } = useFetchAnyTrending();
const { catGarments, catLoading, catRefresh } =
  useFetchTrendingCategories(category);

watch(category, async (newVal) => {
  if (newVal === "any") {
    await refresh();
  } else {
    await catRefresh();
  }
});

const displayedGarments = computed<(Garment & { total_ordered: number })[]>(
  () =>
    category.value === "any" ? garments.value ?? [] : catGarments.value ?? []
);

onMounted(async () => {
  if (category.value === "any") await refresh();
  else await catRefresh();
});
</script>

<template>
  <section
    class="w-full h-[44rem] flex flex-col bg-[#F8F9FA] items-center py-4 gap-4"
  >
    <div
      class="relative w-full flex flex-col sm:flex-row items-center justify-between px-6 sm:px-12 gap-2 sm:gap-0"
    >
      <div class="w-full flex flex-col items-start">
        <h2 class="text-primary text-xl md:text-2xl lg:text-3xl font-semibold">
          Trending
        </h2>
        <CategorySelect v-model="category" />
      </div>

      <span class="flex gap-8">
        <button
          class="hidden sm:block size-[2rem] bg-[#445388] text-light rounded-full text-xs hover:cursor-pointer"
        >
          <i class="pi pi-arrow-left"></i>
        </button>

        <button
          class="hidden sm:block size-[2rem] bg-[#445388] text-light rounded-full text-xs hover:cursor-pointer"
        >
          <i class="pi pi-arrow-right"></i>
        </button>
      </span>
    </div>

    <div
      class="w-full flex justify-center gap-8 overflow-x-auto whitespace-nowrap md:px-12"
    >
      <Item v-for="item in displayedGarments" :key="item.id" :itemData="item" />
    </div>
    <i v-if="loading || catLoading" class="pi pi-spinner pi-spin"></i>
  </section>
</template>
