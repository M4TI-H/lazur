<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type Garment from "~/types/Garment";
import { useFetchItemRating } from "~/composables/reviews/item/useFetchItemRating";

const { itemData } = defineProps<{
  itemData: Garment;
}>();

const { rating, ratingLoading, ratingRefresh } = useFetchItemRating(
  itemData.id!
);

const selectedSize = ref<string>("-");

const cartStore = useCartStore();
cartStore.loadFromStorage();

function addToCart() {
  if (selectedSize.value !== "-") {
    cartStore.addToCart(itemData, selectedSize.value);
  }
}
</script>

<template>
  <NuxtLink
    v-if="itemData"
    :to="`/garments/${itemData.gender}/itemDetails/${itemData.id}`"
    class="flex-shrink-0 w-[14rem] sm:w-[16rem] lg:w-[20rem] h-[20rem] lg:h-[28rem] bg-[#DEE2E6] rounded-md overflow-hidden"
  >
    <img
      src="https://freepngimg.com/save/2135-dress-shirt-png-image/757x1204"
      class="h-[12rem] lg:h-[20rem] rounded-t-xl mx-auto"
      draggable="false"
    />
    <div
      class="w-full h-full flex flex-col items-center md:items-start p-2 py-2 md:px-4 bg-[#eee] md:bg-[#F8F9FA] rounded-b-xl"
    >
      <div class="w-full flex items-center justify-between">
        <div>
          <p
            v-if="itemData?.categories?.category"
            class="text-secondary font-thin text-sm"
          >
            {{ itemData.gender }} |
            {{
              itemData.categories?.category.charAt(0).toUpperCase() +
              itemData.categories?.category.slice(1)
            }}
          </p>
        </div>
        <div class="flex items-center justify-center md:justify-start">
          <Icon
            v-for="i in 5"
            :key="i"
            :icon="
              i <= (rating?.avg_rating ?? 0)
                ? 'tabler:star-filled'
                : 'tabler:star'
            "
            class="text-[#445388]"
          />
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
            class="w-[4rem] md:w-[6rem] h-[2.5rem] rounded-lg bg-[#d9d9d9] flex justify-center outline-0"
          >
            <option class="text-center">-</option>
            <option class="text-center">XS</option>
            <option class="text-center">S</option>
            <option class="text-center">M</option>
            <option class="text-center">L</option>
            <option class="text-center">XL</option>
          </select>

          <button
            @click.stop.prevent="addToCart"
            class="w-[2.5rem] h-[2.5rem] bg-[#445388] rounded-full md:flex items-center justify-center gap-1 hover:bg-[#212842] active:bg-[#212842] hover:cursor-pointer"
          >
            <i class="pi pi-shopping-bag text-sm md:text-lg text-light" />
          </button>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
