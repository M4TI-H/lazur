<script setup lang="ts">
const props = defineProps<{
  error: string;
}>();
</script>
<template>
  <div class="bg-red-300 border-1 border-red-800 rounded-md p-2">
    <p class="!text-red-800 text-sm">{{ error }}</p>
  </div>
</template>
