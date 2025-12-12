<script setup lang="ts">
import type Garment from "~/types/Garment";

const { garment } = defineProps<{
  garment: Garment;
}>();

const selectedOption = ref<string>("description");
const options = ["description", "category", "fabrics"];
</script>

<template>
  <div
    v-if="garment"
    class="w-full self-center flex flex-col sm:flex-row items-center sm:items-start z-20 gap-3 mb-4"
  >
    <div class="flex sm:flex-col items-start justify-center gap-2 px-2">
      <button
        v-for="(option, id) in options"
        :key="id"
        @click="selectedOption = option"
        class="h-[2rem] px-2 sm:text-sm text-gray-500 cursor-pointer rounded-md border border-gray-300 hover:bg-gray-100 hover:border-gray-200"
        :class="[
          option === selectedOption
            ? ['text-gray-500', 'bg-gray-200']
            : 'border-gray-400/0',
        ]"
      >
        {{ option.charAt(0).toUpperCase() + option.slice(1) }}
      </button>
    </div>

    <div
      class="w-full min-w-[18rem] max-w-[24rem] sm:max-w-full flex items-center sm:justify-start justify-center mr-2"
    >
      <p v-if="selectedOption === 'description'">
        {{ garment.description }}
      </p>
      <p v-if="selectedOption === 'category'">
        {{
          garment.categories!.category.charAt(0).toUpperCase() +
          garment.categories!.category.slice(1)
        }}
      </p>
      <p v-if="selectedOption === 'fabrics'">{{ garment.fabrics }}</p>
    </div>
  </div>
</template>
