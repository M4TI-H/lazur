<script setup lang="ts">
const { scrollY } = useScroll();
</script>

<template>
  <NavMenu :scrollY="scrollY" />
  <main
    class="w-full min-h-screen flex flex-col items-center bg-[#F8F9FA] overflow-y-auto overflow-x-hidden"
  >
    <section class="relative w-full h-[32rem] flex flex-col items-center">
      <img class="w-full h-full object-cover z-10" src="/gdansk.jpeg" />
      <div
        class="absolute z-30 w-full h-full bg-[#1F1D20]/70 flex flex-col items-center justify-center py-16 gap-2 lg:gap-4"
      >
        <h1
          class="text-2xl sm:text-3xl lg:text-4xl text-center text-light font-bold whitespace-nowrap"
        >
          About us
        </h1>
        <h3
          class="sm:text-lg lg:text-xl text-center text-light font-thin max-w-[16rem] sm:max-w-[36rem] lg:max-w-[48rem]"
        >
          At Lazur, we craft minimalist, premium clothing for the modern
          individual.
          <br />
          Our philosophy is simple - fewer distractions, better design.
          <br />
          Each piece blends urban confidence with timeless elegance, made to
          move effortlessly through every moment of your day.
          <br />
          We focus on quality, detail, and authenticity - creating garments that
          outlast trends and define a refined, modern wardrobe.
        </h3>
      </div>
    </section>
    <div class="w-full flex items-center justify-center bg-[#ccc]">
      <Slider />
    </div>
    <section
      class="w-full flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16 py-8 md:py-16"
    >
      <div
        class="w-full max-w-[18rem] sm:max-w-[22rem] md:max-w-[24rem] min-h-[28rem] h-auto md:h-[32rem] bg-[#445388] border-2 border-[1F1D20] flex flex-col items-center p-4 rounded-lg gap-2"
      >
        <div class="w-full md:h-[6rem] flex items-center justify-center gap-4">
          <i class="pi pi-eye text-light text-3xl"></i>

          <h2 class="text-xl sm:text-2xl lg:text-3xl font-semibold text-light">
            Our vision
          </h2>
        </div>

        <p class="text-sm text-light">
          Our vision is to shape a new language of contemporary style — one that
          celebrates individuality, responsibility, and longevity. We envision a
          world where fashion is not disposable, but deeply personal; where each
          garment carries a sense of intention and calm.
        </p>
        <p class="text-sm text-light">
          Lazur stands for a minimalist future, where less becomes more — where
          design serves not to overwhelm, but to empower. We strive to connect
          creativity with consciousness, merging innovation with ethical
          craftsmanship. Through deliberate design and honest materials, we aim
          to inspire confidence that doesn't fade — confidence that evolves with
          you.
        </p>
        <p class="text-sm text-light">
          Lazur isn't just about the clothes that you wear. It's about how you
          live - with purpose, with awareness, and with effortless style.
        </p>
      </div>
      <div
        class="w-full max-w-[18rem] sm:max-w-[22rem] md:max-w-[24rem] min-h-[28rem] h-auto md:h-[32rem] bg-[#445388] border-2 border-[1F1D20] flex flex-col items-center p-4 rounded-lg gap-2"
      >
        <div class="w-full md:h-[6rem] flex items-center justify-center gap-4">
          <i class="pi pi-globe text-light text-3xl"></i>
          <h2 class="text-xl sm:text-2xl lg:text-3xl font-semibold text-light">
            Our mission
          </h2>
        </div>

        <p class="text-sm text-light">
          Our vision is to shape a new language of contemporary style — one that
          celebrates individuality, responsibility, and longevity. We envision a
          world where fashion is not disposable, but deeply personal; where each
          garment carries a sense of intention and calm.
        </p>
        <p class="text-sm text-light">
          Lazur stands for a minimalist future, where less becomes more — where
          design serves not to overwhelm, but to empower. We strive to connect
          creativity with consciousness, merging innovation with ethical
          craftsmanship. Through deliberate design and honest materials, we aim
          to inspire confidence that doesn't fade — confidence that evolves with
          you.
        </p>
      </div>
    </section>
  </main>
  <Footer />
</template>
