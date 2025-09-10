<script setup lang="ts">
import { Icon } from "@iconify/vue";

const { review } = defineProps<{
  review: any;
}>();
</script>

<template>
  <div
    class="relative w-[16rem] h-[20rem] bg-[#DEE2E6] rounded-xl flex flex-col items-center justify-end p-4"
    :style="{
      backgroundImage: `url(${review.cover})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }"
  >
    <div
      class="relative w-full h-[10rem] flex flex-col items-center justify-end rounded-b-xl z-20 shadow-lg"
    >
      <img
        :src="review.user_img"
        class="absolute top-0 size-[3rem] rounded-full outline-8 outline-[#F8F9FA]"
      />
      <div
        class="w-full h-[9rem] bg-[#F8F9FA] flex flex-col items-center justify-end p-4 rounded-xl"
      >
        <span class="w-full h-[3.5rem] flex flex-col items-center">
          <p class="text-primary text-xs font-semibold">
            {{ review.username }}
          </p>
          <p class="text-secondary text-sm text-center font-thin">
            "{{ review.content }}"
          </p>
        </span>

        <div class="w-full h-[2rem] flex items-center justify-center">
          <Icon icon="tabler:star-filled" class="text-[#445388]" />
          <Icon icon="tabler:star-filled" class="text-[#445388]" />
          <Icon icon="tabler:star-filled" class="text-[#445388]" />
          <Icon icon="tabler:star-filled" class="text-[#445388]" />
          <Icon icon="tabler:star" class="text-[#445388]" />
        </div>
      </div>
    </div>
  </div>
</template>
