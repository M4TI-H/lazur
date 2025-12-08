<script setup lang="ts">
const route = useRoute();
const search = route.params.search;

const { scrollY } = useScroll();
</script>

<template>
  <NavMenu :scrollY="scrollY" />
  <main
    class="w-full min-h-screen flex flex-col items-center bg-white overflow-y-auto"
  >
    <ImageHeader
      :image="`/garmentsBg.jpeg`"
      :title="`Discover our world of quality clothing`"
    />
    <CategoryMenu />
    <Sorting />
    <SearchedDisplay :search="search" />
  </main>
  <Footer />
</template>
