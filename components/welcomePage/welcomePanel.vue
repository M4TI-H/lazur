<script setup lang="ts">
const search = ref<string>("");

const searchItem = () => {
  if (search.value.trim().length > 0) {
    navigateTo(`/garments/search/${search.value}`);
  }
};
</script>

<template>
  <section class="relative w-full h-screen flex flex-col items-center">
    <img class="w-full h-full object-cover z-10" src="/welcomeBg.jpeg" />
    <div
      class="absolute bg-[#1F1D20]/70 w-full h-full z-20 flex items-center justify-center"
    >
      <div
        class="absolute z-30 p-8 flex flex-col items-center mt-16 md:mt-24 gap-2 md:gap-4"
      >
        <h1
          class="text-xl md:text-4xl text-center text-light font-bold whitespace-nowrap"
        >
          Make Your Wardrobe More<br />Minimalistic & Modern
        </h1>
        <h3
          class="md:text-xl text-center text-light font-thin max-w-[16rem] md:max-w-[22rem]"
        >
          Turn your wardrobe with Lazur into a more minimalist and modern style
          with ease and speed
        </h3>
        <div
          class="relative w-[18rem] md:w-[24rem] h-[3rem] flex items-center mt-4 md:mt-8"
        >
          <button
            @click="searchItem"
            class="absolute right-3 bg-[#445388] size-[2rem] rounded-full flex items-center justify-center z-20 hover:cursor-pointer"
          >
            <i class="pi pi-search text-light text-sm"></i>
          </button>
          <input
            v-model="search"
            @keyup.enter="searchItem"
            type="text"
            placeholder="Search garments"
            class="bg-[#1F1D20]/50 backdrop-blur-sm focus:bg-[#1F1D20]/60 focus:backdrop-blur-md placeholder-[#CED4DA] placeholder:font-thin text-light w-full h-full rounded-full px-4 border border-[#DEE2E6] outline-none transition duration-500 ease-in-out"
          />
        </div>
      </div>
    </div>
  </section>
</template>
