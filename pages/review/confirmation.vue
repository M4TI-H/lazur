<script setup lang="ts">
const { scrollY } = useScroll();
</script>

<template>
  <NavMenu :scrollY="scrollY" />
  <main
    class="w-full min-h-screen flex flex-col items-center justify-center bg-[#F8F9FA] overflow-hidden"
  >
    <section class="absolute z-10 w-full h-full">
      <img
        class="w-full h-full object-cover"
        src="https://static.vecteezy.com/system/resources/thumbnails/039/653/479/small_2x/ai-generated-stylish-blue-shopping-bags-against-a-matching-blue-background-conveying-a-modern-aesthetic-ai-generated-photo.jpg"
      />
      <div class="absolute inset-0 bg-[#1F1D20]/70"></div>
    </section>

    <section
      class="lg:w-[24vw] max-w-[90vw] max-h-[48rem] h-min flex flex-col bg-[#ddd] px-4 lg:px-8 py-4 gap-4 rounded-md z-10"
    >
      <h2 class="text-2xl font-semibold">Review sent</h2>
      <p>Thank you for supporting Lazur.</p>
      <NuxtLink
        to="/"
        class="w-[80%] max-w-[24rem] h-[2.5rem] bg-[#444] text-light flex items-center justify-center rounded-md self-center mt-auto hover:cursor-pointer hover:bg-[#222] transition-color ease-in-out duration-200"
      >
        Return to homepage
      </NuxtLink>
    </section>
  </main>
</template>
