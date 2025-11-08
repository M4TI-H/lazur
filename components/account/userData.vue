div
<script setup lang="ts">
import type PersonalData from "~/types/PersonalData";

const { personalData } = defineProps<{
  personalData: PersonalData;
}>();

const emit = defineEmits<{
  (e: "modify"): void;
}>();
</script>

<template>
  <div
    v-if="personalData"
    class="w-full min-w-[18rem] max-w-[18rem] sm:max-w-[24rem] h-[17rem] sm:h-[15rem] gap-2 sm:gap-4 flex flex-col bg-white border-2 border-[#ccc] rounded-lg overflow-y-auto"
  >
    <div class="w-full flex items-center justify-between bg-[#445388] p-4">
      <h2 class="text-xl text-light font-semibold">Personal data</h2>
      <button
        @click="emit('modify')"
        class="text-sm flex items-center justify-center gap-2 text-light py-1 px-2 rounded-full bg-[#212842]/45 hover:bg-[#212842]/80 hover:cursor-pointer transition-colors duration-150"
      >
        Change
        <i class="pi pi-pencil text-xs"></i>
      </button>
    </div>
    <div
      class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 sm:px-4 gap-1 sm:gap-0"
    >
      <p class="text-sm text-secondary">Name</p>
      <p class="font-semibold">{{ personalData.name }}</p>
    </div>
    <div
      class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 sm:px-4 gap-1 sm:gap-0"
    >
      <p class="text-sm text-secondary">Email address</p>
      <p class="font-semibold">{{ personalData.email }}</p>
    </div>
    <div
      class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 sm:px-4 gap-1 sm:gap-0"
    >
      <p class="text-sm text-secondary">Phone number</p>
      <p class="font-semibold">
        {{ personalData.phone ? personalData.phone : "-" }}
      </p>
    </div>

    <p class="px-2 sm:px-4 text-sm text-secondary">
      {{
        personalData?.newsletter
          ? "Is subscribed to the newsletter."
          : "Is not subscribed to the newsletter."
      }}
    </p>
  </div>
</template>
