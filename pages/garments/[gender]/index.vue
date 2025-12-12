<script setup lang="ts">
import Footer from "~/components/footer.vue";

const route = useRoute();
const gender = route.params.gender as "Men" | "Women";

const { scrollY } = useScroll();
</script>

<template>
  <NavMenu :scrollY="scrollY" />
  <main
    class="w-full min-h-screen flex flex-col items-center bg-white overflow-y-auto gap-4"
  >
    <ImageHeader
      :image="`/garmentsBg.jpeg`"
      :title="`Discover our world of quality clothing`"
    />

    <section
      class="relative w-full flex flex-col sm:flex-row sm:items-center justify-between px-4 lg:px-24"
    >
      <CategoryMenu :gender="gender" />
      <Sorting :gender="gender" />
    </section>

    <ClothesDisplay :gender="gender" />
    <div
      class="w-full h-[12rem] bg-gray-500 flex flex-col items-center justify-center gap-2"
    >
      <h3 class="text-xl md:text-2xl font-semibold">That is all for now</h3>
      <p
        class="max-w-[14rem] md:text-lg md:max-w-[16rem] text-center text-gray-500"
      >
        Stay tuned for our offer updates on our social media.
      </p>
    </div>
  </main>
  <Footer />
</template>
