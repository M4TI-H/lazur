<script setup lang="ts">
const route = useRoute();
const category = route.params.category as string;
const gender = route.params.gender as "Men" | "Women";

const { scrollY } = useScroll();
</script>
<template>
  <NavMenu :scrollY="scrollY" />
  <main
    class="w-full min-h-screen flex flex-col items-center bg-[#F8F9FA] overflow-y-auto"
  >
    <section class="w-full h-[40vh] relative flex flex-col items-center">
      <img class="w-full h-full object-cover z-10" src="/garmentsBg.jpeg" />
      <div
        class="absolute bg-[#1F1D20]/70 w-full h-full z-20 flex items-center justify-center"
      >
        <h1
          class="text-xl md:text-4xl text-center text-light font-bold whitespace-nowrap"
        >
          Discover our world of<br />quality clothing.
        </h1>
      </div>
    </section>

    <section
      class="relative w-full flex flex-col sm:flex-row sm:items-center justify-between px-4 lg:px-24"
    >
      <CategoryMenu :gender="gender" />
      <Sorting />
    </section>
    <div class="w-full h-[4rem] flex items-center justify-center my-4">
      <h2 class="text-secondary text-2xl lg:text-3xl font-thin">
        {{ category.toUpperCase() }}
      </h2>
    </div>
    <CategoryDisplay :category="category" :gender="gender" />
    <div
      class="w-full h-[12rem] bg-[#ccc] flex flex-col items-center justify-center gap-2"
    >
      <h3 class="text-xl md:text-2xl font-semibold">That is all for now</h3>
      <p
        class="max-w-[14rem] md:text-lg md:max-w-[16rem] text-center text-secondary"
      >
        Stay tuned for our offer updates on our social media.
      </p>
    </div>
  </main>
  <Footer />
</template>
