<script setup lang="ts">
const { scrollY } = useScroll();

const cartStore = useCartStore();
cartStore.loadFromStorage();
</script>

<template>
  <NavMenu :scrollY="scrollY" />
  <main class="w-full min-h-screen flex flex-col items-center bg-[#F8F9FA]">
    <section
      class="w-full h-[10rem] md:h-[24rem] relative flex flex-col items-center"
    >
      <img
        class="w-full h-full object-cover z-10"
        src="https://images.unsplash.com/photo-1646586993466-27dedaf81659?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
      />
      <div
        class="absolute bg-[#1F1D20]/70 w-full h-full z-20 flex items-center justify-center"
      >
        <h1
          class="text-xl lg:text-4xl text-center text-light font-bold whitespace-nowrap"
        >
          Your items
        </h1>
      </div>
    </section>
    <template v-if="cartStore.cart.items.length > 0">
      <section
        class="w-full flex flex-col md:flex-row px-2 md:px-8 pb-[12rem] py-4 overflow-y-auto md:py-4"
      >
        <div class="w-full md:w-[70%] flex flex-col gap-4 md:pr-8">
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
      <p class="text-secondary text-lg font-semibold text-center mt-8">
        The cart is empty.
      </p>
    </template>
  </main>
  <Footer class="hidden md:block" />
</template>
