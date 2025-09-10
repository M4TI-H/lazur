<script setup lang="ts">
import { Icon } from "@iconify/vue";

const { itemData } = defineProps<{
  itemData: any;
}>();
</script>

<template>
  <div class="w-[24rem] h-[32rem] bg-[#DEE2E6] rounded-xl">
    <img :src="itemData.cover" class="w-full h-[20rem] rounded-t-xl" />
    <div class="w-full h-[12rem] flex flex-col p-4 bg-[#F8F9FA] rounded-b-xl">
      <div class="w-full h-[6rem]">
        <p class="text-secondary font-thin">{{ itemData.category }}</p>
        <p class="text-primary text-lg font-semibold">{{ itemData.name }}</p>
        <div class="w-full flex items-center">
          <Icon icon="tabler:star-filled" class="text-[#445388]" />
          <Icon icon="tabler:star-filled" class="text-[#445388]" />
          <Icon icon="tabler:star-filled" class="text-[#445388]" />
          <Icon icon="tabler:star-filled" class="text-[#445388]" />
          <Icon icon="tabler:star" class="text-[#445388]" />
        </div>
      </div>

      <div class="w-full h-[6rem] flex items-center justify-between">
        <p class="text-primary text-lg font-semibold">${{ itemData.price }}</p>
        <span class="flex items-center gap-6">
          <select
            class="w-[4rem] h-[2rem] bg-[#DEE2E6] border-1 border-[#445388] rounded-full flex items-center justify-center text-center text-xs"
          >
            <option class="text-center text-xs">XS</option>
            <option class="text-center text-xs">S</option>
            <option class="text-center text-xs">M</option>
            <option class="text-center text-xs">L</option>
            <option class="text-center text-xs">XL</option>
          </select>
          <button
            class="size-[2.5rem] bg-[#445388] rounded-full flex items-center justify-center hover:bg-[#212842] active:bg-[#212842] hover:cursor-pointer"
          >
            <Icon icon="tabler:plus" class="text-2xl text-light" />
          </button>
        </span>
      </div>
    </div>
  </div>
</template>
