<script setup lang="ts">
import type Garment from "~/types/Garment";

const { itemData } = defineProps<{
  itemData: Garment & { quantity: number; size: string };
}>();

const cartStore = useCartStore();
cartStore.loadFromStorage();
</script>

<template>
  <div
    class="relative w-full h-[10rem] md:h-[15rem] flex items-center p-2 md:p-4 bg-white border-1 border-[#ccc] rounded-lg"
  >
    <button
      @click="cartStore.removeFromCart(itemData.id, itemData.size)"
      class="absolute top-4 right-2 md:right-4 p-1 md:p-2 flex items-center justify-center rounded-full hover:bg-[#ccc]/50 active:bg-[#ccc]/50 hover:cursor-pointer transition-colors duration-150"
    >
      <i class="pi pi-trash text-secondary text-sm md:text-lg"></i>
    </button>
    <NuxtLink
      :to="`/garments/${itemData.gender}/itemDetails/${itemData.id}`"
      draggable="false"
    >
      <img
        draggable="false"
        src="https://static.vecteezy.com/system/resources/previews/034/969/304/non_2x/ai-generated-t-shirt-mockup-clip-art-free-png.png"
        class="h-[9rem] md:h-[13rem] w-[8rem] md:w-[12rem] bg-[#ddd] rounded-lg"
      />
    </NuxtLink>
    <div
      class="h-full flex flex-col justify-evenly md:justify-start md:gap-2 ml-2 md:ml-4"
    >
      <p class="text-sm md:text-lg text-secondary font-semibold">
        Size | {{ itemData.size }}
      </p>
      <p class="md:text-xl text-primary font-semibold truncate">
        {{ itemData.name }}
      </p>
      <p class="md:text-xl font-semibold">${{ itemData.price.toFixed(2) }}</p>
      <div
        class="w-[5rem] h-[2rem] flex items-center border-1 border-[#ccc] rounded-md"
      >
        <button
          @click="cartStore.decrementQuantity(itemData.id, itemData.size)"
          class="w-[1.5rem] h-full hover:bg-[#ccc]/50 active:bg-[#ccc]/50 text-primary rounded-l-md hover:cursor-pointer"
        >
          <i class="pi pi-minus text-xs text-secondary"></i>
        </button>
        <p class="w-[2rem] text-primary text-sm font-semibold text-center">
          {{ itemData.quantity }}
        </p>
        <button
          @click="cartStore.incrementQuantity(itemData.id, itemData.size)"
          class="w-[1.5rem] h-full hover:bg-[#ddd] active:bg-[#ddd] text-primary rounded-r-md hover:cursor-pointer"
        >
          <i class="pi pi-plus text-xs text-secondary"></i>
        </button>
      </div>
    </div>
  </div>
</template>
