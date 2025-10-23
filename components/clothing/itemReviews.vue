<script setup lang="ts">
import { Icon } from "@iconify/vue";

const emit = defineEmits<{
  (e: "close"): void;
}>();
</script>

<template>
  <div
    class="bg-white w-full max-w-[18rem] max-h-[44rem] rounded-lg flex flex-col gap-2 z-20 p-4 overscroll-y-auto"
  >
    <span class="flex items-center justify-between px-1">
      <h3 class="text-lg">All reviews</h3>
      <button @click="emit('close')">
        <i class="pi pi-times text-lg hover:cursor-pointer"></i>
      </button>
    </span>
    <div class="w-full flex flex-col px-4 py-2 gap-2 my-1">
      <div class="flex items-center justify-between">
        <span class="flex items-center">
          <Icon
            v-for="i in 5"
            :key="i"
            :icon="i <= 4 ? 'tabler:star-filled' : 'tabler:star'"
            class="text-[#445388] text-lg"
          />
        </span>
        <p class="text-sm text-secondary">10/01/2024</p>
      </div>
      <p>Name Surname</p>
      <p>Description</p>
    </div>
  </div>
</template>
