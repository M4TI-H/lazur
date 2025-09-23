<script setup lang="ts">
const { scrollY } = useScroll();
</script>
<template>
  <NavMenu :scrollY="scrollY" />
  <main class="w-full min-h-screen bg-[#F8F9FA] pb-32 overflow-y-auto">
    <WelcomePanel />
    <FeaturesText />
    <BestSelling />
    <ClientsReviews />
  </main>
</template>
