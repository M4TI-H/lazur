<script setup lang="ts">
import { useFetchRating } from "~/composables/reviews/useFetchRating";
import { useFetchReviews } from "~/composables/reviews/useFetchReviews";

const selected = ref<number>(0);

const { reviews, loading, refresh } = useFetchReviews();
const { ratingReviews, ratingLoading, ratingRefresh } =
  useFetchRating(selected);

onMounted(async () => {
  if (selected.value === 0) await refresh();
  else await ratingRefresh();
});

watch(selected, async (newVal) => {
  firstVisible.value = 0;

  if (newVal === 0) {
    await refresh();
  } else {
    await ratingRefresh();
  }
});

const displayedReviews = computed(() =>
  selected.value === 0 ? reviews.value : ratingReviews.value
);

const firstVisible = ref<number>(0);
let amountVisible = ref<number>(1);
const carouselRef = ref<HTMLElement | null>(null);

const calculateAmountVisible = () => {
  nextTick(() => {
    if (carouselRef.value && displayedReviews.value) {
      const carouselWidth = carouselRef.value.clientWidth;
      const itemWidth = 300; // 16rem = 16 * 16px
      amountVisible.value = Math.max(1, Math.floor(carouselWidth / itemWidth));
    }
  });
};

onMounted(calculateAmountVisible);

watch(displayedReviews, (newVal) => {
  nextTick(() => {
    if (carouselRef.value && newVal?.length) {
      const carouselWidth = carouselRef.value.clientWidth;
      const itemWidth = 300; // szerokość jednej recenzji
      amountVisible.value = Math.max(1, Math.floor(carouselWidth / itemWidth));
    }
  });
});

window.addEventListener("resize", calculateAmountVisible);

function displayNext() {
  if (!displayedReviews.value) return;
  if (
    firstVisible.value + amountVisible.value <
    displayedReviews.value.length
  ) {
    firstVisible.value++;
  }
}

function displayPrev() {
  if (firstVisible.value > 0) {
    firstVisible.value--;
  }
}

const visibleReviews = computed(
  () =>
    displayedReviews.value?.slice(
      firstVisible.value,
      firstVisible.value + amountVisible.value
    ) ?? []
);
</script>

<template>
  <section
    class="w-full h-[44rem] flex flex-col items-center bg-[#ccc] py-4 gap-4"
  >
    <div
      class="relative w-full sm:h-[3rem] flex flex-col sm:flex-row items-center justify-between px-12 gap-2 sm:gap-0"
    >
      <div class="flex flex-col items-start">
        <h2 class="text-primary text-xl md:text-2xl lg:text-3xl font-semibold">
          Lazur Reviews
        </h2>
        <p class="text-sm whitespace-nowrap">
          See what other customers think of Lazur
        </p>
      </div>

      <span class="absolute flex gap-8 left-1/2 -translate-x-1/2">
        <button
          v-if="firstVisible - 1 > 0"
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
          v-if="firstVisible + amountVisible < (displayedReviews?.length ?? 0)"
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
      </span>

      <RatingSelect v-model="selected" />
    </div>

    <!-- scrollable carousel on mobile -->
    <div
      class="w-full flex sm:hidden overflow-x-auto whitespace-nowrap gap-4 px-4"
    >
      <Review
        v-for="review in displayedReviews"
        :key="review.id"
        :review="review"
      />
    </div>

    <!-- arrow buttons slider on desktop -->
    <div
      ref="carouselRef"
      class="hidden sm:flex w-full h-[20rem] items-center justify-between px-2"
    >
      <div
        class="w-full flex justify-center gap-4 overflow-x-auto scroll-smooth px-2 md:px-0"
        style="scroll-behavior: smooth"
      >
        <Review
          v-for="review in visibleReviews"
          :key="review.id"
          :review="review"
        />
      </div>
    </div>
  </section>
</template>
