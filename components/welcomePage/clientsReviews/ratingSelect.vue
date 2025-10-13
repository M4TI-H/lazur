<script setup lang="ts">
import { Icon } from "@iconify/vue";

const props = defineProps<{
  modelValue: number;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const changeSelected = (id: number) => {
  emit("update:modelValue", id);
};
</script>
<template>
  <div class="h-[2.5rem] flex items-center p-1 gap-1">
    <button
      @click="changeSelected(0)"
      class="px-2 h-full rounded-full hover:cursor-pointer text-secondary font-semibold flex items-center justify-center gap-1 transition duration-200 ease-in-out"
      :class="[
        props.modelValue === 0 ? 'bg-[#1F1D20]/20' : 'hover:bg-[#1F1D20]/30',
      ]"
    >
      <span class="hidden sm:flex">Recent</span>
      <span class="flex sm:hidden"><i class="pi pi-clock"></i></span>
    </button>
    <button
      v-for="i in 5"
      :key="i"
      @click="changeSelected(i)"
      class="px-2 h-full rounded-full hover:cursor-pointer text-secondary font-semibold flex items-center justify-center gap-1 transition duration-200 ease-in-out"
      :class="[
        props.modelValue === i ? 'bg-[#1F1D20]/20' : 'hover:bg-[#1F1D20]/10',
      ]"
    >
      <span>{{ i }}</span>
      <Icon icon="tabler:star-filled" class="text-[#445388]" />
    </button>
  </div>
</template>
