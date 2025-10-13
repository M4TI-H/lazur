<script setup lang="ts">
import { useFetchCategories } from "~/composables/garments/useFetchCategories";

const { categories, loading, refresh } = useFetchCategories();

onMounted(async () => {
  await refresh();
});
</script>

<template>
  <section
    class="relative w-full h-[18rem] bg-[#000]/90 flex flex-col items-center py-8 px-16"
  >
    <div class="w-full flex items-center justify-between">
      <div class="w-[12rem] h-[8rem] flex flex-col gap-1">
        <h2 class="text-light text-3xl font-semibold">Lazur</h2>
        <p class="text-light font-semibold">Premium clothing</p>
        <span class="flex items-center gap-2 mt-8 text-light text-sm">
          <i class="pi pi-phone text-light text-xs"></i>
          +11 123 456 789
        </span>
        <span class="flex items-center gap-2 text-light text-sm">
          <i class="pi pi-envelope text-light text-xs"></i>
          lazur@contact.com
        </span>
        <span class="flex items-center gap-2 text-light text-sm">
          <i class="pi pi-home text-light text-xs"></i>
          lazur@contact.com
        </span>
      </div>
      <div class="w-[12rem] h-[8rem] flex flex-col gap-1">
        <h2 class="text-light text-lg font-semibold">Clothing</h2>
        <a
          v-for="(cat, id) in categories"
          :key="id"
          class="text-light text-sm font-semibold hover:cursor-pointer"
        >
          {{ cat.charAt(0).toUpperCase() + cat.slice(1) }}
        </a>
      </div>
      <div class="w-[12rem] h-[8rem] flex flex-col gap-1">
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
      <div class="w-[12rem] h-[8rem] flex flex-col gap-1">
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
