<script setup lang="ts">
import { Icon } from "@iconify/vue";

const props = defineProps<{
  modelValue: number;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const hoveredStar = ref<number | null>(null);

const setHover = (value: number) => {
  hoveredStar.value = value;
};
const clearHover = () => {
  hoveredStar.value = null;
};

const selectStar = (value: number) => {
  emit("update:modelValue", value);
};
</script>
<template>
  <span class="flex items-center">
    <button
      type="button"
      class="text-lg hover:cursor-pointer"
      v-for="value in 5"
      :key="value"
      @mouseenter="setHover(value)"
      @mouseleave="clearHover"
      @click="selectStar(value)"
    >
      <Icon
        icon="tabler:star-filled"
        :class="[
          (hoveredStar !== null && value <= hoveredStar) ||
          (hoveredStar === null &&
            props.modelValue !== null &&
            value <= props.modelValue)
            ? 'text-[#445388]'
            : 'text-[#a09fa1]',
        ]"
      />
    </button>
  </span>
</template>
