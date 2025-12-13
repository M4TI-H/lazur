<script setup lang="ts">
import { useFetchOrder } from "~/composables/orders/useFetchOrder";
const route = useRoute();
const order_id = Number(route.params.order_id);
const token = String(route.query.token);
const { scrollY } = useScroll();

const cartStore = useCartStore();
cartStore.loadFromStorage();
const userStore = useUserStore();

const { order, orderLoading, orderRefresh } = useFetchOrder(
  order_id,
  token,
  userStore.isLoggedIn
);

onMounted(async () => {
  cartStore.clearStorage();
  await orderRefresh();
});
</script>

<template>
  <NavMenu :scrollY="scrollY" />
  <main
    class="w-full min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden"
  >
    <section class="absolute z-10 w-full h-full">
      <img
        class="w-full h-full object-cover"
        src="https://static.vecteezy.com/system/resources/thumbnails/039/653/479/small_2x/ai-generated-stylish-blue-shopping-bags-against-a-matching-blue-background-conveying-a-modern-aesthetic-ai-generated-photo.jpg"
      />
      <div class="absolute inset-0 bg-black/60"></div>
    </section>

    <section
      v-if="order"
      class="fixed w-full sm:max-w-[24rem] xl:max-w-[28rem] h-full sm:h-auto sm:min-h-[36rem] sm:max-h-[44rem] p-4 gap-4 sm:gap-8 flex flex-col bg-white sm:border-2 border-gray-300 sm:rounded-lg overflow-y-auto z-10"
    >
      <div class="w-full flex flex-col">
        <h2 class="text-xl font-semibold">Order has been placed.</h2>
        <p class="text-sm text-gray-500">Thank you for shopping with Lazur.</p>
      </div>

      <div
        class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between sm:px-4 gap-1 sm:gap-0"
      >
        <p class="text-sm text-gray-500">Name</p>
        <p class="font-semibold">{{ order.name }}</p>
      </div>
      <div
        class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between sm:px-4 gap-1 sm:gap-0"
      >
        <p class="text-sm text-gray-500">Phone number</p>
        <p class="font-semibold">{{ order.phone }}</p>
      </div>
      <div
        class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between sm:px-4 gap-1 sm:gap-0"
      >
        <p class="text-sm text-gray-500">Email address</p>
        <p class="font-semibold">{{ order.email }}</p>
      </div>

      <div class="w-full border-t-1 border-gray-300"></div>
      <div
        class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between sm:px-4 gap-1 sm:gap-0"
      >
        <p class="text-sm text-gray-500">Delivery method</p>
        <p class="font-semibold">{{ order.delivery.name }}</p>
      </div>
      <div
        class="w-full flex flex-col sm:flex-row items-start justify-between sm:px-4 gap-1 sm:gap-0"
      >
        <template v-if="order.address">
          <p class="text-sm text-gray-500">Delivery address</p>
          <div class="flex flex-col items-end">
            <p class="font-semibold">
              {{ order.address.street }}
              {{ order.address.building_num
              }}{{ order.address.flat_num ? `/${order.address.flat_num}` : "" }}
            </p>
            <p class="font-semibold">
              {{ order.address.postal_code }},
              {{ order.address.city }}
            </p>
            <p class="font-semibold">{{ order.address.country }}</p>
          </div>
        </template>
        <template v-else>
          <i class="pi pi-spinner pi-spin"></i>
        </template>
      </div>

      <div class="w-full border-t-1 border-gray-300"></div>

      <span class="w-full flex justify-between items-center px-2">
        <p class="text-gray-500 md:text-lg font-semibold">Total</p>
        <p class="font-semibold md:text-lg">${{ order.total.toFixed(2) }}</p>
      </span>

      <div class="w-full flex flex-col items-center gap-2">
        <NuxtLink
          to="/review"
          class="max-w-[12rem] w-full h-[2.5rem] bg-sky-800 rounded-md mt-auto self-end flex items-center justify-center cursor-pointer text-gray-200 hover:bg-sky-900 active:bg-sky-900 transition-color ease-in-out duration-200 mx-auto"
        >
          Leave a review
        </NuxtLink>
        <NuxtLink
          to="/"
          class="text-sm text-gray-500 cursor-pointer hover:underline"
        >
          Return to homepage
        </NuxtLink>
      </div>
    </section>
  </main>
</template>
