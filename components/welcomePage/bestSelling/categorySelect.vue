<script setup lang="ts">
import { useFetchCategories } from "~/composables/garments/useFetchCategories";

const { categories, loading, refresh } = useFetchCategories();

onMounted(async () => {
  await refresh();
});
</script>
<template>
  <div class="w-full flex items-center overflow-x-auto whitespace-nowrap gap-8">
    <button
      class="py-4 h-full hover:cursor-pointer text-secondary font-semibold flex items-center justify-center"
    >
      Any
    </button>
    <button
      v-for="(category, id) in categories"
      :key="id"
      class="py-4 h-full hover:cursor-pointer text-secondary font-semibold flex items-center justify-center"
    >
      <span>{{ category.charAt(0).toUpperCase() + category.slice(1) }}</span>
    </button>
  </div>
</template>
