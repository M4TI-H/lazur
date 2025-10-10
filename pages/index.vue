<script setup lang="ts">
const { scrollY } = useScroll();
</script>
<template>
  <NavMenu :scrollY="scrollY" />
  <main
    class="w-full min-h-screen bg-[#E9ECEF] pb-32 overflow-y-auto overflow-x-hidden"
  >
    <WelcomePanel />
    <FeaturesText />
    <BestSelling />
    <ClientsReviews />
    <AppSection />
  </main>
</template>
