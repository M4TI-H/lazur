<script setup lang="ts">
const props = defineProps<{
  label: string;
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const localValue = ref<string>(props.modelValue);

watch(
  () => props.modelValue,
  (val) => {
    localValue.value = val;
  }
);

watch(localValue, (val) => {
  emit("update:modelValue", val);
});
</script>

<template>
  <div
    class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between sm:px-4 gap-1 sm:gap-0"
  >
    <p class="text-sm text-secondary">{{ props.label }}</p>
    <input
      v-model="localValue"
      type="text"
      class="w-full sm:w-[14rem] h-[2rem] bg-[#eee] text-lg px-2 rounded-md"
    />
  </div>
</template>
