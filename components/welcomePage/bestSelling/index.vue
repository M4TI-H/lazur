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
    class="w-full h-[44rem] flex flex-col items-center bg-[#E9ECEF] py-4 gap-4"
  >
    <div
      class="w-full md:h-[2.5rem] flex flex-col md:flex-row items-center gap-2 md:gap-8 px-2 md:px-12"
    >
      <h2
        class="text-primary text-xl lg:text-2xl xl:text-3xl font-semibold text-center"
      >
        Best selling products
      </h2>
      <CategorySelect />
    </div>

    <div
      class="w-full flex justify-center gap-8 overflow-x-auto whitespace-nowrap md:px-12"
    >
      <TopItem v-for="item in items" :key="item.id" :itemData="item" />
    </div>
  </section>
</template>
