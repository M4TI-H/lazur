<script setup lang="ts">
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
    class="w-full h-[44rem] flex flex-col bg-[#F8F9FA] items-center py-4 gap-4"
  >
    <div
      class="relative w-full flex flex-col sm:flex-row items-center justify-between px-6 sm:px-12 gap-2 sm:gap-0"
    >
      <div class="w-full flex flex-col items-start">
        <h2 class="text-primary text-xl md:text-2xl lg:text-3xl font-semibold">
          Trending
        </h2>
        <CategorySelect />
      </div>

      <span class="flex gap-8">
        <button
          class="hidden sm:block size-[2rem] bg-[#445388] text-light rounded-full text-xs hover:cursor-pointer"
        >
          <i class="pi pi-arrow-left"></i>
        </button>

        <button
          class="hidden sm:block size-[2rem] bg-[#445388] text-light rounded-full text-xs hover:cursor-pointer"
        >
          <i class="pi pi-arrow-right"></i>
        </button>
      </span>
    </div>

    <div
      class="w-full flex justify-center gap-8 overflow-x-auto whitespace-nowrap md:px-12"
    >
      <TopItem v-for="item in items" :key="item.id" :itemData="item" />
    </div>
  </section>
</template>
