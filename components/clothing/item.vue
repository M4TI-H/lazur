<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type Garment from "~/types/Garment";
import { useFetchItemRating } from "~/composables/reviews/item/useFetchItemRating";
import { useFetchCoverImage } from "~/composables/garments/images/useFetchCoverImage";
import { useFetchSizes } from "~/composables/garments/useFetchSizes";

const { itemData, gender } = defineProps<{
  itemData: Garment;
  gender: string;
}>();

const { rating, ratingLoading, ratingRefresh } = useFetchItemRating(
  itemData.id
);
const { cover, coverLoading, refreshCover } = useFetchCoverImage(itemData.id);
const { sizes, sizesLoading, fetchSizes } = useFetchSizes();

const selectedSize = ref<string>("-");

const cartStore = useCartStore();
cartStore.loadFromStorage();

function addToCart() {
  if (selectedSize.value !== "-") {
    cartStore.addToCart(itemData, selectedSize.value);
  }

  selectedSize.value = "-";
}

onMounted(async () => {
  await ratingRefresh();
  await refreshCover();
  await fetchSizes(itemData.id);
});
</script>

<template>
  <NuxtLink
    v-if="itemData"
    :to="`/garments/${gender}/itemDetails/${itemData.id}`"
    class="relative w-[8rem] sm:w-[18rem] lg:w-[24rem] h-[14rem] sm:h-[28rem] lg:h-[32rem] bg-white rounded-md overflow-hidden"
  >
    <div
      class="h-[8rem] sm:h-[20rem] lg:h-[24rem] rounded-t-xl bg-gray-300 flex items-center justify-center"
    >
      <img
        v-if="cover"
        :src="cover.url"
        class="h-[8rem] sm:h-[20rem] lg:h-[24rem] rounded-t-xl mx-auto object-stretch"
        draggable="false"
      />
      <i v-if="coverLoading" class="pi pi-spinner pi-spin"></i>
    </div>

    <div
      class="relativew-full h-full flex flex-col items-center sm:items-start p-2 py-2 bg-white rounded-b-xl"
    >
      <div class="w-full flex items-center justify-between">
        <div class="w-full max-w-[96%] sm:max-w-full">
          <p
            v-if="itemData?.categories?.category"
            class="hidden sm:block text-gray-500 font-thin text-sm"
          >
            {{ itemData.gender }} |
            {{
              itemData.categories?.category.charAt(0).toUpperCase() +
              itemData.categories?.category.slice(1)
            }}
          </p>
          <p class="sm:text-lg truncate">
            {{ itemData.name }}
          </p>
        </div>
        <div
          class="hidden sm:flex items-center justify-center sm:justify-start"
        >
          <Icon
            v-for="i in 5"
            :key="i"
            :icon="
              i <= Number(rating?.avg_rating ?? 0)
                ? 'tabler:star-filled'
                : 'tabler:star'
            "
            class="text-sky-800"
          />
          <i v-if="ratingLoading" class="pi pi-spinner pi-spin"></i>
        </div>
      </div>

      <div
        class="w-full flex flex-col sm:flex-row sm:items-center justify-end sm:justify-between gap-1 sm:py-2"
      >
        <div class="w-full sm:w-auto flex items-center justify-between">
          <p v-if="itemData?.price" class="sm:text-lg">
            ${{ itemData.price.toFixed(2) }}
          </p>

          <span
            class="flex sm:hidden items-center gap-1"
            v-if="rating && Number(rating.avg_rating) > 0"
          >
            {{ Number(rating.avg_rating).toFixed(1) }}
            <Icon icon="tabler:star-filled" class="text-sky-800" />
          </span>
        </div>

        <div class="flex items-center gap-4">
          <select
            v-model="selectedSize"
            @click.stop.prevent
            class="w-[4rem] sm:w-[6rem] h-[2rem] sm:h-[2.5rem] rounded-lg bg-gray-300 flex justify-center outline-0"
          >
            <option class="text-center">-</option>
            <option v-for="(size, id) in sizes" :key="id" class="text-center">
              {{ size }}
            </option>
          </select>

          <button
            @click.stop.prevent="addToCart"
            class="w-[2rem] sm:w-[2.5rem] h-[2rem] sm:h-[2.5rem] bg-sky-800 flex items-center justify-center rounded-full cursor-pointer text-gray-200 hover:bg-sky-900 active:bg-sky-900 transition-color ease-in-out duration-200"
          >
            <i class="pi pi-shopping-bag text-sm text-gray-200" />
          </button>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
