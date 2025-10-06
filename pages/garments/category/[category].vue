<script setup lang="ts">
const route = useRoute();
const category = route.params.category as string;

const { scrollY } = useScroll();
</script>
<template>
  <NavMenu :scrollY="scrollY" />
  <main
    class="w-full min-h-screen flex flex-col items-center bg-[#F8F9FA] overflow-y-auto"
  >
    <section class="w-full h-[40vh] relative flex flex-col items-center">
      <img
        class="w-full h-full object-cover z-10"
        src="https://images.unsplash.com/photo-1664095885291-80e42e5692ae?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
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
    <CategoryMenu />
    <Sorting />
    <CategoryDisplay :category="category" />
  </main>
</template>
