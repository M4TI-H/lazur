<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type Garment from "~/types/Garment";
import { useFetchRating } from "~/composables/reviews/item/useFetchRating";

const { itemData, gender } = defineProps<{
  itemData: Garment;
  gender: string;
}>();

const { rating, ratingLoading, ratingRefresh } = useFetchRating(itemData.id!);

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
    :to="`/garments/${gender}/itemDetails/${itemData.id}`"
    class="relative w-[8rem] sm:w-[18rem] lg:w-[24rem] h-[14rem] sm:h-[28rem] lg:h-[32rem] bg-[#DEE2E6] rounded-md overflow-hidden"
  >
    <img
      src="https://freepngimg.com/save/2135-dress-shirt-png-image/757x1204"
      class="h-[8rem] sm:h-[20rem] lg:h-[24rem] rounded-t-xl mx-auto"
      draggable="false"
    />
    <div
      class="relativew-full h-full flex flex-col items-centersm:items-start p-2 py-2 bg-[#F8F9FA] rounded-b-xl"
    >
      <div class="w-full flex items-center justify-between">
        <div class="w-full max-w-[96%] sm:max-w-full">
          <p
            v-if="itemData?.categories?.category"
            class="hidden sm:block text-secondary font-thin text-sm"
          >
            {{ itemData.gender }} |
            {{
              itemData.categories?.category.charAt(0).toUpperCase() +
              itemData.categories?.category.slice(1)
            }}
          </p>
          <p class="text-primary sm:text-lg truncate">
            {{ itemData.name }} / {{ itemData.gender }}
          </p>
        </div>
        <div
          class="hidden sm:flex items-center justify-center sm:justify-start"
        >
          <Icon
            v-for="i in 5"
            :key="i"
            :icon="i <= (rating ?? 0) ? 'tabler:star-filled' : 'tabler:star'"
            class="text-[#445388]"
          />
        </div>
      </div>

      <div
        class="w-full flex flex-col sm:flex-row sm:items-center justify-end sm:justify-between gap-1 sm:py-2"
      >
        <div class="w-full sm:w-auto flex items-center justify-between">
          <p v-if="itemData?.price" class="text-primary sm:text-lg">
            ${{ itemData.price.toFixed(2) }}
          </p>
          <span
            class="flex sm:hidden items-center gap-1"
            v-if="rating && rating > 0"
          >
            {{ rating.toFixed(1) }}
            <Icon icon="tabler:star-filled" class="text-[#445388]" />
          </span>
        </div>

        <div class="flex items-center gap-4">
          <select
            v-model="selectedSize"
            @click.stop.prevent
            class="w-[4rem] sm:w-[6rem] h-[2rem] sm:h-[2.5rem] rounded-lg bg-[#d9d9d9] flex justify-center outline-0"
          >
            <option class="text-primary text-center">-</option>
            <option class="text-primary text-center">XS</option>
            <option class="text-primary text-center">S</option>
            <option class="text-primary text-center">M</option>
            <option class="text-primary text-center">L</option>
            <option class="text-primary text-center">XL</option>
          </select>

          <button
            @click.stop.prevent="addToCart"
            class="w-[2rem] sm:w-[2.5rem] h-[2rem] sm:h-[2.5rem] bg-[#445388] rounded-full flex items-center justify-center gap-1 hover:bg-[#212842] active:bg-[#212842] hover:cursor-pointer transition-colors ease-in-out duration-250"
          >
            <i class="pi pi-shopping-bag text-sm sm:text-lg text-light" />
          </button>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
