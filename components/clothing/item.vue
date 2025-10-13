<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type Garment from "~/types/Garment";
import { useFetchRating } from "~/composables/reviews/item/useFetchRating";

const { itemData } = defineProps<{
  itemData: Garment;
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
    :to="`/garments/itemDetails/${itemData.id}`"
    class="w-[8rem] md:w-[20rem] lg:w-[24rem] h-[12rem] md:h-[28rem] lg:h-[32rem] bg-[#DEE2E6] rounded-md overflow-hidden"
  >
    <img
      src="https://freepngimg.com/save/2135-dress-shirt-png-image/757x1204"
      class="h-[8rem] md:h-[20rem] lg:h-[24rem] rounded-t-xl mx-auto"
      draggable="false"
    />
    <div
      class="w-full h-full flex flex-col items-center md:items-start p-2 py-2 md:px-4 bg-[#eee] md:bg-[#F8F9FA] rounded-b-xl"
    >
      <div class="w-full flex items-center justify-between">
        <div>
          <p
            v-if="itemData?.category"
            class="hidden md:block text-secondary font-thin text-sm"
          >
            {{
              itemData.category.charAt(0).toUpperCase() +
              itemData.category.slice(1)
            }}
          </p>
          <p class="text-primary text-sm md:text-lg truncate max-w-full">
            {{ itemData.name }}
          </p>
        </div>
        <div
          class="hidden md:flex items-center justify-center md:justify-start"
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
        class="w-full flex flex-col md:flex-row items-center justify-end md:justify-between gap-1 py-2"
      >
        <p v-if="itemData?.price" class="text-primary text-sm md:text-lg">
          ${{ itemData.price.toFixed(2) }}
        </p>

        <div class="hidden md:flex items-center gap-4">
          <select
            v-model="selectedSize"
            @click.stop.prevent
            class="w-[6rem] h-[2.5rem] rounded-lg bg-[#d9d9d9] flex justify-center outline-0"
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
            class="hidden w-[2.5rem] h-[2.5rem] bg-[#445388] rounded-full md:flex items-center justify-center gap-1 hover:bg-[#212842] active:bg-[#212842] hover:cursor-pointer transition-colors ease-in-out duration-250"
          >
            <p class="text-light text-sm md:hidden">Add to cart</p>
            <i class="pi pi-shopping-bag text-sm md:text-lg text-light" />
          </button>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
