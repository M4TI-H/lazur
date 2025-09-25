<script setup lang="ts">
const { scrollY } = useScroll();

const cartStore = useCartStore();
cartStore.loadFromStorage();
</script>

<template>
  <NavMenu :scrollY="scrollY" />
  <main
    class="w-full min-h-screen flex flex-col items-center bg-[#F8F9FA] overflow-y-auto"
  >
    <section
      class="w-full h-[28vh] lg:h-[40vh] relative flex flex-col items-center"
    >
      <img
        class="w-full h-full object-cover z-10"
        src="https://static.vecteezy.com/system/resources/thumbnails/039/653/479/small_2x/ai-generated-stylish-blue-shopping-bags-against-a-matching-blue-background-conveying-a-modern-aesthetic-ai-generated-photo.jpg"
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
    <div
      class="w-full flex flex-col lg:flex-row items-center lg:items-start px-2"
    >
      <div class="lg:w-[70vw] flex flex-col p-2 gap-2">
        <div class="w-full hidden lg:flex py-2 bg-[#ddd] rounded-md">
          <p class="w-1/10 text-secondary font-semibold text-center">Remove</p>
          <p class="w-2/5 text-secondary font-semibold px-2 text-center">
            Product
          </p>
          <p class="w-1/10 text-secondary font-semibold text-center">Size</p>
          <p class="w-1/5 text-secondary font-semibold text-center">Quantity</p>
          <p class="w-1/5 text-secondary font-semibold text-center">
            Unit price
          </p>
        </div>
        <CartItem
          v-for="(item, id) in cartStore.cart.items"
          :key="id"
          :itemData="item"
        />
      </div>
      <CartSummary />
    </div>
  </main>
</template>
