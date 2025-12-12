<script setup lang="ts">
import { Icon } from "@iconify/vue";

const sortStore = useSortStore();
sortStore.loadFromStorage();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const expandSorting = ref<boolean>(false);
</script>

<template>
  <div class="self-center flex items-center gap-2">
    <div class="flex">
      <button
        @click="sortStore.setDirection(true)"
        class="size-[2.5rem] flex items-center justify-center rounded-l-lg hover:bg-gray-300 cursor-pointer"
        :class="[sortStore.ascending === true ? 'bg-gray-300' : 'bg-gray-200']"
      >
        <Icon icon="tabler:sort-ascending" />
      </button>
      <button
        @click="sortStore.setDirection(false)"
        class="size-[2.5rem] flex items-center justify-center rounded-r-lg hover:bg-gray-300 cursor-pointer"
        :class="[sortStore.ascending === false ? 'bg-gray-300' : 'bg-gray-200']"
      >
        <Icon icon="tabler:sort-descending" />
      </button>
    </div>
    <div class="relative flex flex-col items-center">
      <button
        @click="expandSorting = !expandSorting"
        class="flex items-center justify-between min-w-[8rem] px-2 gap-2 h-[2.5rem] bg-gray-200 text-sm rounded-lg outline-0 font-semibold cursor-pointer truncate hover:bg-gray-300"
      >
        Sorting by
        {{
          sortStore.option.charAt(0).toUpperCase() + sortStore.option.slice(1)
        }}
        <Icon
          v-if="!expandSorting"
          icon="tabler:caret-right-filled"
          class="text-sm"
        />
        <Icon
          v-if="expandSorting"
          icon="tabler:caret-down-filled"
          class="text-sm"
        />
      </button>
      <div
        v-if="expandSorting"
        class="absolute top-[3rem] z-20 bg-essa-200 w-[10rem] rounded-lg self-start"
      >
        <button
          @click="
            sortStore.setOption('popularity');
            expandSorting = false;
          "
          class="w-full h-[2.5rem] flex items-center px-2 hover:bg-gray-300 cursor-pointer rounded-t-lg font-semibold gap-2"
          :class="[
            sortStore.option === 'popularity' ? 'bg-gray-300' : 'bg-none',
          ]"
        >
          <Icon icon="tabler:chart-bar-popular" />
          Popularity
        </button>
        <button
          @click="
            sortStore.setOption('price');
            expandSorting = false;
          "
          class="w-full h-[2.5rem] flex items-center px-2 hover:bg-gray-300 cursor-pointer font-semibold gap-2"
          :class="[sortStore.option === 'price' ? 'bg-gray-300' : 'bg-none']"
        >
          <Icon icon="tabler:coins" />
          Price
        </button>
        <button
          @click="
            sortStore.setOption('rating');
            expandSorting = false;
          "
          class="w-full h-[2.5rem] flex items-center px-2 hover:bg-gray-300 cursor-pointer rounded-b-lg font-semibold gap-2"
          :class="[sortStore.option === 'rating' ? 'bg-gray-300' : 'bg-none']"
        >
          <Icon icon="tabler:star" />
          Rating
        </button>
      </div>
    </div>
  </div>
</template>
