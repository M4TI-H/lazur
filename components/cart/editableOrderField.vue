<script setup lang="ts">
const props = defineProps<{
  label: string;
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const editValue = ref<boolean>(false);
const localValue = ref<string>(props.modelValue);

function toggleEdit() {
  editValue.value = !editValue.value;
  localValue.value = props.modelValue;
}

function saveEdit() {
  emit("update:modelValue", localValue.value);
  editValue.value = false;
}
</script>

<template>
  <div
    class="w-full h-[2rem] flex flex-col sm:flex-row items-start sm:items-center justify-between sm:px-4 gap-1 sm:gap-0"
  >
    <p class="text-sm text-gray-500">{{ props.label }}</p>
    <div class="w-full sm:w-auto flex items-center gap-1">
      <template v-if="!editValue">
        <p class="font-semibold">{{ modelValue }}</p>

        <button
          @click="toggleEdit"
          type="button"
          class="text-sm flex items-center justify-center p-[6px] rounded-full hover:bg-gray-300/50 cursor-pointer transition-colors duration-150"
        >
          <i class="pi pi-pencil text-sm text-gray-500"></i>
        </button>
      </template>
      <template v-else>
        <input
          v-model="localValue"
          type="text"
          class="w-full sm:w-[10rem] h-[2rem] bg-gray-200 border-1 border-gray-300 outline-gray-300 text-sm px-2 rounded-md"
        />
        <button
          @click="saveEdit"
          type="button"
          class="text-sm flex items-center justify-center p-[6px] rounded-full hover:bg-gray-300/50 cursor-pointer transition-colors duration-150"
        >
          <i class="pi pi-check text-sm text-gray-500"></i>
        </button>
        <button
          @click="toggleEdit"
          type="button"
          class="text-sm flex items-center justify-center p-[6px] rounded-full hover:bg-gray-300/50 cursor-pointer transition-colors duration-150"
        >
          <i class="pi pi-times text-sm text-gray-500"></i>
        </button>
      </template>
    </div>
  </div>
</template>
