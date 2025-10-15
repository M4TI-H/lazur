<script setup lang="ts">
import { useFetchCategories } from "~/composables/garments/useFetchCategories";

const emit = defineEmits<{
  (e: "selectedCategory", category: string): void;
}>();

const { categories, loading, refresh } = useFetchCategories();

onMounted(async () => {
  await refresh();
});
</script>

<template>
  <div
    v-if="categories"
    class="scrollbar-hide w-full h-[4rem] md:h-[5rem] flex md:justify-center items-center px-3 gap-2 overflow-x-auto whitespace-nowrap"
  >
    <NuxtLink
      to="/garments"
      class="mx-2 lg:mx-4 hover:cursor-pointer text-secondary md:text-lg font-semibold flex items-center justify-center"
    >
      All
    </NuxtLink>
    <NuxtLink
      v-for="(category, id) in categories"
      :key="id"
      :to="`/garments/category/${category}`"
      class="mx-2 lg:mx-4 hover:cursor-pointer text-secondary md:text-lg font-semibold flex items-center justify-center"
    >
      {{ category.charAt(0).toUpperCase() + category.slice(1) }}
    </NuxtLink>
  </div>
</template>
