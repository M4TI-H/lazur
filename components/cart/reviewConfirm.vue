<script setup lang="ts"></script>
<template>
  <section
    class="w-full min-w-[18rem] sm:max-w-[24rem] xl:max-w-[28rem] max-h-[48rem] min-h-[12rem] flex flex-col p-4 gap-4 bg-white sm:border-2 border-gray-300 sm:rounded-lg z-10"
  >
    <h2 class="text-xl font-semibold">Review sent</h2>
    <p class="text-gray-500">Thank you for supporting Lazur.</p>
    <NuxtLink
      to="/"
      class="max-w-[12rem] w-full h-[2.5rem] bg-sky-800 rounded-md flex items-center justify-center mt-auto self-end cursor-pointer text-gray-200 hover:bg-sky-900 active:bg-sky-900 transition-color ease-in-out duration-200 mx-auto"
    >
      Return to homepage
    </NuxtLink>
  </section>
</template>
