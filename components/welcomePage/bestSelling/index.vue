<script setup lang="ts">
import { Icon } from "@iconify/vue";
import Item from "./topItem.vue";

const items = [
  {
    id: 0,
    name: "Cotton Shirt",
    price: "79.99",
    category: "Shirt",
    cover:
      "https://png.pngtree.com/png-vector/20240202/ourmid/pngtree-blue-shirt-mockup-cutout-png-file-png-image_11588762.png",
    review: "4",
  },
  {
    id: 1,
    name: "Striped Shirt",
    price: "129.49",
    category: "Shirt",
    cover:
      "https://cdn.shopify.com/s/files/1/2304/9839/files/RW658_DSG_001.png?v=1753091626",
    review: "",
  },
  {
    id: 2,
    name: "Flaming Shirt",
    price: "99.99",
    category: "Shirt",
    cover:
      "https://cdn11.bigcommerce.com/s-vhimnvf2fd/images/stencil/2000x2000/products/531/2024/425CL-Mens-Button-Down-Printed-Camp-Shirts---Hot-Rod__17274__27168.1717682589.png?c=1",
    review: "3",
  },
  {
    id: 3,
    name: "Cotton Shirt",
    price: "99.99",
    category: "Shirt",
    cover: "https://pngimg.com/d/dress_shirt_PNG8117.png",
    review: "3",
  },
];
</script>

<template>
  <section
    class="w-full h-[44rem] flex flex-col items-center bg-[#E9ECEF] p-4 gap-4"
  >
    <h2
      class="text-primary text-xl lg:text-2xl xl:text-3xl font-semibold text-center"
    >
      Best selling products
    </h2>
    <div
      class="w-[20rem] h-[2.5rem] rounded-full bg-[#DEE2E6] flex items-center p-1"
    >
      <button
        class="w-1/4 h-full rounded-full bg-[#F8F9FA] text-primary text-sm"
      >
        Shirt
      </button>
      <button
        class="w-1/4 h-full rounded-full hover:bg-[#CED4DA] hover:cursor-pointer text-secondary text-sm transition duration-200 ease-in-out"
      >
        Trouser
      </button>
      <button
        class="w-1/4 h-full rounded-full hover:bg-[#CED4DA] hover:cursor-pointer text-secondary text-sm transition duration-200 ease-in-out"
      >
        Jacket
      </button>
      <button
        class="w-1/4 h-full rounded-full hover:bg-[#CED4DA] hover:cursor-pointer text-secondary text-sm transition duration-200 ease-in-out"
      >
        Footwear
      </button>
    </div>
    <section class="w-full flex justify-center gap-4">
      <TopItem v-for="item in items" :key="item.id" :itemData="item" />
    </section>
    <a class="text-secondary hover:text-primary hover:cursor-pointer">
      <span class="flex items-center gap-2"
        >View all
        <Icon icon="tabler:arrow-narrow-right" class="text-lg" /> </span
    ></a>
  </section>
</template>
