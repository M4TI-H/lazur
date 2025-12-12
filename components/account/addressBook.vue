<script setup lang="ts">
import type Address from "~/types/Address";
import { useFetchUserAddresses } from "~/composables/users/addresses/useFetchAddresses";

const { addresses, addressesLoading, addressesRefresh } =
  useFetchUserAddresses();

const emit = defineEmits<{
  (e: "addNew"): void;
  (e: "refresh"): void;
}>();

onMounted(async () => {
  await addressesRefresh();
});
</script>
<template>
  <div
    class="w-full min-w-[18rem] max-w-[18rem] sm:max-w-[35rem] md:max-w-full h-auto md:h-[30rem] gap-2 sm:gap-4 flex flex-col bg-white border-2 border-gray-200 rounded-lg overflow-y-auto"
  >
    <div class="w-full flex items-center justify-between bg-sky-700 p-4">
      <span class="flex items-center gap-2">
        <h2 class="text-xl font-semibold text-gray-200">Address book</h2>
        <p v-if="addresses" class="text-xs font-semibold text-gray-200">
          {{ addresses.length }}/10
        </p>
        <i v-else class="pi pi-spinner pi-spin text-gray-200"></i>
      </span>

      <button
        v-if="addresses && addresses.length < 10"
        @click="emit('addNew')"
        class="text-sm flex items-center justify-center gap-2 text-gray-200 py-1 px-2 rounded-full bg-sky-900 hover:bg-sky-900/80 cursor-pointer transition-colors duration-150"
      >
        Add new
        <i class="pi pi-file-plus text-xs"></i>
      </button>
    </div>

    <p v-if="addresses && addresses.length === 0" class="text-sm text-gray-500">
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
