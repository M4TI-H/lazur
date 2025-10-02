<script setup lang="ts"></script>

<template>
  <form class="w-[24rem] flex flex-col gap-4 p-4 rounded-lg bg-[#eee]">
    <h3 class="text-lg">Write your review</h3>
    <input
      placeholder="Your name"
      type="text"
      class="w-full h-[2.5rem] text-sm outline-0 p-2 border-1 border-[#6a6272] rounded-md"
    />
    <div class="flex items-center gap-2">
      <p class="text-sm text-secondary">How do you rate this product?</p>
      <StarReview v-model="rating" :value="rating" />
    </div>
    <textarea
      placeholder="Describe your experience with this product"
      class="w-full h-[5rem] text-sm outline-0 p-2 border-1 border-[#6a6272] rounded-md resize-none"
    ></textarea>

    <button
      class="w-[80%] max-w-[24rem] h-[2.5rem] bg-[#445388] text-light rounded-md self-center mt-auto hover:cursor-pointer hover:bg-[#222] transition-color ease-in-out duration-200"
    >
      Confirm
    </button>
    <button
      class="w-[80%] max-w-[24rem] h-[2.5rem] bg-[#8088a3] text-secondary rounded-md self-center mt-auto"
    >
      Confirm
    </button>
    <button
      class="w-[80%] max-w-[24rem] h-[2.5rem] bg-[#445388] text-light rounded-md self-center mt-auto"
    >
      <i class="pi pi-spin pi-spinner"></i>
    </button>
  </form>
</template>
