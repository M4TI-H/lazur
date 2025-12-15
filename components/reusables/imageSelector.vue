<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "file-selected", file: File | null): void;
}>();

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;

  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    const url = URL.createObjectURL(file);

    emit("file-selected", file);
    emit("update:modelValue", url);
  } else {
    emit("file-selected", null);
    emit("update:modelValue", "");
  }
};

function removeUrl() {
  emit("file-selected", null);
  emit("update:modelValue", "");
}
</script>

<template>
  <div class="w-full mx-auto flex flex-col items-center justify-center">
    <input
      type="file"
      accept="image/*"
      id="selectimage"
      @change="handleFileChange"
      class="hidden"
    />

    <div
      class="w-full flex sm:flex-row sm:items-center justify-between sm:px-4"
      v-if="modelValue"
    >
      <button
        as="button"
        class="text-gray-500 text-sm hover:underline cursor-pointer"
      >
        Attach image
      </button>
      <div class="relative size-40 group">
        <button
          type="button"
          @click="removeUrl()"
          class="absolute size-full hidden bg-black/40 group-hover:flex cursor-pointer rounded-md items-center justify-center"
        >
          <i class="pi pi-trash text-gray-200 text-2xl"></i>
        </button>
        <img :src="modelValue" class="size-full" />
      </div>
    </div>

    <div
      class="w-full flex sm:items-center justify-center sm:justify-between sm:px-4"
      v-else
    >
      <p class="hidden sm:flex text-gray-500 text-sm">Attach image</p>

      <label
        for="selectimage"
        class="size-40 border-1 border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100"
      >
        <i class="pi pi-image text-3xl text-gray-500"></i>
      </label>
    </div>
  </div>
</template>
