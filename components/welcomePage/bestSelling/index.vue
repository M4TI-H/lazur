<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <div
    class="w-full h-[32rem] flex flex-col items-center bg-[#E9ECEF] p-4 gap-4"
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
    <div class="w-full flex justify-center gap-16">
      <div class="w-[14rem] h-[20rem] bg-[#DEE2E6] rounded-xl">
        <img
          src="https://png.pngtree.com/png-vector/20240202/ourmid/pngtree-blue-shirt-mockup-cutout-png-file-png-image_11588762.png"
          class="w-full h-[12rem] rounded-t-xl"
        />
        <div
          class="w-full h-[8rem] flex flex-col p-2 bg-[#F8F9FA] rounded-b-xl"
        >
          <div class="w-full h-[5rem]">
            <p class="text-secondary text-sm font-thin">Shirt</p>
            <p class="text-primary font-semibold">Cotton Shirt</p>
          </div>

          <div class="w-full h-[3rem] flex items-center justify-between">
            <p class="text-primary font-semibold">$79.99</p>
            <button
              class="size-[2rem] bg-[#445388] rounded-full flex items-center justify-center hover:bg-[#212842] active:bg-[#212842] hover:cursor-pointer"
            >
              <Icon icon="tabler:plus" class="text-xl text-light" />
            </button>
          </div>
        </div>
      </div>

      <div class="w-[14rem] h-[20rem] bg-[#DEE2E6] rounded-xl">
        <img
          src="https://cdn.shopify.com/s/files/1/2304/9839/files/RW658_DSG_001.png?v=1753091626"
          class="w-full h-[12rem] rounded-t-xl"
        />
        <div
          class="w-full h-[8rem] flex flex-col p-2 bg-[#F8F9FA] rounded-b-xl"
        >
          <div class="w-full h-[5rem]">
            <p class="text-secondary text-sm font-thin">Shirt</p>
            <p class="text-primary font-semibold">Striped Shirt</p>
          </div>

          <div class="w-full h-[3rem] flex items-center justify-between">
            <p class="text-primary font-semibold">$129.49</p>
            <button
              class="size-[2rem] bg-[#445388] rounded-full flex items-center justify-center hover:bg-[#212842] active:bg-[#212842] hover:cursor-pointer"
            >
              <Icon icon="tabler:plus" class="text-xl text-light" />
            </button>
          </div>
        </div>
      </div>
      <div class="w-[14rem] h-[20rem] bg-[#DEE2E6] rounded-xl">
        <img
          src="https://cdn11.bigcommerce.com/s-vhimnvf2fd/images/stencil/2000x2000/products/531/2024/425CL-Mens-Button-Down-Printed-Camp-Shirts---Hot-Rod__17274__27168.1717682589.png?c=1"
          class="w-full h-[12rem] rounded-t-xl"
        />
        <div
          class="w-full h-[8rem] flex flex-col p-2 bg-[#F8F9FA] rounded-b-xl"
        >
          <div class="w-full h-[5rem]">
            <p class="text-secondary text-sm font-thin">Shirt</p>
            <p class="text-primary font-semibold">Flaming Shirt</p>
          </div>

          <div class="w-full h-[3rem] flex items-center justify-between">
            <p class="text-primary font-semibold">$99.99</p>
            <button
              class="size-[2rem] bg-[#445388] rounded-full flex items-center justify-center hover:bg-[#212842] active:bg-[#212842] hover:cursor-pointer"
            >
              <Icon icon="tabler:plus" class="text-xl text-light" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <a class="text-secondary hover:text-primary hover:cursor-pointer">
      <span class="flex items-center gap-2"
        >View all
        <Icon icon="tabler:arrow-narrow-right" class="text-lg" /> </span
    ></a>
  </div>
</template>
