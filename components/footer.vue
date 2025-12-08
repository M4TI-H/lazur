<script setup lang="ts"></script>

<template>
  <section
    class="relative w-full min-h-[12rem] bg-black/90 flex flex-col items-center py-8 px-4 md:px-16"
  >
    <div
      class="w-full flex flex-wrap sm:flex-nowrap sm:items-center justify-between"
    >
      <div
        class="w-full sm:w-1/3 min-h-[8rem] mb-2 flex flex-col items-center gap-1"
      >
        <div class="flex sm:flex-col items-baseline gap-4">
          <h2 class="text-slate-200 text-3xl font-semibold">Lazur</h2>
          <p class="text-slate-200 font-semibold">Premium clothing</p>
        </div>

        <span
          class="flex items-center gap-2 mt-2 sm:mt-4 text-slate-200 text-sm"
        >
          <i class="pi pi-phone text-slate-200 text-xs"></i>
          +11 123 456 789
        </span>
        <span class="flex items-center gap-2 text-slate-200 text-sm">
          <i class="pi pi-envelope text-slate-200 text-xs"></i>
          lazur@contact.com
        </span>
        <span class="flex items-center gap-2 text-slate-200 text-sm">
          <i class="pi pi-home text-slate-200 text-xs"></i>
          Gdansk, Złota 10
        </span>
      </div>

      <div
        class="w-1/2 sm:w-1/3 min-h-[8rem] flex flex-col items-center mt-2 md:mt-0 gap-1"
      >
        <h2 class="text-slate-200 text-lg font-semibold">Pages</h2>
        <a class="text-slate-200 text-sm font-semibold cursor-pointer">Home</a>
        <a class="text-slate-200 text-sm font-semibold cursor-pointer">Men</a>
        <a class="text-slate-200 text-sm font-semibold cursor-pointer">Women</a>
        <a class="text-slate-200 text-sm font-semibold cursor-pointer"
          >About us</a
        >
        <a class="text-slate-200 text-sm font-semibold cursor-pointer">Cart</a>
      </div>
      <div
        class="w-1/2 sm:w-1/3 min-h-[8rem] flex flex-col items-center mt-2 md:mt-0 gap-1"
      >
        <h2 class="text-slate-200 text-lg font-semibold">Useful</h2>
        <a class="text-slate-200 text-sm font-semibold cursor-pointer"
          >Privacy policy</a
        >
        <a class="text-slate-200 text-sm font-semibold cursor-pointer"
          >Delivery fees</a
        >
        <a class="text-slate-200 text-sm font-semibold cursor-pointer"
          >Find shop</a
        >
        <a class="text-slate-200 text-sm font-semibold cursor-pointer"
          >Returns</a
        >
        <a class="text-slate-200 text-sm font-semibold cursor-pointer"
          >Career</a
        >
      </div>
    </div>
    <p class="absolute text-slate-200 text-xs bottom-2 right-4">
      Lazur@2025 All rights reserved
    </p>
  </section>
</template>
