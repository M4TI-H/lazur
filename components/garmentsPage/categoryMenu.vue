<script setup lang="ts">
const emit = defineEmits<{
  (e: "selectedCategory", category: string): void;
}>();
</script>

<template>
  <div
    class="w-full h-[4rem] md:h-[5rem] flex items-center px-3 gap-2 overflow-x-auto whitespace-nowrap"
  >
    <NuxtLink
      to="/garments/category/shirts"
      class="min-w-[8rem] md:min-w-[10rem] lg:w-1/8 h-[2.5rem] md:h-[3rem] bg-[#F8F9FA] rounded-sm border-1 border-[#373539] flex items-center justify-center text-secondary hover:cursor-pointer hover:bg-[#DEE2E6] active:bg-[#DEE2E6] transition-colors duration-200 ease-in-out"
    >
      SHIRTS
    </NuxtLink>
    <NuxtLink
      to="/garments/category/trousers"
      @click="emit('selectedCategory', 'trousers')"
      class="min-w-[8rem] md:min-w-[10rem] lg:w-1/8 h-[2.5rem] md:h-[3rem] bg-[#F8F9FA] rounded-sm border-1 border-[#373539] flex items-center justify-center text-secondary hover:cursor-pointer hover:bg-[#DEE2E6] active:bg-[#DEE2E6] transition-colors duration-200 ease-in-out"
    >
      TROUSERS
    </NuxtLink>
    <NuxtLink
      to="/garments/category/jackets"
      @click="emit('selectedCategory', 'jackets')"
      class="min-w-[8rem] md:min-w-[10rem] lg:w-1/8 h-[2.5rem] md:h-[3rem] bg-[#F8F9FA] rounded-sm border-1 border-[#373539] flex items-center justify-center text-secondary hover:cursor-pointer hover:bg-[#DEE2E6] active:bg-[#DEE2E6] transition-colors duration-200 ease-in-out"
    >
      JACKETS
    </NuxtLink>
    <NuxtLink
      to="/garments/category/sweaters"
      @click="emit('selectedCategory', 'sweaters')"
      class="min-w-[8rem] md:min-w-[10rem] lg:w-1/8 h-[2.5rem] md:h-[3rem] bg-[#F8F9FA] rounded-sm border-1 border-[#373539] flex items-center justify-center text-secondary hover:cursor-pointer hover:bg-[#DEE2E6] active:bg-[#DEE2E6] transition-colors duration-200 ease-in-out"
    >
      SWEATERS
    </NuxtLink>
    <NuxtLink
      to="/garments/category/tops"
      @click="emit('selectedCategory', 'tops')"
      class="min-w-[8rem] md:min-w-[10rem] lg:w-1/8 h-[2.5rem] md:h-[3rem] bg-[#F8F9FA] rounded-sm border-1 border-[#373539] flex items-center justify-center text-secondary hover:cursor-pointer hover:bg-[#DEE2E6] active:bg-[#DEE2E6] transition-colors duration-200 ease-in-out"
    >
      TOPS
    </NuxtLink>
    <NuxtLink
      to="/garments/category/jeans"
      @click="emit('selectedCategory', 'jeans')"
      class="min-w-[8rem] md:min-w-[10rem] lg:w-1/8 h-[2.5rem] md:h-[3rem] bg-[#F8F9FA] rounded-sm border-1 border-[#373539] flex items-center justify-center text-secondary hover:cursor-pointer hover:bg-[#DEE2E6] active:bg-[#DEE2E6] transition-colors duration-200 ease-in-out"
    >
      JEANS
    </NuxtLink>
    <NuxtLink
      to="/garments/category/footwear"
      @click="emit('selectedCategory', 'footwear')"
      class="min-w-[8rem] md:min-w-[10rem] lg:w-1/8 h-[2.5rem] md:h-[3rem] bg-[#F8F9FA] rounded-sm border-1 border-[#373539] flex items-center justify-center text-secondary hover:cursor-pointer hover:bg-[#DEE2E6] active:bg-[#DEE2E6] transition-colors duration-200 ease-in-out"
    >
      FOOTWEAR
    </NuxtLink>
    <NuxtLink
      to="/garments/category/accessories"
      @click="emit('selectedCategory', 'accesories')"
      class="min-w-[8rem] md:min-w-[10rem] lg:w-1/8 h-[2.5rem] md:h-[3rem] bg-[#F8F9FA] rounded-sm border-1 border-[#373539] flex items-center justify-center text-secondary hover:cursor-pointer hover:bg-[#DEE2E6] active:bg-[#DEE2E6] transition-colors duration-200 ease-in-out"
    >
      ACCESSORIES
    </NuxtLink>
  </div>
</template>
