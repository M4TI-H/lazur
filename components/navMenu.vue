<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useMediaQuery } from "@vueuse/core";

const { scrollY } = defineProps<{
  scrollY: number;
}>();

const cartStore = useCartStore();
cartStore.loadFromStorage();
const userStore = useUserStore();

const expandGender = ref<boolean>(false);
const expandAccount = ref<boolean>(false);
const isMobile = useMediaQuery("(max-width: 767px)");
</script>

<template>
  <section
    :class="[
      scrollY > 50
        ? 'bg-stone-800/90'
        : expandGender || expandAccount
        ? ['flex', 'md:bg-none', 'bg-stone-800/90']
        : ['bg-none'],
    ]"
    class="fixed w-full h-[4rem] z-40 flex items-center justify-between pl-4 pr-2 md:px-8"
  >
    <p class="text-lg md:text-2xl text-gray-200 font-semibold">Lazur</p>
    <div class="flex items-center gap-4 md:gap-8">
      <NuxtLink
        to="/"
        class="size-[2rem] md:size-auto sm:px-4 sm:py-1 rounded-full flex items-center justify-center cursor-pointer transition duration-300 ease-in-out"
        :class="
          scrollY < 50 ? 'hover:bg-stone-800/30 active:bg-stone-800/30' : ''
        "
      >
        <i v-if="isMobile" class="pi pi-home text-xl text-gray-200"></i>
        <p v-if="!isMobile" class="text-sm md:text-lg text-gray-200 font-thin">
          Home
        </p>
      </NuxtLink>

      <div
        @mouseenter="expandGender = true"
        @mouseleave="expandGender = false"
        @click="expandGender = !expandGender"
        class="relative size-[2rem] sm:size-auto sm:px-4 sm:py-1 rounded-full flex items-center justify-center cursor-pointer transition duration-300 ease-in-out"
        :class="
          scrollY < 50 ? 'hover:bg-stone-800/30 active:bg-stone-800/30' : ''
        "
      >
        <div class="absolute -bottom-4 left-0 w-full h-6"></div>
        <Icon
          v-if="isMobile"
          icon="tabler:shirt"
          class="text-2xl text-gray-200"
        />
        <p v-if="!isMobile" class="text-sm md:text-lg text-gray-200 font-thin">
          Garments
        </p>

        <!-- bigger screen buttons-->
        <div
          v-if="!isMobile"
          class="w-full absolute top-[3rem] flex-col items-center gap-1"
          :class="expandGender ? 'flex' : 'hidden'"
        >
          <NuxtLink
            to="/garments/Men"
            class="w-[6rem] px-4 py-1 hover:bg-stone-800 active:bg-stone-800 text-center text-lg text-gray-200 font-thin rounded-full flex items-center justify-center z-20"
            >Men</NuxtLink
          >
          <NuxtLink
            to="/garments/Women"
            class="w-[6rem] px-4 py-1 hover:bg-stone-800 active:bg-stone-800 text-center text-lg text-gray-200 font-thin rounded-full flex items-center justify-center z-20"
            >Women</NuxtLink
          >
        </div>
      </div>

      <div
        @mouseenter="expandGender = true"
        @mouseleave="expandGender = false"
        @click="expandGender = true"
        class="flex-col absolute left-0 top-[4rem] w-full h-[5rem] overflow-hidden bg-stone-800/90"
        :class="expandGender ? 'flex' : 'hidden'"
      >
        <NuxtLink
          v-if="isMobile"
          to="/garments/Men"
          class="w-full h-[2.5rem] active:bg-stone-800 text-center text-sm text-gray-200 flex items-center justify-center z-20"
          >Men</NuxtLink
        >
        <NuxtLink
          v-if="isMobile"
          to="/garments/Women"
          class="w-full h-[2.5rem] active:bg-stone-800 text-center text-sm text-gray-200 flex items-center justify-center z-20"
          >Women</NuxtLink
        >
      </div>

      <div
        @mouseenter="expandAccount = true"
        @mouseleave="expandAccount = false"
        @click="expandAccount = !expandAccount"
        class="relative size-[2rem] md:size-auto sm:px-4 sm:py-1 rounded-full flex items-center justify-center cursor-pointer transition duration-300 ease-in-out"
        :class="
          scrollY < 50 ? 'hover:bg-stone-800/30 active:bg-stone-800/30' : ''
        "
      >
        <div class="absolute -bottom-4 left-0 w-full h-6"></div>
        <i v-if="isMobile" class="pi pi-user text-lg text-gray-200"></i>
        <p v-if="!isMobile" class="text-sm md:text-lg text-gray-200 font-thin">
          Account
        </p>

        <div
          v-if="!isMobile"
          class="absolute top-[3rem] flex-col items-center gap-1"
          :class="expandAccount ? 'flex' : 'hidden'"
        >
          <NuxtLink
            v-if="userStore.isLoggedIn"
            to="/account"
            class="w-[6rem] px-4 py-1 hover:bg-stone-800 active:bg-stone-800 text-center text-lg text-gray-200 font-thin rounded-full flex items-center justify-center z-20"
            >Settings</NuxtLink
          >
          <NuxtLink
            v-if="userStore.isLoggedIn"
            to="/account/orderHistory"
            class="w-[8.5rem] px-4 py-1 hover:bg-stone-800 active:bg-stone-800 text-center text-lg text-gray-200 font-thin rounded-full flex items-center justify-center z-20"
            >Order history</NuxtLink
          >
          <button
            v-if="userStore.isLoggedIn"
            @click="userStore.signOut()"
            class="w-[6rem] px-4 py-1 hover:bg-stone-800 active:bg-stone-800 text-center text-lg text-gray-200 font-thin rounded-full flex items-center justify-center z-20 cursor-pointer"
          >
            Sign out
          </button>
          <NuxtLink
            v-if="!userStore.isLoggedIn"
            to="/account/login"
            class="w-[6rem] px-4 py-1 hover:bg-stone-800 active:bg-stone-800 text-center text-lg text-gray-200 font-thin rounded-full flex flex-col items-center justify-center z-20"
            >Sign in</NuxtLink
          >
        </div>
      </div>

      <div
        @mouseenter="expandAccount = true"
        @mouseleave="expandAccount = false"
        @click="expandAccount = true"
        class="flex-col absolute left-0 top-[4rem] w-full overflow-hidden bg-stone-800/90"
        :class="[
          expandAccount ? 'flex' : 'hidden',
          userStore.isLoggedIn ? 'h-[7.5rem]' : 'h-[3rem]',
        ]"
      >
        <NuxtLink
          v-if="userStore.isLoggedIn && isMobile"
          to="/account"
          class="w-full h-[2.5rem] active:bg-stone-800 text-center text-sm text-gray-200 flex flex-col items-center justify-center"
          >Settings</NuxtLink
        >
        <NuxtLink
          v-if="userStore.isLoggedIn && isMobile"
          to="/account/orderHistory"
          class="w-full h-[2.5rem] active:bg-stone-800 text-center text-sm text-gray-200 flex flex-col items-center justify-center"
          >Order history</NuxtLink
        >
        <button
          v-if="userStore.isLoggedIn && isMobile"
          @click="userStore.signOut()"
          class="w-full h-[2.5rem] active:bg-stone-800 text-center text-sm text-gray-200 flex flex-col items-center justify-center"
        >
          Sign out
        </button>
        <NuxtLink
          v-if="!userStore.isLoggedIn && isMobile"
          to="/account/login"
          class="w-full h-[2.5rem] active:bg-stone-800 text-center text-sm text-gray-200 flex flex-col items-center justify-center"
          >Sign in</NuxtLink
        >
      </div>

      <NuxtLink
        to="/aboutus"
        :class="[
          'size-[2rem] md:size-auto sm:px-4 sm:py-1 rounded-full flex items-center justify-center cursor-pointer transition duration-300 ease-in-out',
          scrollY < 50 ? 'hover:bg-stone-800/30 active:bg-stone-800/30' : '',
        ]"
      >
        <i v-if="isMobile" class="pi pi-info-circle text-lg text-gray-200"></i>
        <p v-if="!isMobile" class="text-sm md:text-lg text-gray-200 font-thin">
          About Us
        </p>
      </NuxtLink>

      <NuxtLink
        to="/cart"
        :class="
          scrollY < 50
            ? ['hover:bg-stone-800/30', 'active:bg-stone-800/30']
            : ''
        "
        class="relative text-lg md:text-xl text-gray-200 size-[2rem] md:size-[2.5rem] rounded-full flex items-center justify-center cursor-pointer transition duration-300 ease-in-out"
      >
        <i class="pi pi-shopping-cart text-xl text-gray-200 sm:hidden"></i>
        <div
          v-if="cartStore.itemCount > 0"
          class="absolute top-1 right-0 px-1 bg-sky-700 rounded-full flex items-center justify-center"
        >
          <p class="text-sm">
            {{ cartStore.itemCount > 99 ? "99+" : cartStore.itemCount }}
          </p>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>
