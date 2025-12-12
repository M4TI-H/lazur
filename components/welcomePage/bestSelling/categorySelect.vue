<script setup lang="ts">
import { useFetchCategories } from "~/composables/garments/useFetchCategories";

const { categories, loading, refreshCategories } = useFetchCategories();

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const selectCategory = (value: string) => {
  emit("update:modelValue", value);
};

onMounted(async () => {
  await refreshCategories();
});
</script>
<template>
  <div
    class="scrollbar-hide w-full sm:w-[auto] h-[2.5rem] self-start flex items-center justify-start scroll-smooth overflow-x-auto whitespace-nowrap px-4 gap-1"
  >
    <button
      @click="selectCategory('any')"
      class="px-4 py-1 rounded-full cursor-pointer text-sm md:text-md text-gray-200 font-semibold flex items-center justify-center transiton-color duration-200 ease-in-out"
      :class="[
        props.modelValue === 'any'
          ? 'bg-stone-800/70'
          : 'hover:bg-stone-800/50',
      ]"
    >
      Any
    </button>
    <button
      v-for="(cat, id) in categories"
      :key="id"
      @click="selectCategory(cat.category)"
      class="px-2 py-1 rounded-full cursor-pointer text-sm md:text-md text-gray-200 font-semibold flex items-center justify-center transiton-color duration-200 ease-in-out"
      :class="[
        props.modelValue === cat.category
          ? 'bg-stone-800/70'
          : 'hover:bg-stone-800/50',
      ]"
    >
      <span>{{
        cat.category.charAt(0).toUpperCase() + cat.category.slice(1)
      }}</span>
    </button>
  </div>
</template>
