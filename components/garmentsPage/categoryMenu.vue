<script setup lang="ts">
import { useFetchCategories } from "~/composables/garments/useFetchCategories";

const { gender } = defineProps<{
  gender: string;
}>();

const sortStore = useSortStore();
sortStore.loadFromStorage();
const route = useRoute();

const { categories, loading, refreshCategories } = useFetchCategories();

const activeCategory = computed(() => route.params.category ?? "all");

onMounted(async () => {
  await refreshCategories();
});
</script>

<template>
  <div
    v-if="categories?.length"
    class="scrollbar-hide w-full max-w-[48rem] h-[4rem] md:h-[5rem] flex md:justify-center items-center px-3 gap-2 overflow-x-auto whitespace-nowrap"
  >
    <template v-if="!loading">
      <NuxtLink
        :to="`/garments/${gender}`"
        class="px-2 lg:px-4 rounded-full cursor-pointer text-gray-500 md:text-lg font-semibold flex items-center justify-center"
        :class="
          activeCategory === 'all' ? 'bg-stone-800/20' : 'hover:bg-stone-800/10'
        "
      >
        All
      </NuxtLink>
      <NuxtLink
        v-for="(cat, id) in categories"
        :key="id"
        :to="`/garments/${gender}/category/${cat.category}`"
        class="px-2 lg:px-4 rounded-full cursor-pointer text-gray-500 md:text-lg font-semibold flex items-center justify-center"
        :class="
          activeCategory === cat.category
            ? 'bg-stone-800/20'
            : 'hover:bg-stone-800/10'
        "
      >
        {{ cat.category.charAt(0).toUpperCase() + cat.category.slice(1) }}
      </NuxtLink>
    </template>
    <template v-else>
      <i class="pi pi-spinner pi-spin"></i>
    </template>
  </div>
</template>
