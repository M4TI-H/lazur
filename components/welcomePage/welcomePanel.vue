<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <section class="relative w-full h-screen flex flex-col items-center">
    <img
      class="w-full h-full object-cover z-10"
      src="https://images.unsplash.com/photo-1610275504335-f2b494fbe239?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    />
    <div
      class="absolute bg-[#1F1D20]/70 w-full h-full z-20 flex items-center justify-center"
    >
      <div
        class="absolute z-30 p-8 flex flex-col items-center mt-16 md:mt-24 gap-2 md:gap-4"
      >
        <h1
          class="text-xl md:text-4xl text-center text-light font-bold whitespace-nowrap"
        >
          Make Your Wardrobe More<br />Minimalistic & Modern
        </h1>
        <h3
          class="md:text-xl text-center text-light font-thin max-w-[16rem] md:max-w-[22rem]"
        >
          Turn your wardrobe with Lazur into a more minimalist and modern style
          with ease and speed
        </h3>
        <div
          class="relative w-[18rem] md:w-[24rem] h-[3rem] flex items-center mt-4 md:mt-8"
        >
          <span
            class="absolute right-3 bg-[#445388] size-[2rem] rounded-full flex items-center justify-center z-20 hover:cursor-pointer"
          >
            <Icon icon="tabler:search" class="text-[#DEE2E6] text-lg" />
          </span>
          <input
            type="text"
            placeholder="Search garments"
            class="bg-[#1F1D20]/50 backdrop-blur-sm focus:bg-[#1F1D20]/60 focus:backdrop-blur-md placeholder-[#CED4DA] placeholder:font-thin text-light w-full h-full rounded-full px-4 border border-[#DEE2E6] outline-none transition duration-500 ease-in-out"
          />
        </div>
      </div>
    </div>
  </section>
</template>
