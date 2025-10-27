<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
import Item from "~/components/account/orderHistory/item.vue";
const { scrollY } = useScroll();

const userStore = useUserStore();
userStore.loadFromStorage();

onMounted(() => {
  if (!userStore.isLoggedIn) {
    navigateTo("/account/login");
  }
});

watch(
  () => userStore.isLoggedIn,
  (loggedIn) => {
    if (!loggedIn) {
      navigateTo("/account/login");
    }
  }
);

const isMobile = useMediaQuery("(max-width: 767px)");
</script>

<template>
  <NavMenu :scrollY="scrollY" />
  <main
    class="w-full min-h-screen flex flex-col items-center bg-[#F8F9FA] overflow-y-auto overflow-x-hidden"
  >
    <section class="relative w-full h-[16rem] flex flex-col items-center">
      <img
        class="w-full h-full object-cover z-10"
        src="https://images.unsplash.com/photo-1736248434061-2f5edd04a423?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880"
      />
      <div
        class="absolute z-30 w-full h-full bg-[#1F1D20]/70 flex flex-col items-center justify-center py-16 gap-2 lg:gap-4"
      >
        <h1
          class="text-2xl sm:text-3xl lg:text-4xl text-center text-light font-bold whitespace-nowrap"
        >
          Order history
        </h1>
      </div>
    </section>
    <section
      class="w-full md:w-[48rem] lg:w-[64rem] flex flex-col px-4 py-8 gap-8 md:gap-4"
    >
      <Item
        v-for="(order, id) in 5"
        :key="id"
        @click="isMobile ? console.log('rozwin') : ''"
      />
    </section>
  </main>
  <Footer />
</template>
