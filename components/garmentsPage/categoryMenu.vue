<script setup lang="ts">
import { useFetchCategories } from "~/composables/garments/useFetchCategories";

const emit = defineEmits<{
  (e: "selectedCategory", category: string): void;
}>();

const { gender } = defineProps<{
  gender: string;
}>();

const { categories, loading, refreshCategories } = useFetchCategories();

onMounted(async () => {
  await refreshCategories();
});
</script>

<template>
  <div
    v-if="categories"
    class="scrollbar-hide w-full max-w-[48rem] h-[4rem] md:h-[5rem] flex md:justify-center items-center px-3 gap-2 overflow-x-auto whitespace-nowrap"
  >
    <NuxtLink
      :to="`/garments/${gender}`"
      class="mx-2 lg:mx-4 cursor-pointer text-gray-500 md:text-lg font-semibold flex items-center justify-center"
    >
      All
    </NuxtLink>
    <NuxtLink
      v-for="(cat, id) in categories"
      :key="id"
      :to="`/garments/${gender}/category/${cat.category}`"
      class="mx-2 lg:mx-4 cursor-pointer text-gray-500 md:text-lg font-semibold flex items-center justify-center"
    >
      {{ cat.category.charAt(0).toUpperCase() + cat.category.slice(1) }}
    </NuxtLink>
  </div>
</template>
