<script setup lang="ts">
import { Icon } from "@iconify/vue";

const { scrollY } = defineProps<{
  scrollY: number;
}>();

const cartStore = useCartStore();
cartStore.loadFromStorage();

const expandGender = ref<boolean>(false);
</script>

<template>
  <section
    :class="scrollY > 50 ? 'bg-[#1F1D20]/90' : 'bg-none'"
    class="fixed w-full h-[4rem] z-40 flex items-center justify-between pl-4 pr-2 md:px-8 transition-colors duration-500"
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
        <Icon icon="tabler:home" class="text-2xl text-light sm:hidden" />
        <p class="text-sm md:text-lg text-light font-thin hidden sm:block">
          Home
        </p>
      </NuxtLink>

      <div
        @mouseenter="expandGender = true"
        @mouseleave="expandGender = false"
        class="relative size-[2rem] sm:size-auto sm:px-4 sm:py-1 rounded-full flex items-center justify-center hover:cursor-pointer transition duration-300 ease-in-out"
        :class="scrollY < 50 ? 'hover:bg-[#1F1D20]/30' : ''"
      >
        <div class="absolute -bottom-1 left-0 w-full h-2"></div>
        <Icon icon="tabler:shirt" class="text-2xl text-light sm:hidden" />
        <p class="text-sm md:text-lg text-light font-thin hidden sm:block">
          Garments
        </p>
        <div
          @mouseenter="expandGender = true"
          class="absolute w-full top-[2.5rem] flex-col gap-1"
          :class="[expandGender ? 'flex' : 'hidden']"
        >
          <NuxtLink
            to="/garments/Men"
            class="size-[2rem] sm:size-auto sm:px-4 sm:py-1 bg-[#1F1D20]/30 hover:bg-[#1F1D20]/80 active:bg-[#1F1D20]/80 text-center text-sm md:text-lg text-light font-thin hidden sm:block rounded-full"
            >Men</NuxtLink
          >
          <NuxtLink
            to="/garments/Women"
            class="size-[2rem] sm:size-auto sm:px-4 sm:py-1 bg-[#1F1D20]/30 hover:bg-[#1F1D20]/80 active:bg-[#1F1D20]/80 text-center text-sm md:text-lg text-light font-thin hidden sm:block rounded-full"
            >Women</NuxtLink
          >
        </div>
      </div>

      <NuxtLink
        to="/aboutus"
        :class="[
          'size-[2rem] sm:size-auto sm:px-4 sm:py-1 rounded-full flex items-center justify-center hover:cursor-pointer transition duration-300 ease-in-out',
          scrollY < 50 ? 'hover:bg-[#1F1D20]/30 active:bg-[#1F1D20]/30' : '',
        ]"
      >
        <Icon icon="tabler:info-circle" class="text-2xl text-light sm:hidden" />
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
        <i class="pi pi-shopping-bag transition duration-300 ease-in-out" />
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
