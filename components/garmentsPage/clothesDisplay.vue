<script setup lang="ts">
import { items } from "~/src/data/items";
import { useInfiniteScroll } from "@vueuse/core";
</script>

<template>
  <div
    ref="itemList"
    class="w-full max-w-[100vw] flex flex-wrap items-start justify-center gap-4 md:gap-8 p-4 md:p-8"
  >
    <Item v-for="item in items" :key="item.id" :itemData="item" />
  </div>
</template>
