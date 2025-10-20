<script setup lang="ts">
import { useFetchTrendingCategories } from "~/composables/garments/useFetchTrendingCategories";

const category = ref<string>("any");
const firstVisible = ref<number>(0);
let amountVisible = ref<number>(1);
const carouselRef = ref<HTMLElement | null>(null);
const itemWidth = ref<number>(0);

const { garments, loading, refresh } = useFetchTrendingCategories(category);

onMounted(async () => {
  await refresh();
});

watch(category, async (newVal) => {
  firstVisible.value = 0;
  await refresh();
});

function updateItemWidth() {
  if (window.innerWidth >= 1024) itemWidth.value = 336; // lg:w-[20rem]
  else if (window.innerWidth >= 640) itemWidth.value = 272; // sm:w-[16rem]
  else itemWidth.value = 228; // w-[14rem]
}

const calculateAmountVisible = () => {
  nextTick(() => {
    if (carouselRef.value && garments.value) {
      const carouselWidth = carouselRef.value.clientWidth - 16;
      amountVisible.value = Math.max(
        1,
        Math.floor(carouselWidth / itemWidth.value)
      );
    }
  });
};

const offset = computed(() => -(firstVisible.value * itemWidth.value));

watch(garments, (newVal) => {
  nextTick(() => {
    if (carouselRef.value && garments.value) {
      const carouselWidth = carouselRef.value.clientWidth - 16;
      amountVisible.value = Math.max(
        1,
        Math.floor(carouselWidth / itemWidth.value)
      );
    }
  });
});

function displayNext() {
  if (!garments.value) {
    return;
  }

  if (firstVisible.value + amountVisible.value < garments.value.length) {
    firstVisible.value++;
  }
}

function displayPrev() {
  if (firstVisible.value > 0) {
    firstVisible.value--;
  }
}

onMounted(() => {
  updateItemWidth();
  calculateAmountVisible();
  window.addEventListener("resize", () => {
    updateItemWidth();
    calculateAmountVisible();
  });
});
</script>

<template>
  <section
    class="relative w-full h-[42rem] md:h-[56rem] flex flex-col bg-[#F8F9FA]"
  >
    <img
      class="w-full h-full object-cover z-10"
      src="https://images.unsplash.com/photo-1696392322523-37379e6808ca?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    />
    <div
      class="absolute bg-[#1F1D20]/70 w-full h-full z-20 gap-8 flex flex-col items-center pt-16"
    >
      <div
        class="relative w-full flex flex-col sm:items-center justify-between px-3 md:px-6 lg:px-12 gap-4"
      >
        <div
          class="flex flex-col max-w-[24rem] md:max-w-[32rem] sm:items-center gap-4 self-center"
        >
          <h2 class="text-light text-2xl md:text-3xl font-semibold">
            Trending
          </h2>
          <p class="text-light text-sm sm:text-md md:text-lg sm:text-center">
            Discover the most popular pieces that define the season's style.
            <br class="hidden lg:block" />
            Handpicked favorites loved by our customers.
          </p>
        </div>

        <div class="w-full flex justify-center items-center gap-2">
          <button
            v-if="firstVisible > 0"
            class="hidden md:flex size-[2rem] lg:h-[2rem] lg:w-[6rem] items-center justify-center gap-2 bg-[#445388] text-light rounded-full text-sm hover:cursor-pointer hover:bg-[#212842] active:bg-[#212842] transition-colors ease-in-out duration-250"
            @click="displayPrev()"
          >
            <i class="pi pi-arrow-left text-xs"></i>
            <span class="hidden lg:block">Previous</span>
          </button>
          <button
            v-else
            class="hidden md:flex size-[2rem] lg:h-[2rem] lg:w-[6rem] items-center justify-center gap-2 bg-[#7881a3] text-light rounded-full text-sm"
          >
            <i class="pi pi-arrow-left text-xs"></i>
            <span class="hidden lg:block">Previous</span>
          </button>

          <CategorySelect v-model="category" />

          <button
            v-if="firstVisible + amountVisible + 1 < (garments?.length ?? 0)"
            class="hidden md:flex size-[2rem] lg:h-[2rem] lg:w-[6rem] items-center justify-center gap-2 bg-[#445388] text-light rounded-full text-sm hover:cursor-pointer hover:bg-[#212842] active:bg-[#212842] transition-colors ease-in-out duration-250"
            @click="displayNext()"
          >
            <span class="hidden lg:block">Next</span>
            <i class="pi pi-arrow-right text-xs"></i>
          </button>
          <button
            v-else
            class="hidden md:flex size-[2rem] lg:h-[2rem] lg:w-[6rem] items-center justify-center gap-2 bg-[#7881a3] text-light rounded-full text-sm"
          >
            <span class="hidden lg:block">Next</span>
            <i class="pi pi-arrow-right text-xs"></i>
          </button>
        </div>
      </div>

      <!-- scrollable carousel on mobile -->
      <div
        class="scrollbar-hide w-full flex md:hidden overflow-x-auto whitespace-nowrap gap-4 px-4"
      >
        <i v-if="loading" class="pi pi-spinner pi-spin text-light"></i>
        <TopItem
          v-else
          v-for="item in garments"
          :key="item.id"
          :itemData="item"
        />
        <p
          class="text-light text-sm font-semibold"
          v-if="!loading && garments?.length === 0"
        >
          There are no items in this category
        </p>
      </div>

      <!-- arrow buttons slider on desktop -->
      <div
        ref="carouselRef"
        class="hidden md:flex items-center justify-start overflow-hidden w-full md:max-w-[50rem] lg:max-w-[105rem] mx-auto"
      >
        <div
          class="flex gap-4 transition-transform duration-500 ease-in-out px-2"
          :style="{ transform: `translateX(${offset}px)` }"
        >
          <i v-if="loading" class="pi pi-spinner pi-spin text-light"></i>
          <TopItem
            v-else
            v-for="item in garments"
            :key="item.id"
            :itemData="item"
          />
        </div>
      </div>
      <p
        class="text-light text-sm font-semibold"
        v-if="!loading && garments?.length === 0"
      >
        There are no items in this category.
      </p>
    </div>
  </section>
</template>
