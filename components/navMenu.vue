<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useMediaQuery } from "@vueuse/core";

const { scrollY } = defineProps<{
  scrollY: number;
}>();

const cartStore = useCartStore();
cartStore.loadFromStorage();

const expandGender = ref<boolean>(false);
const isMobile = useMediaQuery("(max-width: 767px)");
</script>

<template>
  <section
    :class="[
      scrollY > 50
        ? 'bg-[#1F1D20]/90'
        : expandGender
        ? ['flex', 'md:bg-none', 'bg-[#1F1D20]/90', 'transition-none']
        : ['bg-none', 'transition-colors', 'duration-500'],
    ]"
    class="fixed w-full h-[4rem] z-40 flex items-center justify-between pl-4 pr-2 md:px-8"
  >
    <p class="text-lg md:text-2xl text-light font-semibold">Lazur</p>
    <div class="flex items-center gap-4 md:gap-8">
      <NuxtLink
        to="/"
        class="size-[2rem] sm:size-auto sm:px-4 sm:py-1 rounded-full flex items-center justify-center hover:cursor-pointer transition duration-300 ease-in-out"
        :class="
          scrollY < 50 ? 'hover:bg-[#1F1D20]/30 active:bg-[#1F1D20]/30' : ''
        "
      >
        <i v-if="isMobile" class="pi pi-home text-xl text-light"></i>
        <p class="text-sm md:text-lg text-light font-thin hidden sm:block">
          Home
        </p>
      </NuxtLink>

      <div
        @mouseenter="expandGender = true"
        @mouseleave="expandGender = false"
        @click="isMobile ? (expandGender = !expandGender) : ''"
        class="relative size-[2rem] sm:w-[6rem] sm:px-4 sm:py-1 rounded-full flex items-center justify-center hover:cursor-pointer transition duration-300 ease-in-out"
      >
        <div class="absolute -bottom-4 left-0 w-full h-6"></div>
        <Icon v-if="isMobile" icon="tabler:shirt" class="text-2xl text-light" />
        <p class="text-sm md:text-lg text-light font-thin hidden sm:block">
          Garments
        </p>

        <!-- bigger screen buttons-->
        <div
          @mouseenter="expandGender = true"
          @click="expandGender = true"
          class="absolute top-[3rem] hidden flex-col items-center gap-1"
          :class="[expandGender ? 'md:flex' : 'hidden']"
        >
          <NuxtLink
            to="/garments/Men"
            class="w-[6rem] px-4 py-1 hover:bg-[#1F1D20] active:bg-[#1F1D20] text-center text-lg text-light font-thin rounded-full flex flex-col items-center justify-center z-20"
            >Men</NuxtLink
          >
          <NuxtLink
            to="/garments/Women"
            class="w-[6rem] px-4 py-1 hover:bg-[#1F1D20] active:bg-[#1F1D20] text-center text-lg text-light font-thin rounded-full flex flex-col items-center justify-center z-20"
            >Women</NuxtLink
          >
        </div>
      </div>

      <!-- mobile buttons -->
      <div
        @mouseenter="expandGender = true"
        @mouseleave="expandGender = false"
        @click="expandGender = true"
        class="flex-col absolute left-0 top-[4rem] w-full h-[5rem] bg-[#1F1D20]/90 overflow-hidden"
        :class="[expandGender ? 'flex' : 'hidden']"
      >
        <NuxtLink
          to="/garments/Men"
          class="w-full h-[2.5rem] sm:hidden active:bg-[#1F1D20] text-center text-sm text-light flex flex-col items-center justify-center"
          >Men</NuxtLink
        >
        <NuxtLink
          to="/garments/Women"
          class="w-full h-[2.5rem] sm:hidden active:bg-[#1F1D20] text-center text-sm text-light flex flex-col items-center justify-center"
          >Women</NuxtLink
        >
      </div>

      <NuxtLink
        to="/aboutus"
        :class="[
          'size-[2rem] sm:size-auto sm:px-4 sm:py-1 rounded-full flex items-center justify-center hover:cursor-pointer transition duration-300 ease-in-out',
          scrollY < 50 ? 'hover:bg-[#1F1D20]/30 active:bg-[#1F1D20]/30' : '',
        ]"
      >
        <i v-if="isMobile" class="pi pi-info-circle text-xl text-light"></i>
        <p class="text-sm md:text-lg text-light font-thin hidden sm:block">
          About Us
        </p>
      </NuxtLink>
      <NuxtLink
        to="/cart"
        :class="
          scrollY < 50
            ? ['hover:bg-[#1F1D20]/30', 'active:bg-[#1F1D20]/30']
            : ''
        "
        class="relative text-lg md:text-xl text-light size-[2rem] md:size-[2.5rem] rounded-full flex items-center justify-center hover:cursor-pointer transition duration-300 ease-in-out"
      >
        <i class="pi pi-shopping-cart text-xl text-light sm:hidden"></i>
        <div
          v-if="cartStore.itemCount > 0"
          class="absolute top-1 right-0 px-1 bg-blue-500 rounded-full flex items-center justify-center"
        >
          <p class="text-sm">
            {{ cartStore.itemCount > 99 ? "99+" : cartStore.itemCount }}
          </p>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>
