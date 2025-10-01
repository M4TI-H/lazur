<script setup lang="ts">
import { useFetchCategories } from "~/composables/garments/useFetchCategories";

const { categories, loading, refresh } = useFetchCategories();

onMounted(async () => {
  await refresh();
});
</script>
<template>
  <div
    class="w-full h-[2.5rem] rounded-full bg-[#DEE2E6] flex items-center p-1 overflow-x-auto whitespace-nowrap"
  >
    <button
      class="px-4 h-full rounded-full hover:bg-[#CED4DA] hover:cursor-pointer text-secondary font-semibold flex items-center justify-center gap-1 transition duration-200 ease-in-out"
    >
      Any
    </button>
    <button
      v-for="(category, id) in categories"
      :key="id"
      class="px-4 h-full rounded-full hover:bg-[#CED4DA] hover:cursor-pointer text-secondary font-semibold flex items-center justify-center gap-1 transition duration-200 ease-in-out"
    >
      <span>{{ category.charAt(0).toUpperCase() + category.slice(1) }}</span>
    </button>
  </div>
</template>
