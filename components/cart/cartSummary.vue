<script setup lang="ts">
import { useFetchDelivery } from "~/composables/orders/useFetchDelivery";

const cartStore = useCartStore();
cartStore.loadFromStorage();

const { deliveries, deliveryLoading, deliveryRefresh } = useFetchDelivery();

const cheapestDeliveryCost = computed(() => {
  if (!deliveries.value?.length) return 0;
  return Math.min(...deliveries.value.map((d) => d.cost));
});

onMounted(async () => {
  await deliveryRefresh();
});
</script>

<template>
  <div
    class="w-full md:w-[30%] h-[16rem] md:h-[22rem] fixed bottom-0 md:relative flex flex-col px-4 py-2 md:py-4 gap-2 md:gap-4 bg-white border-t-1 md:border-1 border-[#ccc] md:rounded-lg"
  >
    <div class="w-full hidden md:flex justify-center items-center gap-2">
      <i class="pi pi-shopping-cart text-2xl xl:text-3xl"></i>
      <h1 class="text-xl xl:text-2xl font-semibold">Your cart</h1>
    </div>
    <div class="w-full flex justify-between items-center">
      <h2 class="text-lg md:text-xl font-semibold">Summary</h2>
      <p class="md:text-lg text-secondary">{{ cartStore.itemCount }} Items</p>
    </div>
    <div class="w-full border-t-1 border-[#ccc]"></div>
    <div class="w-full flex justify-between items-center px-1 mt-auto">
      <p class="text-secondary md:text-lg">Subtotal</p>
      <p class="font-semibold md:text-lg">${{ cartStore.totalPrice }}</p>
    </div>
    <div class="w-full flex justify-between items-center px-1">
      <p class="text-secondary md:text-lg">Delivery</p>
      <p class="font-semibold md:text-lg">
        <span class="text-secondary text-xs md:text-sm">from </span>${{
          cheapestDeliveryCost.toFixed(2)
        }}
      </p>
    </div>
    <div class="w-full border-t-1 border-[#ccc]"></div>
    <div class="w-full flex justify-between items-center px-1 mt-auto">
      <p class="text-secondary md:text-lg font-semibold">Total</p>
      <p class="font-semibold md:text-lg">
        ${{
          Number(cartStore.totalPrice) + Number(cheapestDeliveryCost.toFixed(2))
        }}
      </p>
    </div>
    <NuxtLink
      to="cart/order"
      class="w-[80%] max-w-[24rem] h-[2rem] md:h-[2.5rem] flex items-center justify-center bg-[#445388] text-light rounded-md self-center mt-auto hover:bg-[#212842] hover:cursor-pointer transition-color ease-in-out duration-200"
    >
      Continue
    </NuxtLink>
  </div>
</template>
