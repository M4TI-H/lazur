<script setup lang="ts">
import type Address from "~/types/Address";

const emit = defineEmits<{
  (e: "addNew"): void;
  (e: "refresh"): void;
}>();

const { addresses } = defineProps<{
  addresses: Address[];
}>();
</script>
<template>
  <div
    class="w-full min-w-[18rem] max-w-[18rem] sm:max-w-[24rem] md:max-w-none h-auto md:h-[30rem] gap-2 sm:gap-4 flex flex-col bg-white border-2 border-[#ccc] rounded-lg overflow-y-auto"
  >
    <div class="w-full flex items-center justify-between bg-[#445388] p-4">
      <span class="flex items-center gap-2">
        <h2 class="text-xl font-semibold text-light">Address book</h2>
        <p class="text-xs font-semibold text-light">
          {{ addresses.length }}/10
        </p>
      </span>

      <button
        v-if="addresses.length < 10"
        @click="emit('addNew')"
        class="text-sm flex items-center justify-center gap-2 text-light py-1 px-2 rounded-full bg-[#212842]/45 hover:bg-[#212842]/80 hover:cursor-pointer transition-colors duration-150"
      >
        Add new
        <i class="pi pi-file-plus text-xs"></i>
      </button>
    </div>

    <p v-if="addresses.length === 0" class="text-sm text-secondary">
      No saved addresses.
    </p>

    <div class="w-full py-4 px-2 md:px-5 flex flex-wrap gap-4">
      <AddressCard
        v-for="address in addresses"
        :key="address.id"
        :addressData="address"
        @refresh="emit('refresh')"
      />
    </div>
  </div>
</template>
