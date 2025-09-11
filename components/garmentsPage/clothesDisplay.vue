<script setup lang="ts">
import { useFetchAllGarments } from "~/composables/garments/useFetchAll";

const { allGarments, loading, error, refresh } = useFetchAllGarments();

onMounted(() => {
  refresh();
});
</script>

<template>
  <div
    class="w-full max-w-[100vw] flex flex-wrap items-start justify-center gap-4 md:gap-8 p-4 md:p-8"
  >
    <i v-if="loading" class="pi pi-spinner pi-spin text-2xl text-black"></i>
    <Item
      v-for="garment in allGarments"
      :key="garment.id"
      :itemData="garment"
    />
  </div>
</template>
