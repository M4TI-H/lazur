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
    class="relative w-full sm:w-[16rem] h-[9rem] flex flex-col border-2 border-gray-300 rounded-lg p-2 mx-auto lg:mx-0"
  >
    <template v-if="!loading">
      <ExitButton @click="handleDelete" class="absolute top-2 right-2" />
      <p class="text-gray-500 text-xs">Address</p>
      <p class="font-semibold truncate max-w-full">
        {{ addressData.street }}, {{ addressData.building_num
        }}{{ addressData.flat_num ? `/${addressData.flat_num}` : "" }}
      </p>
      <p class="text-gray-500 text-xs">City</p>
      <p class="font-semibold truncate max-w-full">
        {{ addressData.postal_code }}, {{ addressData.city }}
      </p>
      <p class="text-gray-500 text-xs">Country</p>
      <p class="font-semibold truncate max-w-full">{{ addressData.country }}</p>
    </template>
    <template v-else>
      <i
        class="pi pi-spinner pi-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      ></i>
    </template>
  </div>
</template>
