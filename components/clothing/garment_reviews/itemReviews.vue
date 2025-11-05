<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useFetchItemReviews } from "~/composables/reviews/item/useFetchItemsReviews";

const { reviews, refresh, loading } = useFetchItemReviews();

const emit = defineEmits<{
  (e: "close"): void;
}>();

onMounted(async () => {
  await refresh();
});
</script>

<template>
  <div
    class="bg-white w-full max-w-[32rem] max-h-[44rem] rounded-lg flex flex-col gap-2 z-20 p-4 overscroll-y-auto"
  >
    <div class="flex items-center justify-between">
      <h2 class="text-xl md:text-2xl font-semibold">All reviews</h2>
      <button @click="emit('close')">
        <i class="pi pi-times text-lg hover:cursor-pointer"></i>
      </button>
    </div>
    <div
      v-for="review in reviews"
      class="w-full flex flex-col px-4 py-2 gap-2 my-1"
    >
      <div class="flex items-center justify-between">
        <p class="text-lg font-semibold">{{ review.name }}</p>

        <p class="text-sm text-secondary">
          {{ useFormatDate(review.created_at) }}
        </p>
      </div>
      <span class="flex items-center">
        <Icon
          v-for="i in 5"
          :key="i"
          :icon="i <= review.rating ? 'tabler:star-filled' : 'tabler:star'"
          class="text-[#445388] text-lg"
        />
      </span>
      <p>{{ review.review }}</p>
    </div>
  </div>
</template>
