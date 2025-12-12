<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useFetchItemReviews } from "~/composables/reviews/item/useFetchItemsReviews";

const { item_id } = defineProps<{
  item_id: number;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const { reviews, refresh, loading } = useFetchItemReviews(item_id);

onMounted(async () => {
  await refresh();
});
</script>

<template>
  <div
    class="h-full w-full min-w-[18rem] md:min-w-[28rem] lg:min-w-[48rem] max-w-[90%] md:max-w-[32rem] lg:max-w-[64rem] rounded-lg flex flex-col gap-1 z-20 p-4 bg-white border-2 border-gray-300"
  >
    <div class="flex items-center justify-between">
      <h2 class="text-xl md:text-2xl font-semibold">All reviews</h2>
      <button
        @click="emit('close')"
        class="text-sm flex items-center justify-center p-1 rounded-full hover:bg-gray-500/50 cursor-pointer transition-colors duration-150"
      >
        <i class="pi pi-times"></i>
      </button>
    </div>
    <p v-if="reviews?.length === 0" class="my-4 text-gray-500 font-semibold">
      No reviews.
    </p>
    <div class="w-full overflow-y-auto">
      <div
        v-for="(review, id) in reviews"
        :key="id"
        class="w-full flex flex-col p-1 gap-2"
      >
        <div class="flex items-center justify-between">
          <p class="text-lg font-semibold">{{ review.name }}</p>

          <p class="text-sm text-gray-500">
            {{ useFormatDate(review.created_at) }}
          </p>
        </div>
        <div class="flex items-start justify-between">
          <div class="flex flex-col gap-2">
            <span class="flex items-center">
              <Icon
                v-for="i in 5"
                :key="i"
                :icon="
                  i <= review.rating ? 'tabler:star-filled' : 'tabler:star'
                "
                class="text-sky-700 text-lg"
              />
            </span>
            <p>{{ review.review }}</p>
          </div>
          <img
            v-if="review.image_url"
            :src="review.image_url"
            draggable="false"
            class="size-28"
          />
        </div>

        <div
          v-if="id < reviews!.length - 1"
          class="w-full border-1 border-gray-300 mt-2"
        ></div>
      </div>
    </div>
  </div>
</template>
