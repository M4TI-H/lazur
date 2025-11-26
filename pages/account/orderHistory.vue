<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
import { useFetchUserOrders } from "~/composables/orders/useFetchUserOrders";
const { scrollY } = useScroll();

const userStore = useUserStore();

const { orders, loading, refresh } = useFetchUserOrders();

onMounted(async () => {
  if (!userStore.isLoggedIn) {
    navigateTo("/account/login");
  }
  await refresh();
});

watch(
  () => userStore.isLoggedIn,
  (loggedIn) => {
    if (!loggedIn) {
      navigateTo("/account/login");
    }
  }
);
</script>

<template>
  <NavMenu :scrollY="scrollY" />
  <main
    class="w-full min-h-screen flex flex-col items-center bg-[#F8F9FA] overflow-y-auto overflow-x-hidden"
  >
    <section class="relative w-full h-[24rem] flex flex-col items-center">
      <img class="w-full h-full object-cover z-10" src="/ordersBg.jpg" />
      <div
        class="absolute z-30 w-full h-full bg-[#1F1D20]/70 flex flex-col items-center justify-center"
      >
        <h1
          class="text-2xl sm:text-3xl lg:text-4xl text-center text-light font-bold whitespace-nowrap"
        >
          Order history
        </h1>
      </div>
    </section>
    <section
      class="w-full md:w-[48rem] lg:w-[64rem] flex flex-col px-8 py-6 gap-8 md:gap-4"
    >
      <OrderInfo v-for="(order, id) in orders" :key="id" :order="order" />
    </section>
  </main>
  <Footer />
</template>
