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
    class="relative w-full min-w-[18rem] h-[10rem] lg:h-[12rem] flex items-center p-2 lg:px-4 bg-white border-1 border-[#ccc] rounded-lg"
  >
    <button
      @click="cartStore.removeFromCart(itemData.id, itemData.size)"
      class="absolute top-4 right-2 lg:right-4 p-1 lg:p-2 flex lg:hidden items-center justify-center rounded-full hover:bg-[#ccc]/50 active:bg-[#ccc]/50 hover:cursor-pointer transition-colors duration-150"
    >
      <i class="pi pi-trash text-secondary text-sm lg:text-lg"></i>
    </button>
    <NuxtLink
      :to="`/garments/${itemData.gender}/itemDetails/${itemData.id}`"
      draggable="false"
      class="h-[9rem] lg:h-[11rem] w-[8rem] md:min-w-[10rem] lg:min-w-[12rem] lg:max-w-[20%] lg:w-full"
    >
      <img
        draggable="false"
        src="https://static.vecteezy.com/system/resources/previews/034/969/304/non_2x/ai-generated-t-shirt-mockup-clip-art-free-png.png"
        class="w-full h-full bg-[#ddd] rounded-lg"
      />
    </NuxtLink>
    <div
      class="relative lg:w-[80%] h-full flex flex-col lg:flex-row justify-evenly lg:justify-between lg:gap-4 xl:gap-16 ml-2 lg:ml-4"
    >
      <div class="hidden lg:flex gap-2 lg:gap-8 absolute bottom-2 left-0">
        <button
          @click="cartStore.removeFromCart(itemData.id, itemData.size)"
          class="text-sm text-secondary hover:cursor-pointer hover:underline"
        >
          Remove
        </button>
        <button
          class="text-sm text-secondary hover:cursor-pointer hover:underline"
        >
          Move to wishlist
        </button>
      </div>

      <div class="flex flex-col lg:gap-2">
        <p class="lg:text-xl text-primary font-semibold truncate">
          {{ itemData.name }}
        </p>
        <p class="text-sm text-secondary font-semibold">
          Size | {{ itemData.size }}
        </p>
      </div>
      <div class="flex flex-col lg:gap-2">
        <p class="hidden lg:block text-secondary font-semibold">Each</p>
        <p class="lg:text-xl font-semibold">${{ itemData.price.toFixed(2) }}</p>
      </div>
      <div class="flex flex-col lg:gap-2">
        <p class="hidden lg:block text-secondary font-semibold">Quantity</p>
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

        <div class="hidden lg:flex items-end gap-2 mt-auto w-[10rem]">
          <p class="hidden lg:block text-secondary font-semibold">Total</p>
          <p class="lg:text-2xl font-semibold">
            ${{
              (Number(itemData.price.toFixed(2)) * itemData.quantity).toFixed(2)
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
