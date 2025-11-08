<script setup lang="ts">
import { useDeleteAddress } from "~/composables/users/addresses/useDeleteAddress";
import type Address from "~/types/Address";

const { addressData } = defineProps<{
  addressData: Address;
}>();

const emit = defineEmits<{
  (e: "refresh"): void;
}>();

const { loading, error, deleteAddress } = useDeleteAddress();

const handleDelete = async () => {
  await deleteAddress(addressData.id);
  emit("refresh");
};
</script>

<template>
  <div
    class="relative w-full sm:w-[16rem] h-[9rem] flex flex-col border-2 border-[#ccc] rounded-lg p-2 mx-auto lg:mx-0"
  >
    <button
      @click="handleDelete"
      class="absolute top-2 right-2 text-sm flex items-center justify-center p-1 rounded-lg hover:bg-[#ccc]/50 hover:cursor-pointer transition-colors duration-150"
    >
      <i class="pi pi-times"></i>
    </button>
    <p class="text-secondary text-xs">Address</p>
    <p class="font-semibold truncate max-w-full">
      {{ addressData.street }}, {{ addressData.building_num
      }}{{ addressData.flat_num ? `/${addressData.flat_num}` : "" }}
    </p>
    <p class="text-secondary text-xs">City</p>
    <p class="font-semibold truncate max-w-full">
      {{ addressData.postal_code }}, {{ addressData.city }}
    </p>
    <p class="text-secondary text-xs">Country</p>
    <p class="font-semibold truncate max-w-full">{{ addressData.country }}</p>
  </div>
</template>
