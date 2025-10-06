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
  <div class="w-full flex items-center overflow-x-auto whitespace-nowrap gap-8">
    <button
      @click="selectCategory('any')"
      class="px-1 hover:cursor-pointer text-secondary font-semibold flex items-center justify-center"
      :class="[props.modelValue === 'any' ? 'bg-[red]' : 'bg-none']"
    >
      Any
    </button>
    <button
      v-for="(category, id) in categories"
      :key="id"
      @click="selectCategory(category)"
      class="px-1 hover:cursor-pointer text-secondary font-semibold flex items-center justify-center"
      :class="[props.modelValue === category ? 'bg-[red]' : 'bg-none']"
    >
      <span>{{ category.charAt(0).toUpperCase() + category.slice(1) }}</span>
    </button>
  </div>
</template>
