<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <section
    class="fixed w-full h-[4rem] z-40 flex items-center justify-between pl-4 pr-2 md:px-8 bg-[#1F1D20]/90"
  >
    <p class="text-lg md:text-2xl text-light font-semibold">Lazur</p>
    <div class="flex items-center gap-4 md:gap-8">
      <span
        class="size-[2rem] sm:w-[6rem] sm:h-[2rem] hover:bg-[#1F1D20]/30 active:bg-[#1F1D20]/30 rounded-full flex items-center justify-center hover:cursor-pointer transition duration-300 ease-in-out"
      >
        <Icon icon="tabler:shirt" class="text-2xl text-light sm:hidden" />
        <p class="text-sm md:text-lg text-light font-thin hidden sm:block">
          Garments
        </p>
      </span>
      <span
        class="size-[2rem] sm:w-[6rem] sm:h-[2rem] hover:bg-[#1F1D20]/30 active:bg-[#1F1D20]/30 rounded-full flex items-center justify-center hover:cursor-pointer transition duration-300 ease-in-out"
      >
        <Icon
          icon="tabler:brand-safari"
          class="text-2xl text-light sm:hidden"
        />
        <p class="text-sm md:text-lg text-light font-thin hidden sm:block">
          Explore
        </p>
      </span>
      <span
        class="size-[2rem] sm:w-[6rem] sm:h-[2rem] hover:bg-[#1F1D20]/30 active:bg-[#1F1D20]/30 rounded-full flex items-center justify-center hover:cursor-pointer transition duration-300 ease-in-out"
      >
        <Icon icon="tabler:info-circle" class="text-2xl text-light sm:hidden" />
        <p class="text-sm md:text-lg text-light font-thin hidden sm:block">
          About Us
        </p>
      </span>
      <a
        class="text-2xl md:text-2xl text-light size-[2rem] md:size-[2.5rem] hover:bg-[#1F1D20]/30 active:bg-[#1F1D20]/30 rounded-full flex items-center justify-center hover:cursor-pointer transition duration-300 ease-in-out"
      >
        <Icon icon="tabler:shopping-bag" />
      </a>
    </div>
  </section>
</template>
/
