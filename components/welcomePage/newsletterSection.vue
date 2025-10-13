<script setup lang="ts"></script>

<template>
  <section
    class="w-full h-[36rem] flex flex-col items-center justify-center px-2"
  >
    <img
      class="w-full h-full object-cover z-10"
      src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
    />
    <div
      class="absolute bg-[#1F1D20]/70 w-full h-[36rem] z-20 gap-16 flex flex-col items-center pt-32"
    >
      <div class="flex flex-col text-center">
        <h2
          class="text-light text-2xl md:text-3xl lg:text-4xl font-semibold mb-2"
        >
          Join our newsletter
        </h2>
        <p class="text-light">
          Subscribe to get updates on our latest collections, exclusive offers,
          and style tips.
        </p>
      </div>
      <div class="flex flex-col items-center gap-8">
        <input
          type="text"
          placeholder="Enter your email"
          class="w-[18rem] md:w-[24rem] h-[3rem] bg-[#1F1D20]/50 backdrop-blur-sm focus:bg-[#1F1D20]/60 focus:backdrop-blur-md placeholder-[#CED4DA] placeholder:font-thin text-light rounded-full px-4 border border-[#DEE2E6] outline-none transition duration-500 ease-in-out"
        />
        <button
          class="w-full max-w-[12rem] h-[2.5rem] bg-[#445388] rounded-lg flex items-center justify-center text-light hover:bg-[#212842] active:bg-[#212842] hover:cursor-pointer transition-colors ease-in-out duration-250"
        >
          Subscribe
        </button>
      </div>
    </div>
  </section>
</template>
