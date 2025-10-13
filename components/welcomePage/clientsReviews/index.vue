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

const firstVisible = ref<number>(0);
let amountVisible = ref<number>(1);
const carouselRef = ref<HTMLElement | null>(null);
const itemWidth = ref<number>(0);

watch(selected, async (newVal) => {
  firstVisible.value = 0;

  if (newVal === 0) {
    await refresh();
  } else {
    await ratingRefresh();
  }
});

function updateItemWidth() {
  if (window.innerWidth >= 640) itemWidth.value = 272; // sm:w-[16rem]
  else itemWidth.value = 228; // w-[14rem]
}

const displayedReviews = computed(() =>
  selected.value === 0 ? reviews.value ?? [] : ratingReviews.value ?? []
);

const calculateAmountVisible = () => {
  nextTick(() => {
    if (carouselRef.value && displayedReviews.value) {
      const carouselWidth = carouselRef.value.clientWidth - 16;
      amountVisible.value = Math.max(
        1,
        Math.floor(carouselWidth / itemWidth.value)
      );
    }
  });
};

onMounted(() => {
  updateItemWidth();
  calculateAmountVisible();
  window.addEventListener("resize", () => {
    updateItemWidth();
    calculateAmountVisible();
  });
});

watch(displayedReviews, (newVal) => {
  nextTick(() => {
    if (carouselRef.value && newVal?.length) {
      const carouselWidth = carouselRef.value.clientWidth - 16;
      amountVisible.value = Math.max(
        1,
        Math.floor(carouselWidth / itemWidth.value)
      );
    }
  });
});

function displayNext() {
  if (!displayedReviews.value) {
    return;
  }

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

const offset = computed(() => -(firstVisible.value * itemWidth.value));
</script>

<template>
  <section
    class="w-full h-[36rem] flex flex-col items-center pt-16 mb-8 gap-2 sm:gap-4"
  >
    <div
      class="relative w-full flex flex-col items-center justify-between px-3 sm:px-12 gap-2 sm:gap-2"
    >
      <h2 class="text-2xl md:text-3xl font-semibold">Trending</h2>
      <p class="text-sm sm:text-md md:text-lg sm:text-center">
        See what other customers think of Lazur
      </p>
    </div>
    <RatingSelect v-model="selected" />

    <!-- scrollable carousel on mobile -->
    <div
      class="scrollbar-hide w-full flex sm:hidden overflow-x-auto whitespace-nowrap gap-4 px-4"
    >
      <Review
        v-for="review in displayedReviews"
        :key="review.id"
        :review="review"
      />
    </div>

    <!-- arrow buttons slider on desktop -->
    <div class="w-full h-[20rem] flex items-center justify-between px-16">
      <div>
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
      </div>
      <div
        ref="carouselRef"
        class="hidden sm:flex h-full items-center justify-start overflow-hidden w-full sm:max-w-[42rem] md:max-w-[50rem] lg:max-w-[102rem]"
      >
        <div
          class="flex gap-4 transition-transform duration-500 ease-in-out mx-auto px-2"
          :style="{ transform: `translateX(${offset}px)` }"
        >
          <Review
            v-for="review in displayedReviews"
            :key="review.id"
            :review="review"
          />
        </div>
      </div>
      <div>
        <button
          v-if="
            firstVisible + amountVisible + 1 < (displayedReviews?.length ?? 0)
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
  </section>
</template>
