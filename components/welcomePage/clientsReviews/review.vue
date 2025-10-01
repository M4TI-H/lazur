<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type Review from "~/types/Review";

const { review } = defineProps<{
  review: Review;
}>();
</script>

<template>
  <div
    class="flex-none w-[14rem] sm:w-[16rem] h-[20rem] bg-[#DEE2E6] rounded-xl flex flex-col items-center justify-end p-4"
    :style="{
      backgroundImage: `url('https://plus.unsplash.com/premium_photo-1749886490544-d99e60364dcb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }"
  >
    <div
      class="relative w-full h-[10rem] flex flex-col items-center justify-end rounded-b-xl z-20 shadow-lg"
    >
      <div
        class="w-full bg-[#F8F9FA] flex flex-col items-center p-4 rounded-xl"
      >
        <span class="w-full h-[3.5rem] flex flex-col items-center">
          <p class="text-primary text-sm font-semibold">
            {{ review.name }}
          </p>
          <p class="text-secondary text-center font-thin">
            "{{ review.review }}"
          </p>
        </span>

        <div class="w-full h-[2rem] flex items-end justify-center">
          <Icon
            v-for="i in 5"
            :key="i"
            :icon="
              i <= review.general_rating ? 'tabler:star-filled' : 'tabler:star'
            "
            class="text-[#445388]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
