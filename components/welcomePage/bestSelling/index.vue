<script setup lang="ts">
import type Garment from "~/types/Garment";
import { useFetchAnyTrending } from "~/composables/garments/useFetchAnyTrending";
import { useFetchTrendingCategories } from "~/composables/garments/useFetchTrendingCategories";

const category = ref<string>("any");
const firstVisible = ref<number>(0);
let amountVisible = ref<number>(1);
const carouselRef = ref<HTMLElement | null>(null);
const itemWidth = 272; // 16rem = 16 * 16px

const { garments, loading, refresh } = useFetchAnyTrending();
const { catGarments, catLoading, catRefresh } =
  useFetchTrendingCategories(category);

onMounted(async () => {
  if (category.value === "any") await refresh();
  else await catRefresh();
});

watch(category, async (newVal) => {
  firstVisible.value = 0;

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

const calculateAmountVisible = () => {
  nextTick(() => {
    if (carouselRef.value && displayedGarments.value) {
      const carouselWidth = carouselRef.value.clientWidth;
      amountVisible.value = Math.max(1, Math.floor(carouselWidth / itemWidth));
    }
  });
};

const offset = computed(() => -(firstVisible.value * itemWidth));

watch(displayedGarments, (newVal) => {
  nextTick(() => {
    if (carouselRef.value && newVal?.length) {
      const carouselWidth = carouselRef.value.clientWidth;
      const itemWidth = 300; // szerokość jednej recenzji
      amountVisible.value = Math.max(1, Math.floor(carouselWidth / itemWidth));
    }
  });
});

function displayNext() {
  if (!displayedGarments.value) {
    return;
  }

  if (
    firstVisible.value + amountVisible.value <
    displayedGarments.value.length
  ) {
    firstVisible.value++;
  }
}

function displayPrev() {
  if (firstVisible.value > 0) {
    firstVisible.value--;
  }
}

onMounted(() => {
  calculateAmountVisible();
  window.addEventListener("resize", calculateAmountVisible);
});
</script>

<template>
  <section class="w-full py-4 flex flex-col bg-[#F8F9FA] items-center gap-4">
    <div
      class="relative w-full flex flex-col sm:flex-row sm:items-center justify-between px-3 sm:px-12 gap-2 sm:gap-0"
    >
      <div class="flex flex-col items-start">
        <h2 class="text-primary text-xl md:text-2xl lg:text-3xl font-semibold">
          Trending
        </h2>
        <p class="text-sm whitespace-nowrap">Discover most popular items</p>
      </div>

      <CategorySelect v-model="category" />

      <div class="flex gap-8">
        <button
          v-if="firstVisible > 0"
          class="hidden sm:block size-[2rem] bg-[#445388] text-light rounded-full text-xs hover:cursor-pointer"
          @click="displayPrev()"
        >
          <i class="pi pi-arrow-left"></i>
        </button>
        <button
          v-else
          class="hidden sm:block size-[2rem] bg-[#7881a3] text-light rounded-full text-xs hover:cursor-pointer"
        >
          <i class="pi pi-arrow-left"></i>
        </button>

        <button
          v-if="
            firstVisible + amountVisible + 1 < (displayedGarments?.length ?? 0)
          "
          class="hidden sm:block size-[2rem] bg-[#445388] text-light rounded-full text-xs hover:cursor-pointer"
          @click="displayNext()"
        >
          <i class="pi pi-arrow-right"></i>
        </button>
        <button
          v-else
          class="hidden sm:block size-[2rem] bg-[#7881a3] text-light rounded-full text-xs hover:cursor-pointer"
        >
          <i class="pi pi-arrow-right"></i>
        </button>
      </div>
    </div>

    <i v-if="loading || catLoading" class="pi pi-spinner pi-spin"></i>

    <!-- scrollable carousel on mobile -->
    <div
      class="scrollbar-hide w-full flex sm:hidden overflow-x-auto whitespace-nowrap gap-4 px-4"
    >
      <TopItem
        v-for="item in displayedGarments"
        :key="item.id"
        :itemData="item"
      />
    </div>

    <!-- arrow buttons slider on desktop -->
    <div
      ref="carouselRef"
      class="hidden sm:flex w-full items-center justify-between"
    >
      <div
        class="flex gap-4 transition-transform duration-500 ease-in-out px-2 mx-auto"
        :style="{ transform: `translateX(${offset}px)` }"
      >
        <TopItem
          v-for="item in displayedGarments"
          :key="item.id"
          :itemData="item"
        />
      </div>
    </div>
  </section>
</template>
