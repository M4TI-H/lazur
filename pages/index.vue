<script setup lang="ts">
const { scrollY } = useScroll();
</script>
<template>
  <NavMenu :scrollY="scrollY" />
  <main
    class="w-full min-h-screen bg-[#E9ECEF] overflow-y-auto overflow-x-hidden"
  >
    <WelcomePanel />
    <FeaturesText />
    <BestSelling />
    <ClientsReviews />
    <AppSection />
    <NewsletterSection />
    <Footer />
  </main>
</template>
