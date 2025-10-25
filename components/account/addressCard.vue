<script setup lang="ts"></script>

<template>
  <div
    class="relative w-full sm:w-[14rem] h-[9rem] flex flex-col border-2 border-[#ccc] rounded-lg p-2"
  >
    <div class="absolute top-2 right-2 flex gap-2">
      <button
        class="text-sm flex items-center justify-center p-1 rounded-lg hover:bg-[#ccc]/50 hover:cursor-pointer transition-colors duration-150"
      >
        <i class="pi pi-pencil"></i>
      </button>
      <button
        class="text-sm flex items-center justify-center p-1 rounded-lg hover:bg-[#ccc]/50 hover:cursor-pointer transition-colors duration-150"
      >
        <i class="pi pi-trash"></i>
      </button>
    </div>
    <p class="text-secondary text-xs">Address</p>
    <p class="font-semibold truncate max-w-full">Street name, 11/25B</p>
    <p class="text-secondary text-xs">City</p>
    <p class="font-semibold truncate max-w-full">Postal Code, City name</p>
    <p class="text-secondary text-xs">Country</p>
    <p class="font-semibold truncate max-w-full">Country</p>
  </div>
</template>
