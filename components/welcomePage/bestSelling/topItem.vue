<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type Garment from "~/types/Garment";
import { useFetchItemRating } from "~/composables/reviews/item/useFetchItemRating";
import { useFetchCoverImage } from "~/composables/garments/images/useFetchCoverImage";
import { useFetchSizes } from "~/composables/garments/useFetchSizes";

const { itemData } = defineProps<{
  itemData: Garment;
}>();

const { rating, ratingLoading, ratingRefresh } = useFetchItemRating(
  itemData.id
);
const { cover, coverLoading, refreshCover } = useFetchCoverImage(itemData.id);
const { sizes, fetchSizes } = useFetchSizes();

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
    :to="`/garments/${itemData.gender}/itemDetails/${itemData.id}`"
    class="flex-shrink-0 w-[14rem] sm:w-[16rem] lg:w-[20rem] h-[20rem] lg:h-[28rem] bg-gray-200 rounded-md overflow-hidden"
  >
    <div
      class="h-[12rem] lg:h-[20rem] rounded-t-xl mx-auto bg-gray-300 flex items-center justify-center"
    >
      <img
        v-if="cover"
        :src="cover.url"
        class="h-full rounded-t-xl mx-auto object-stretch"
        draggable="false"
      />
      <i v-if="coverLoading" class="pi pi-spinner pi-spin text-white"></i>
    </div>

    <div
      class="w-full h-full flex flex-col items-center md:items-start p-2 py-2 md:px-4 bg-gray-200 md:bg-white rounded-b-xl"
    >
      <div class="w-full flex items-center justify-between">
        <div>
          <p
            v-if="itemData?.categories?.category"
            class="text-gray-500 font-thin text-sm"
          >
            {{ itemData.gender }} |
            {{
              itemData.categories?.category.charAt(0).toUpperCase() +
              itemData.categories?.category.slice(1)
            }}
          </p>
        </div>
        <div class="flex items-center justify-center sm:justify-start">
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
      <p class="md:text-lg truncate max-w-full self-start">
        {{ itemData.name }}
      </p>

      <div class="w-full flex flex-row justify-between items-center gap-1 py-2">
        <p v-if="itemData?.price" class="text-lg">
          ${{ itemData.price.toFixed(2) }}
        </p>
        <div class="flex items-center justify-between gap-1 md:gap-4">
          <select
            v-model="selectedSize"
            @click.stop.prevent
            class="w-[4rem] md:w-[6rem] h-[2.5rem] rounded-lg bg-gray-300 flex justify-center outline-0"
          >
            <option class="text-center">-</option>
            <option v-for="(size, id) in sizes" :key="id" class="text-center">
              {{ size }}
            </option>
          </select>

          <button
            @click.stop.prevent="addToCart"
            class="w-[2.5rem] h-[2.5rem] bg-sky-800 rounded-full md:flex items-center justify-center gap-1 text-gray-200 hover:bg-sky-900 active:bg-sky-900 cursor-pointer"
          >
            <i class="pi pi-shopping-bag text-sm text-gray-200" />
          </button>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
