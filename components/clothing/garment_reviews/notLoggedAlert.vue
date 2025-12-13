<script setup lang="ts">
const emit = defineEmits<{
  (e: "close"): void;
}>();
</script>

<template>
  <div
    class="w-[18rem] md:w-[32rem] flex flex-col gap-2 md:gap-4 p-4 rounded-lg bg-white border-2 border-gray-300"
  >
    <div class="flex items-center justify-between">
      <h2 class="text-xl md:text-2xl font-semibold">Please sign in</h2>
      <ExitButton @click="emit('close')" />
    </div>

    <p class="text-sm md:text-lg text-gray-500">
      Only registered users can write reviews.
    </p>
    <div class="w-full h-[2.5rem] flex items-center justify-end">
      <NuxtLink
        to="/account/login"
        class="max-w-[12rem] w-full h-[2.5rem] bg-sky-800 flex items-center justify-center rounded-md mt-4 self-end cursor-pointer text-gray-200 hover:bg-sky-900 active:bg-sky-900 transition-color ease-in-out duration-200"
      >
        Sign in
      </NuxtLink>
    </div>
  </div>
</template>
