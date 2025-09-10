<script setup lang="ts">
import { Icon } from "@iconify/vue";

const reviews = [
  {
    id: 0,
    username: "Jeffrey Keenan",
    user_img:
      "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cover:
      "https://images.unsplash.com/photo-1721637222188-fa7bf56ceaf5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    review: "4",
    content: "Lazur has the best quality clothes I've ever wore.",
  },

  {
    id: 1,
    username: "Davide Aracri",
    user_img:
      "https://images.unsplash.com/photo-1652226331082-57cf20c462c5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cover:
      "https://images.unsplash.com/photo-1687541160824-366bd3581699?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    review: "4",
    content: "Very nice!",
  },

  {
    id: 2,
    username: "Madrona Rose",
    user_img:
      "https://images.unsplash.com/photo-1607990283143-e81e7a2c9349?q=80&w=1141&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cover:
      "https://plus.unsplash.com/premium_photo-1749886490544-d99e60364dcb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    review: "4",
    content: "My wardrobe has flourished since I discovered Lazur!",
  },
];
</script>

<template>
  <div class="w-full h-[44rem] flex flex-col items-center bg-[#ccc] p-4 gap-4">
    <h2
      class="text-primary text-xl lg:text-2xl xl:text-3xl font-semibold text-center"
    >
      Client Reviews
    </h2>

    <div class="w-full flex justify-center gap-8">
      <Review v-for="review in reviews" :key="review.id" :review="review" />
    </div>
  </div>
</template>
