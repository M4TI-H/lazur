<script setup lang="ts"></script>

<template>
  <section class="w-full h-[36rem] flex flex-col items-center justify-center">
    <img class="w-full h-full object-cover z-10" src="/newsletterBg.jpeg" />
    <div
      class="absolute bg-black/60 w-full h-[36rem] z-20 gap-16 flex flex-col items-center pt-32 px-2"
    >
      <div class="flex flex-col text-center">
        <h2 class="text-gray-200 text-2xl md:text-4xl font-semibold mb-2">
          Join our newsletter
        </h2>
        <p class="text-gray-200 whitespace-nowrap">
          Subscribe to get updates on our latest
          <br class="block md:hidden" />
          collections, exclusive offers, and style tips.
        </p>
      </div>
      <div class="w-full max-w-[18rem] flex flex-col items-center gap-8">
        <input
          type="text"
          placeholder="Enter your email"
          class="w-full md:w-[24rem] h-[3rem] bg-stone-800/50 backdrop-blur-sm focus:bg-stone-800/60 focus:backdrop-blur-md placeholder-gray-200 placeholder:font-thin text-gray-200 rounded-full px-4 border border-gray-200 outline-none transition duration-500 ease-in-out"
        />
        <button
          class="w-full max-w-[12rem] h-[2.5rem] bg-sky-700 rounded-lg flex items-center justify-center text-gray-200 hover:bg-sky-800 active:bg-sky-800 cursor-pointer transition-colors ease-in-out duration-250"
        >
          Subscribe
        </button>
      </div>
    </div>
  </section>
</template>
