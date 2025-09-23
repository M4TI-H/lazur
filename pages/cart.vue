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
      class="w-full h-[28vh] md:h-[40vh] relative flex flex-col items-center"
    >
      <img
        class="w-full h-full object-cover z-10"
        src="https://static.vecteezy.com/system/resources/thumbnails/039/653/479/small_2x/ai-generated-stylish-blue-shopping-bags-against-a-matching-blue-background-conveying-a-modern-aesthetic-ai-generated-photo.jpg"
      />
      <div
        class="absolute bg-[#1F1D20]/70 w-full h-full z-20 flex items-center justify-center"
      >
        <h1
          class="text-xl md:text-4xl text-center text-light font-bold whitespace-nowrap"
        >
          Your items
        </h1>
      </div>
    </section>
    <div class="w-full flex flex-col md:flex-row px-2">
      <div class="md:w-[70vw] flex flex-col p-2 gap-2">
        <div class="w-full hidden md:flex py-2 bg-[#ddd] rounded-md">
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
      <div
        class="md:w-[30vw] h-[32rem] flex flex-col bg-[#ddd] px-8 py-4 gap-4 rounded-md mt-2"
      >
        <span class="w-full flex justify-between items-center">
          <h2 class="text-2xl text-primary font-semibold">Summary</h2>
          <p class="text-primary">{{ cartStore.itemCount }} Items</p>
        </span>

        <div class="flex flex-col gap-4">
          <span class="w-full flex items-center justify-between gap-2">
            <input
              type="text"
              placeholder="Name"
              class="w-[50%] h-[2.5rem] bg-white text-lg px-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Surname"
              class="w-[50%] h-[2.5rem] bg-white text-lg px-2 rounded-md"
            />
          </span>
          <input
            type="text"
            placeholder="Shipping address"
            class="w-full h-[2.5rem] bg-white text-lg px-2 rounded-md"
          />
          <span class="w-full flex items-center justify-between gap-2">
            <input
              type="text"
              placeholder="Email"
              class="w-[50%] h-[2.5rem] bg-white text-lg px-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Phone number"
              class="w-[50%] h-[2.5rem] bg-white text-lg px-2 rounded-md"
            />
          </span>
        </div>

        <div class="flex flex-col gap-1">
          <select class="w-full h-[2.5rem] bg-white text-lg px-2 rounded-md">
            <option>Standard delivery | $4.99</option>
            <option>Express delivery | $14.99</option>
            <option>Personal pickup | Free</option>
          </select>
        </div>
        <div class="w-full self-center h-[2px] bg-[#444]"></div>
        <span class="w-full flex justify-between items-center px-2">
          <p class="text-primary">Subtotal</p>
          <p class="text-primary">${{ cartStore.totalPrice }}</p>
        </span>
        <span class="w-full flex justify-between items-center px-2">
          <p class="text-primary">Shipping</p>
          <p class="text-primary">$4.99</p>
        </span>
        <span class="w-full flex justify-between items-center px-2">
          <p class="text-2xl text-primary font-semibold">Total</p>
          <p class="text-2xl text-primary font-semibold">
            ${{ cartStore.totalPrice }}
          </p>
        </span>
        <button
          class="w-[80%] max-w-[24rem] h-[2.5rem] bg-[#444] text-light rounded-md self-center mt-auto hover:cursor-pointer hover:bg-[#222] transition-color ease-in-out duration-200"
        >
          Continue
        </button>
      </div>
    </div>
  </main>
</template>
