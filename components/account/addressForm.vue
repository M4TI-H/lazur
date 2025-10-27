<script setup lang="ts">
// @ts-ignore
import { getNames } from "country-list";
const countries = getNames();

const selectedCountry = ref<string>();
</script>

<template>
  <div
    class="w-full min-w-[12rem] max-w-[18rem] md:max-w-[24rem] xl:max-w-[28rem] h-[32rem] p-4 gap-8 flex flex-col bg-[#eee] rounded-lg"
  >
    <h2 class="text-xl font-semibold">New address</h2>
    <div class="w-full flex items-center justify-between px-4">
      <p class="text-sm text-secondary">Country</p>
      <select
        v-model="selectedCountry"
        class="w-[16rem] h-[2.5rem] bg-white text-lg px-2 rounded-md"
      >
        <option disabled value="">Select a country</option>
        <option v-for="country in countries" :key="country" :value="country">
          {{ country }}
        </option>
      </select>
    </div>

    <div class="w-full flex items-center justify-between px-4">
      <p class="text-sm text-secondary">City</p>
      <input
        type="text"
        class="w-[16rem] h-[2.5rem] bg-white text-lg px-2 rounded-md"
      />
    </div>
    <div class="w-full flex items-center justify-between px-4">
      <p class="text-sm text-secondary">Postal code</p>
      <input
        type="text"
        class="w-[16rem] h-[2.5rem] bg-white text-lg px-2 rounded-md"
      />
    </div>
    <div class="w-full flex items-center justify-between px-4">
      <p class="text-sm text-secondary">Street name</p>
      <input
        type="text"
        class="w-[16rem] h-[2.5rem] bg-white text-lg px-2 rounded-md"
      />
    </div>
    <div class="w-full flex items-center justify-between px-4">
      <p class="text-sm text-secondary">Building / Apt.</p>
      <div class="w-[16rem] flex justify-between">
        <input
          type="text"
          class="w-[7.5rem] h-[2.5rem] bg-white text-lg px-2 rounded-md"
        />
        <input
          type="text"
          class="w-[7.5rem] h-[2.5rem] bg-white text-lg px-2 rounded-md"
        />
      </div>
    </div>
    <button
      class="w-[80%] max-w-[24rem] h-[2.5rem] bg-[#445388] text-light rounded-md self-center mt-auto hover:cursor-pointer hover:bg-[#212842] transition-color ease-in-out duration-200"
    >
      Confirm
    </button>
    <button
      class="hidden w-[80%] max-w-[24rem] h-[2.5rem] bg-[#445388]/80 text-light rounded-md self-center mt-auto"
    >
      Confirm
    </button>
    <button
      class="hidden w-[80%] max-w-[24rem] h-[2.5rem] bg-[#445388] text-light rounded-md self-center mt-auto"
    >
      <i class="pi pi-spin pi-spinner"></i>
    </button>
  </div>
</template>
