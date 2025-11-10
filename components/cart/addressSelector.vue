<script setup lang="ts">
import type Address from "~/types/Address";

const props = defineProps<{
  modelValue: number;
  addresses: Address[] | null;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
  (e: "addNew"): void;
}>();

const localValue = ref<number>(props.modelValue);

watch(
  () => props.modelValue,
  (val) => {
    localValue.value = val;
  }
);

watch(localValue, (newVal) => {
  emit("update:modelValue", newVal);
});
</script>

<template>
  <div class="w-full flex flex-col sm:px-4 gap-1 sm:gap-0">
    <div
      class="w-full flex flex-col sm:flex-row sm:items-center justify-between"
    >
      <p class="text-sm text-secondary">Delivery address</p>
      <select
        v-model="localValue"
        class="w-full sm:w-[12rem] xl:w-[14rem] h-[2rem] bg-[#eee] px-2 rounded-md"
      >
        <option
          v-for="(address, index) in addresses"
          :key="index"
          :value="address.id"
        >
          {{ address.street }} {{ address.building_num
          }}{{ address.flat_num ? `/${address.flat_num}` : "" }},
          {{ address.city }}
        </option>
      </select>
    </div>

    <button
      type="button"
      @click="emit('addNew')"
      class="text-sm text-secondary flex items-center gap-1 ml-auto mr-1 hover:cursor-pointer hover:underline"
    >
      Add new address
    </button>
  </div>
</template>
