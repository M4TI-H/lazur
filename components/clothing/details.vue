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
    class="w-full self-center flex flex-col z-20 gap-3 mb-4 md:px-2"
  >
    <div class="w-full flex items-center justify-center md:justify-start gap-2">
      <button
        v-for="(option, id) in options"
        :key="id"
        @click="selectedOption = option"
        class="h-[2rem] text-sm pr-2 text-secondary hover:cursor-pointer"
        :class="[
          option === selectedOption
            ? ['border-b-1', 'border-[#6a6272]']
            : 'border-none',
        ]"
      >
        {{ option.charAt(0).toUpperCase() + option.slice(1) }}
      </button>
    </div>

    <p v-if="selectedOption === 'description'">{{ garment.description }}</p>
    <p v-if="selectedOption === 'category'">
      {{
        garment.categories!.category.charAt(0).toUpperCase() +
        garment.categories!.category.slice(1)
      }}
    </p>
    <p v-if="selectedOption === 'fabrics'">{{ garment.fabrics }}</p>
  </div>
</template>
