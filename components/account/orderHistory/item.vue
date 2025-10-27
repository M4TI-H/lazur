<script setup lang="ts"></script>
<template>
  <div
    class="w-full h-[16rem] flex flex-col py-2 px-4 border-2 border-[#ccc] rounded-lg"
  >
    <div class="w-full flex items-center justify-between">
      <button
        class="text-lg md:text-2xl font-semibold hover:cursor-pointer hover:underline"
      >
        Order #1
      </button>
      <p class="text-secondary text-sm md:text-lg font-semibold">COMPLETED</p>
    </div>
    <div class="w-full flex flex-col md:flex-row">
      <div class="w-full md:w-[50%] flex flex-col items-start gap-1">
        <p class="text-sm text-secondary mt-2">
          Order placed on: 27.10.2025, 16:45
        </p>
        <p class="text-sm text-secondary">Order delivered on: 31.10.202 9:04</p>
      </div>
      <div
        class="w-full md:w-[50%] flex items-center justify-between md:flex-col md:items-end gap-2 mt-4"
      >
        <p class="text-lg font-semibold">7 item(s)</p>
        <p class="text-lg font-semibold">Total: $100.00</p>
      </div>
    </div>
    <div
      class="w-full h-[6rem] flex items-center gap-2 mt-auto bg-[#ccc]"
    ></div>
  </div>
</template>
