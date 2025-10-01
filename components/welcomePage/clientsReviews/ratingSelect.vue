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
  <div
    class="w-full max-w-[24rem] md:w-[24rem] h-[2.5rem] rounded-full bg-[#DEE2E6] flex items-center p-1"
  >
    <button
      @click="changeSelected(0)"
      class="w-1/6 h-full rounded-full hover:cursor-pointer text-secondary font-semibold flex items-center justify-center gap-1 transition duration-200 ease-in-out"
      :class="[props.modelValue === 0 ? 'bg-[#bbb]' : 'hover:bg-[#CED4DA]']"
    >
      <span class="hidden sm:flex">Recent</span>
      <span class="flex sm:hidden"><i class="pi pi-clock"></i></span>
    </button>
    <button
      v-for="i in 5"
      :key="i"
      @click="changeSelected(i)"
      class="w-1/6 h-full rounded-full hover:bg-[#CED4DA] hover:cursor-pointer text-secondary font-semibold flex items-center justify-center gap-1 transition duration-200 ease-in-out"
      :class="[props.modelValue === i ? 'bg-[#bbb]' : 'hover:bg-[#CED4DA]']"
    >
      <span>{{ i }}</span>
      <Icon icon="tabler:star-filled" class="text-[#445388]" />
    </button>
  </div>
</template>
