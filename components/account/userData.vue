<script setup lang="ts">
import type PersonalData from "~/types/PersonalData";

const { personalData } = defineProps<{
  personalData: PersonalData;
}>();
</script>

<template>
  <div v-if="personalData" class="flex flex-col">
    <span class="flex flex-col sm:flex-row sm:items-center sm:gap-2">
      <p class="text-secondary">Name -</p>
      <p class="font-semibold">{{ personalData.name }}</p>
    </span>
    <span class="flex flex-col sm:flex-row sm:items-center sm:gap-2">
      <p class="text-secondary">Email address -</p>
      <p class="font-semibold">{{ personalData.email }}</p>
    </span>
    <span class="flex flex-col sm:flex-row sm:items-center sm:gap-2">
      <p class="text-secondary">Phone number -</p>
      <p class="font-semibold">
        {{ personalData.phone ? personalData.phone : "-" }}
      </p>
    </span>
    <p class="text-secondary">
      {{
        personalData?.newsletter
          ? "Subscribed to the newsletter"
          : "Not subscribed to the newsletter"
      }}
    </p>
  </div>
</template>
