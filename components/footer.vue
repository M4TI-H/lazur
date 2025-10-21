<script setup lang="ts">
import { useFetchCategories } from "~/composables/garments/useFetchCategories";

const { categories, loading, refresh } = useFetchCategories();

onMounted(async () => {
  await refresh();
  categories.value = categories.value?.slice(0, 5) ?? null;
});
</script>

<template>
  <section
    class="relative w-full min-h-[18rem] bg-[#000]/90 flex flex-col items-center py-8 px-4 md:px-16"
  >
    <div
      class="w-full flex flex-wrap sm:flex-nowrap sm:items-center justify-between"
    >
      <div
        class="w-full sm:w-1/3 min-h-[8rem] mb-2 flex flex-col items-center gap-1"
      >
        <div class="flex sm:flex-col items-baseline gap-4">
          <h2 class="text-light text-3xl font-semibold">Lazur</h2>
          <p class="text-light font-semibold">Premium clothing</p>
        </div>

        <span class="flex items-center gap-2 mt-2 sm:mt-4 text-light text-sm">
          <i class="pi pi-phone text-light text-xs"></i>
          +11 123 456 789
        </span>
        <span class="flex items-center gap-2 text-light text-sm">
          <i class="pi pi-envelope text-light text-xs"></i>
          lazur@contact.com
        </span>
        <span class="flex items-center gap-2 text-light text-sm">
          <i class="pi pi-home text-light text-xs"></i>
          Gdansk, Złota 10
        </span>
      </div>

      <div
        class="w-1/2 sm:w-1/3 min-h-[8rem] flex flex-col items-center mt-2 md:mt-0 gap-1"
      >
        <h2 class="text-light text-lg font-semibold">Pages</h2>
        <a class="text-light text-sm font-semibold hover:cursor-pointer"
          >Home</a
        >
        <a class="text-light text-sm font-semibold hover:cursor-pointer">Men</a>
        <a class="text-light text-sm font-semibold hover:cursor-pointer"
          >Women</a
        >
        <a class="text-light text-sm font-semibold hover:cursor-pointer"
          >About us</a
        >
        <a class="text-light text-sm font-semibold hover:cursor-pointer"
          >Cart</a
        >
      </div>
      <div
        class="w-1/2 sm:w-1/3 min-h-[8rem] flex flex-col items-center mt-2 md:mt-0 gap-1"
      >
        <h2 class="text-light text-lg font-semibold">Useful</h2>
        <a class="text-light text-sm font-semibold hover:cursor-pointer"
          >Privacy policy</a
        >
        <a class="text-light text-sm font-semibold hover:cursor-pointer"
          >Delivery fees</a
        >
        <a class="text-light text-sm font-semibold hover:cursor-pointer"
          >Find shop</a
        >
        <a class="text-light text-sm font-semibold hover:cursor-pointer"
          >Returns</a
        >
        <a class="text-light text-sm font-semibold hover:cursor-pointer"
          >Career</a
        >
      </div>
    </div>
    <p class="absolute text-secondary text-xs bottom-2 right-4">
      Lazur@2025 All rights reserved
    </p>
  </section>
</template>
