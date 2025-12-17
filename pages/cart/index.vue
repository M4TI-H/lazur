<script setup lang="ts">
const { scrollY } = useScroll();

const cartStore = useCartStore();
cartStore.loadFromStorage();
</script>

<template>
  <NavMenu :scrollY="scrollY" />
  <main class="w-full min-h-screen flex flex-col items-center bg-gray-100">
    <ImageHeader
      :title="`Your items`"
      :image="`https://images.unsplash.com/photo-1646586993466-27dedaf81659?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170`"
    />
    <template v-if="cartStore.cart.items.length > 0">
      <section
        class="w-full flex flex-col md:flex-row px-2 md:px-8 pb-[12rem] py-4 overflow-y-auto md:py-4"
      >
        <div
          class="w-full md:w-[70%] flex flex-col gap-4 md:pr-8 overflow-x-hidden"
        >
          <CartItem
            v-for="(item, id) in cartStore.cart.items"
            :key="id"
            :itemData="item"
          />
        </div>
        <CartSummary />
      </section>
    </template>
    <template v-else>
      <section
        class="w-full my-auto flex flex-col items-center justify-center gap-4"
      >
        <i class="pi pi-cart-plus text-gray-500 text-[6rem] sm:text-[8rem]"></i>
        <h2 class="text-gray-500 text-xl sm:text-2xl mb-8">
          The cart is empty.
        </h2>
        <h3 class="text-gray-500 text-lg font-semibold">Shop for</h3>
        <div class="flex items-center gap-8 sm:gap-12">
          <NuxtLink
            to="/garments/Men"
            class="w-[8rem] py-2 flex items-center justify-center rounded-md bg-gray-200 border border-gray-300 hover:bg-gray-300 font-semibold text-gray-500"
            >Men</NuxtLink
          >
          <NuxtLink
            class="w-[8rem] py-2 flex items-center justify-center rounded-md bg-gray-200 border border-gray-300 hover:bg-gray-300 font-semibold text-gray-500"
            to="/garments/Women"
            >Women</NuxtLink
          >
        </div>
      </section>
    </template>
  </main>
  <Footer class="hidden md:block" />
</template>
