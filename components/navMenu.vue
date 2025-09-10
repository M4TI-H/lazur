<script setup lang="ts">
import { Icon } from "@iconify/vue";

const { scrollY } = defineProps<{
  scrollY: number;
}>();
</script>

<template>
  <section
    :class="scrollY > 50 ? 'bg-[#1F1D20]/90' : 'bg-none'"
    class="fixed w-full h-[4rem] z-40 flex items-center justify-between pl-4 pr-2 md:px-8 transition-colors duration-500"
  >
    <NuxtLink to="/" class="text-lg md:text-2xl text-light font-semibold"
      >Lazur</NuxtLink
    >
    <div class="flex items-center gap-4 md:gap-8">
      <span
        class="group size-[2rem] sm:w-[6rem] sm:h-[2rem] rounded-full flex items-center justify-center hover:cursor-pointer transition duration-300 ease-in-out"
        :class="
          scrollY < 50 ? 'hover:bg-[#1F1D20]/30 active:bg-[#1F1D20]/30' : ''
        "
      >
        <Icon icon="tabler:shirt" class="text-2xl text-light sm:hidden" />
        <NuxtLink
          to="/garments"
          class="text-sm md:text-lg text-light font-thin hidden sm:block"
        >
          Garments
        </NuxtLink>
      </span>
      <span
        :class="[
          'group size-[2rem] sm:w-[6rem] sm:h-[2rem] rounded-full flex items-center justify-center hover:cursor-pointer transition duration-300 ease-in-out',
          scrollY < 50 ? 'hover:bg-[#1F1D20]/30 active:bg-[#1F1D20]/30' : '',
        ]"
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
        :class="[
          'size-[2rem] sm:w-[6rem] sm:h-[2rem] rounded-full flex items-center justify-center hover:cursor-pointer transition duration-300 ease-in-out',
          scrollY < 50 ? 'hover:bg-[#1F1D20]/30 active:bg-[#1F1D20]/30' : '',
        ]"
      >
        <Icon icon="tabler:info-circle" class="text-2xl text-light sm:hidden" />
        <p class="text-sm md:text-lg text-light font-thin hidden sm:block">
          About Us
        </p>
      </span>
      <a
        :class="
          scrollY < 50
            ? ['hover:bg-[#1F1D20]/30', 'active:bg-[#1F1D20]/30']
            : ''
        "
        class="text-2xl md:text-2xl text-light size-[2rem] md:size-[2.5rem] rounded-full flex items-center justify-center hover:cursor-pointer transition duration-300 ease-in-out"
      >
        <Icon
          icon="tabler:shopping-bag"
          class="transition duration-300 ease-in-out"
        />
      </a>
    </div>
  </section>
</template>
