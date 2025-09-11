<script setup lang="ts">
import { Icon } from "@iconify/vue";

const { itemData } = defineProps<{
  itemData: any;
}>();
</script>

<template>
  <NuxtLink
    :to="`/garments/itemDetails/${itemData.id + 1}`"
    class="w-[8rem] md:w-[20rem] lg:w-[24rem] h-[12rem] md:h-[28rem] lg:h-[32rem] bg-[#DEE2E6] rounded-xl overflow-hidden"
  >
    <img
      :src="itemData.cover"
      class="w-full h-[8rem] md:h-[20rem] lg:h-[24rem] rounded-t-xl"
    />
    <div
      class="w-full h-full flex flex-col items-center md:items-start p-2 py-2 md:px-4 bg-[#F8F9FA] rounded-b-xl"
    >
      <p class="hidden md:block text-secondary font-thin text-sm">
        {{ itemData.category }}
      </p>
      <p
        class="text-primary text-sm md:text-lg font-semibold truncate max-w-full"
      >
        {{ itemData.name }}
      </p>
      <div
        class="hidden w-full md:flex items-center justify-center md:justify-start"
      >
        <Icon icon="tabler:star-filled" class="text-[#445388]" />
        <Icon icon="tabler:star-filled" class="text-[#445388]" />
        <Icon icon="tabler:star-filled" class="text-[#445388]" />
        <Icon icon="tabler:star-filled" class="text-[#445388]" />
        <Icon icon="tabler:star" class="text-[#445388]" />
      </div>
      <div
        class="w-full flex flex-col md:flex-row items-center justify-end md:justify-between gap-1 py-2"
      >
        <p class="text-primary text-sm md:text-lg font-semibold">
          ${{ itemData.price }}
        </p>

        <button
          class="hidden w-[2.5rem] h-[2.5rem] bg-[#445388] rounded-full md:flex items-center justify-center gap-1 hover:bg-[#212842] active:bg-[#212842] hover:cursor-pointer"
        >
          <p class="text-light text-sm md:hidden">Add to cart</p>
          <Icon
            icon="tabler:shopping-bag"
            class="text-lg md:text-2xl text-light"
          />
        </button>
      </div>
    </div>
  </NuxtLink>
</template>
