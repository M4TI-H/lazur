<script setup lang="ts">
const emit = defineEmits<{
  (e: "close"): void;
}>();
</script>

<template>
  <div
    class="w-[18rem] md:w-[32rem] flex flex-col gap-2 md:gap-4 p-4 rounded-lg bg-[#eee]"
  >
    <div class="flex items-center justify-between">
      <h2 class="text-xl md:text-2xl font-semibold">Please sign in</h2>
      <button @click="emit('close')">
        <i class="pi pi-times text-lg hover:cursor-pointer"></i>
      </button>
    </div>

    <p class="text-sm md:text-lg text-secondary">
      Only registered users can write reviews.
    </p>
    <div class="w-full h-[2.5rem] flex items-center justify-end">
      <NuxtLink
        to="/account/login"
        class="max-w-[12rem] w-full h-[2.5rem] bg-[#445388] text-light flex items-center justify-center rounded-md mt-4 self-end hover:cursor-pointer hover:bg-[#212842] active:bg-[#212842] transition-color ease-in-out duration-200"
      >
        Sign in
      </NuxtLink>
    </div>
  </div>
</template>
