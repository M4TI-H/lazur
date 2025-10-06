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
    class="scrollbar-hide w-full sm:w-auto h-[2.5rem] flex items-center justify-start scroll-smooth overflow-x-auto whitespace-nowrap p-1 gap-1"
  >
    <button
      @click="selectCategory('any')"
      class="px-2 py-1 rounded-full hover:cursor-pointer text-secondary font-semibold flex items-center justify-center"
      :class="[
        props.modelValue === 'any'
          ? 'bg-[#1F1D20]/20'
          : 'hover:bg-[#1F1D20]/10',
      ]"
    >
      Any
    </button>
    <button
      v-for="(category, id) in categories"
      :key="id"
      @click="selectCategory(category)"
      class="px-2 py-1 rounded-full hover:cursor-pointer text-secondary font-semibold flex items-center justify-center"
      :class="[
        props.modelValue === category
          ? 'bg-[#1F1D20]/20'
          : 'hover:bg-[#1F1D20]/10',
      ]"
    >
      <span>{{ category.charAt(0).toUpperCase() + category.slice(1) }}</span>
    </button>
  </div>
</template>
