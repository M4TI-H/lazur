<script setup lang="ts">
const { scrollY } = useScroll();

const userStore = useUserStore();

const submitReview = ref<boolean>(false);
</script>

<template>
  <NavMenu :scrollY="scrollY" />
  <main
    class="w-full min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden"
  >
    <section class="absolute z-10 w-full h-full">
      <img class="w-full h-full object-cover" src="/order.jpg" />
      <div class="absolute inset-0 bg-black/40"></div>
    </section>

    <LazurReviewForm
      v-if="!submitReview"
      @submit="submitReview = true"
      :name="userStore.name"
    />
    <ReviewConfirm v-else />
  </main>
</template>
