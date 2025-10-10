<script setup lang="ts">
import { useFetchCategories } from "~/composables/garments/useFetchCategories";

const { categories, loading, refresh } = useFetchCategories();

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
  await refresh();
});
</script>
<template>
  <div
    class="scrollbar-hide w-full sm:w-[auto] h-[2.5rem] self-start flex items-center justify-start scroll-smooth overflow-x-auto whitespace-nowrap px-4 gap-1"
  >
    <button
      @click="selectCategory('any')"
      class="px-4 py-1 rounded-full hover:cursor-pointer text-sm md:text-md text-light font-semibold flex items-center justify-center transiton-color duration-200 ease-in-out"
      :class="[
        props.modelValue === 'any'
          ? 'bg-[#1F1D20]/80'
          : 'hover:bg-[#1F1D20]/60',
      ]"
    >
      Any
    </button>
    <button
      v-for="(category, id) in categories"
      :key="id"
      @click="selectCategory(category)"
      class="px-2 py-1 rounded-full hover:cursor-pointer text-sm md:text-md text-light font-semibold flex items-center justify-center transiton-color duration-200 ease-in-out"
      :class="[
        props.modelValue === category
          ? 'bg-[#1F1D20]/90'
          : 'hover:bg-[#1F1D20]/60',
      ]"
    >
      <span>{{ category.charAt(0).toUpperCase() + category.slice(1) }}</span>
    </button>
  </div>
</template>
