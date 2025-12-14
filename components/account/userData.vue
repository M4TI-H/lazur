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
    class="w-full h-[17rem] sm:h-[15rem] gap-2 sm:gap-4 flex flex-col bg-white border-2 border-gray-200 rounded-lg overflow-y-auto"
  >
    <div class="w-full flex items-center justify-between bg-sky-800 p-4">
      <h2 class="text-xl text-gray-200 font-semibold">Personal data</h2>
      <button
        @click="emit('modify')"
        class="text-sm flex items-center justify-center gap-2 text-gray-200 py-1 px-2 rounded-full bg-sky-900 hover:bg-sky-900/80 cursor-pointer transition-colors duration-150"
      >
        Change
        <i class="pi pi-pencil text-xs"></i>
      </button>
    </div>
    <div
      class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 sm:px-4 gap-1 sm:gap-0"
    >
      <p class="text-sm text-gray-500">Name</p>
      <p v-if="personalData && personalData.name" class="font-semibold">
        {{ personalData.name }}
      </p>
      <div v-else class="w-[10rem] h-[1.5rem] bg-gray-200"></div>
    </div>
    <div
      class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 sm:px-4 gap-1 sm:gap-0"
    >
      <p class="text-sm text-gray-500">Email address</p>
      <p v-if="personalData && personalData.email" class="font-semibold">
        {{ personalData.email }}
      </p>
      <div v-else class="w-[10rem] h-[1.5rem] bg-gray-200"></div>
    </div>
    <div
      class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 sm:px-4 gap-1 sm:gap-0"
    >
      <p class="text-sm text-gray-500">Phone number</p>
      <p v-if="personalData && personalData.phone" class="font-semibold">
        {{ personalData.phone ? personalData.phone : "-" }}
      </p>
      <div v-else class="w-[10rem] h-[1.5rem] bg-gray-200"></div>
    </div>

    <p v-if="personalData" class="px-2 sm:px-4 text-sm text-gray-500">
      {{
        personalData && personalData.newsletter
          ? "You're subscribed to the newsletter."
          : "You're not subscribed to the newsletter."
      }}
    </p>
    <div v-else class="w-[14rem] h-[1.5rem] bg-gray-200 ml-[1rem]"></div>
  </div>
</template>
