<script setup lang="ts">
const props = defineProps<{
  loading: boolean;
  valid: boolean;
}>();
</script>

<template>
  <button
    type="submit"
    v-if="!props.loading"
    class="max-w-[12rem] w-full h-[2.5rem] bg-sky-700 rounded-md mt-auto self-end cursor-pointer text-gray-200 hover:bg-sky-800 active:bg-sky-800 transition-color ease-in-out duration-200 mx-auto"
  >
    Confirm
  </button>

  <button
    v-if="props.loading && valid"
    class="max-w-[12rem] w-full h-[2.5rem] bg-sky-700 text-gray-200 rounded-md mt-auto self-end mx-auto"
  >
    <i class="pi pi-spin pi-spinner"></i>
  </button>
</template>
