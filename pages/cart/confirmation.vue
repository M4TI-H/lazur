<script setup lang="ts">
import { useFetchOrder } from "~/composables/orders/useFetchOrder";

const { scrollY } = useScroll();

const orderStore = useOrderStore();
orderStore.loadFromStorage();
const cartStore = useCartStore();
cartStore.loadFromStorage();

const { order, loading, refresh } = useFetchOrder(orderStore.orderData.id);

onMounted(async () => {
  if (!orderStore.orderData.id) {
    navigateTo("/");
  }

  await refresh();
  orderStore.clearStorage();
  cartStore.clearStorage();
});
</script>

<template>
  <NavMenu :scrollY="scrollY" />
  <main
    class="w-full min-h-screen flex flex-col items-center justify-center bg-[#F8F9FA] overflow-hidden"
  >
    <section class="absolute z-10 w-full h-full">
      <img
        class="w-full h-full object-cover"
        src="https://static.vecteezy.com/system/resources/thumbnails/039/653/479/small_2x/ai-generated-stylish-blue-shopping-bags-against-a-matching-blue-background-conveying-a-modern-aesthetic-ai-generated-photo.jpg"
      />
      <div class="absolute inset-0 bg-[#1F1D20]/70"></div>
    </section>

    <section
      v-if="order"
      class="lg:w-[24vw] max-w-[90vw] max-h-[40rem] h-min flex flex-col bg-[#ddd] px-4 lg:px-8 py-4 gap-4 rounded-md z-10"
    >
      <h2 class="text-2xl font-semibold">Order has been sent</h2>

      <div class="w-full">
        <p class="text-sm text-secondary">Name & Surname</p>
        <p class="text-lg">{{ order.name }} {{ order.surname }}</p>
      </div>
      <div class="w-full">
        <p class="text-sm text-secondary">Email</p>
        <p class="text-lg">{{ order.email }}</p>
      </div>
      <div class="w-full">
        <p class="text-sm text-secondary">Phone number</p>
        <p class="text-lg">{{ order.phone }}</p>
      </div>
      <div class="w-full">
        <p class="text-sm text-secondary">Delivery address</p>
        <p class="text-lg">{{ order.address }}</p>
      </div>

      <div class="w-full self-center h-[2px] bg-[#444]"></div>

      <span class="w-full flex justify-between items-center px-2">
        <p class="text-2xl font-semibold">Total</p>
        <p class="text-2xl font-semibold">${{ order.total.toFixed(2) }}</p>
      </span>

      <NuxtLink
        to="/"
        class="w-[80%] max-w-[24rem] h-[2.5rem] flex items-center justify-center bg-[#444] text-light rounded-md self-center mt-4 hover:cursor-pointer hover:bg-[#222] transition-color ease-in-out duration-200"
      >
        Back to shop
      </NuxtLink>
      <NuxtLink
        to="/review"
        class="w-[80%] max-w-[24rem] h-[2.5rem] flex items-center justify-center border-2 border-[#444] text-[#444] rounded-md self-center hover:cursor-pointer hover:bg-[#b6b6b6] transition-color ease-in-out duration-200"
      >
        Leave a review
      </NuxtLink>
    </section>
  </main>
</template>
