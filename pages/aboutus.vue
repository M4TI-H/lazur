<script setup lang="ts">
const { scrollY } = useScroll();
</script>

<template>
  <NavMenu :scrollY="scrollY" />
  <main
    class="w-full min-h-screen flex flex-col items-center bg-slate-200 overflow-y-auto overflow-x-hidden"
  >
    <ImageHeader :image="`/gdansk.jpeg`" :title="`About Lazur`" />

    <div
      class="z-30 w-full bg-stone-900 flex flex-col items-center justify-center py-8 gap-2 lg:gap-4"
    >
      <h3
        class="sm:text-lg lg:text-xl text-center text-slate-200 font-thin max-w-[16rem] sm:max-w-[36rem] lg:max-w-[48rem]"
      >
        At Lazur, we craft minimalist, premium clothing for the modern
        individual.
        <br />
        Our philosophy is simple - fewer distractions, better design.
        <br />
        Each piece blends urban confidence with timeless elegance, made to move
        effortlessly through every moment of your day.
        <br />
        We focus on quality, detail, and authenticity - creating garments that
        outlast trends and define a refined, modern wardrobe.
      </h3>
    </div>
    <div class="w-full flex flex-wrap items-center justify-evenly gap-y-8 pb-8">
      <Slider />
      <div
        class="w-[18rem] sm:w-full sm:max-w-[22rem] md:max-w-[24rem] min-h-[28rem] h-auto md:h-[32rem] bg-sky-700 flex flex-col items-center p-4 rounded-lg gap-2"
      >
        <div class="w-full md:h-[6rem] flex items-center justify-center gap-4">
          <i class="pi pi-eye text-slate-200 text-3xl"></i>

          <h2
            class="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-200"
          >
            Our vision
          </h2>
        </div>

        <p class="text-sm text-slate-200">
          Our vision is to shape a new language of contemporary style — one that
          celebrates individuality, responsibility, and longevity. We envision a
          world where fashion is not disposable, but deeply personal; where each
          garment carries a sense of intention and calm.
        </p>
        <p class="text-sm text-slate-200">
          Lazur stands for a minimalist future, where less becomes more — where
          design serves not to overwhelm, but to empower. We strive to connect
          creativity with consciousness, merging innovation with ethical
          craftsmanship. Through deliberate design and honest materials, we aim
          to inspire confidence that doesn't fade — confidence that evolves with
          you.
        </p>
        <p class="text-sm text-slate-200">
          Lazur isn't just about the clothes that you wear. It's about how you
          live - with purpose, with awareness, and with effortless style.
        </p>
      </div>
      <div
        class="w-[18rem] sm:w-full sm:max-w-[22rem] md:max-w-[24rem] min-h-[28rem] h-auto md:h-[32rem] bg-sky-700 flex flex-col items-center p-4 rounded-lg gap-2"
      >
        <div class="w-full md:h-[6rem] flex items-center justify-center gap-4">
          <i class="pi pi-globe text-slate-200 text-3xl"></i>
          <h2
            class="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-200"
          >
            Our mission
          </h2>
        </div>

        <p class="text-sm text-slate-200">
          Our vision is to shape a new language of contemporary style — one that
          celebrates individuality, responsibility, and longevity. We envision a
          world where fashion is not disposable, but deeply personal; where each
          garment carries a sense of intention and calm.
        </p>
        <p class="text-sm text-slate-200">
          Lazur stands for a minimalist future, where less becomes more — where
          design serves not to overwhelm, but to empower. We strive to connect
          creativity with consciousness, merging innovation with ethical
          craftsmanship. Through deliberate design and honest materials, we aim
          to inspire confidence that doesn't fade — confidence that evolves with
          you.
        </p>
      </div>
    </div>
  </main>
  <Footer />
</template>
