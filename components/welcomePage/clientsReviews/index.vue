<script setup lang="ts">
import { useFetchReviews } from "~/composables/reviews/useFetchReviews";

const { reviews, loading, refresh } = useFetchReviews();

onMounted(async () => {
  await refresh();
});
</script>

<template>
  <div class="w-full h-[44rem] flex flex-col items-center bg-[#ccc] p-4 gap-4">
    <h2
      class="text-primary text-xl lg:text-2xl xl:text-3xl font-semibold text-center"
    >
      Client Reviews
    </h2>

    <div class="w-full flex justify-center gap-8">
      <Review v-for="review in reviews" :key="review.id" :review="review" />
    </div>
  </div>
</template>
