<script setup lang="ts">
import type Garment from "~/types/Garment";

const { itemData } = defineProps<{
  itemData: Garment & { quantity: number; size: string };
}>();

const cartStore = useCartStore();
cartStore.loadFromStorage();
</script>

<template>
  <section class="w-[full] flex flex-col" v-if="itemData">
    <div
      class="w-full h-[16rem] md:h-[12rem] flex flex-col md:flex-row items-center"
    >
      <div class="w-1/10 h-full hidden md:flex items-center justify-center">
        <button
          @click="cartStore.removeFromCart(itemData.id, itemData.size)"
          class="size-[2rem] flex items-center justify-center rounded-md hover:bg-[#ddd] hover:cursor-pointer"
        >
          <i class="pi pi-times text-lg text-primary"></i>
        </button>
      </div>
      <div class="w-full md:w-2/5 h-full flex md:items-center gap-4">
        <NuxtLink
          :to="`/garments/itemDetails/${itemData.id}`"
          draggable="false"
        >
          <img
            draggable="false"
            src="https://static.vecteezy.com/system/resources/previews/034/969/304/non_2x/ai-generated-t-shirt-mockup-clip-art-free-png.png"
            class="w-[8rem] md:w-[12rem] h-full bg-[#ddd]"
          />
        </NuxtLink>

        <div class="flex flex-col">
          <p class="text-secondary font-semibold">
            {{
              itemData.category.charAt(0).toUpperCase() +
              itemData.category.slice(1)
            }}
          </p>
          <p class="text-xl text-primary font-semibold">{{ itemData.name }}</p>
        </div>
      </div>
      <div class="w-full md:w-1/10 h-full flex items-center justify-center">
        <p class="text-xl text-primary font-semibold">{{ itemData.size }}</p>
      </div>
      <div class="w-full md:w-1/5 h-full flex items-center justify-center">
        <div class="w-[9rem] h-[2.5rem] flex items-center border-1 rounded-md">
          <button
            :disabled="itemData.quantity === 1"
            @click="cartStore.decrementQuantity(itemData.id, itemData.size)"
            class="w-[3rem] h-full hover:bg-[#ddd] active:bg-[#ddd] text-primary rounded-l-md hover:cursor-pointer"
          >
            <i class="pi pi-minus"></i>
          </button>
          <p class="w-[3rem] text-primary text-lg font-semibold text-center">
            {{ itemData.quantity }}
          </p>
          <button
            :disabled="itemData.quantity === 99"
            @click="cartStore.incrementQuantity(itemData.id, itemData.size)"
            class="w-[3rem] h-full hover:bg-[#ddd] active:bg-[#ddd] text-primary rounded-r-md hover:cursor-pointer"
          >
            <i class="pi pi-plus"></i>
          </button>
        </div>
      </div>
      <div class="w-full md:w-1/5 h-full flex items-center justify-center">
        <p class="text-xl text-primary font-semibold">
          ${{ itemData.price.toFixed(2) }}
        </p>
      </div>
    </div>
  </section>
</template>
