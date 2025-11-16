<script setup lang="ts">
import { useFetchOrder } from "~/composables/orders/useFetchOrder";
import { useFetchOneAddress } from "~/composables/users/addresses/useFetchAddress";
const route = useRoute();
const order_id = Number(route.params.order_id);
const address_id = Number(route.query.address_id);
const { scrollY } = useScroll();

const cartStore = useCartStore();
cartStore.loadFromStorage();
const userStore = useUserStore();
userStore.loadFromStorage();

const { order, orderLoading, orderRefresh } = useFetchOrder(order_id);
const { address, addressLoading, addressRefresh } =
  useFetchOneAddress(address_id);

onMounted(async () => {
  cartStore.clearStorage();
  await orderRefresh();
  await addressRefresh();
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
      class="fixed w-full sm:max-w-[24rem] xl:max-w-[28rem] h-full sm:h-auto sm:min-h-[36rem] sm:max-h-[44rem] p-4 gap-4 sm:gap-8 flex flex-col bg-white sm:border-2 border-[#ccc] sm:rounded-lg overflow-y-auto z-10"
    >
      <div class="w-full flex flex-col">
        <h2 class="text-xl font-semibold">Order has been placed.</h2>
        <p class="text-sm text-secondary">Thank you for shopping with Lazur.</p>
      </div>

      <div
        class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between sm:px-4 gap-1 sm:gap-0"
      >
        <p class="text-sm text-secondary">Name</p>
        <p class="font-semibold">{{ order.name }}</p>
      </div>
      <div
        class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between sm:px-4 gap-1 sm:gap-0"
      >
        <p class="text-sm text-secondary">Phone number</p>
        <p class="font-semibold">{{ order.phone }}</p>
      </div>
      <div
        class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between sm:px-4 gap-1 sm:gap-0"
      >
        <p class="text-sm text-secondary">Email address</p>
        <p class="font-semibold">{{ order.email }}</p>
      </div>

      <div class="w-full border-t-1 border-[#ccc]"></div>
      <div
        class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between sm:px-4 gap-1 sm:gap-0"
      >
        <p class="text-sm text-secondary">Delivery method</p>
        <p class="font-semibold">{{ order.delivery.name }}</p>
      </div>
      <div
        class="w-full flex flex-col sm:flex-row items-start justify-between sm:px-4 gap-1 sm:gap-0"
      >
        <template v-if="address">
          <p class="text-sm text-secondary">Delivery address</p>
          <div class="flex flex-col items-end">
            <p class="font-semibold">
              {{ address.street }} {{ address.building_num
              }}{{ address.flat_num ? `/${address.flat_num}` : "" }}
            </p>
            <p class="font-semibold">
              {{ address.postal_code }}, {{ address.city }}
            </p>
            <p class="font-semibold">{{ address.country }}</p>
          </div>
        </template>
        <template v-else>
          <i class="pi pi-spinner pi-spin"></i>
        </template>
      </div>

      <div class="w-full border-t-1 border-[#ccc]"></div>

      <span class="w-full flex justify-between items-center px-2">
        <p class="text-secondary md:text-lg font-semibold">Total</p>
        <p class="font-semibold md:text-lg">${{ order.total.toFixed(2) }}</p>
      </span>

      <div class="w-full flex flex-col items-center gap-2">
        <NuxtLink
          to="/review"
          class="w-[80%] max-w-[16rem] h-[2.5rem] flex items-center justify-center bg-[#445388] text-light rounded-md self-center mt-auto hover:cursor-pointer hover:bg-[#212842] transition-color ease-in-out duration-200"
        >
          Leave a review
        </NuxtLink>
        <NuxtLink
          to="/"
          class="text-sm text-secondary hover:cursor-pointer hover:underline"
        >
          Return to homepage
        </NuxtLink>
      </div>
    </section>
  </main>
</template>
