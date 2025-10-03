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
  <section class="relative w-full flex items-center gap-8 px-16">
    <div class="flex items-center gap-2">
      <button
        @click="expandSorting = !expandSorting"
        class="flex items-center justify-between px-2 gap-2 h-[2.5rem] bg-[#eee] rounded-lg outline-0 font-semibold hover:cursor-pointer hover:bg-[#ddd]"
      >
        Sorting By
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
      <span class="flex">
        <button
          @click="sortStore.setDirection(true)"
          class="size-[2.5rem] flex items-center justify-center rounded-l-lg hover:bg-[#ddd] hover:cursor-pointer"
          :class="[sortStore.ascending === true ? 'bg-[#ddd]' : 'bg-[#eee]']"
        >
          <Icon icon="tabler:sort-ascending" />
        </button>
        <button
          @click="sortStore.setDirection(false)"
          class="size-[2.5rem] flex items-center justify-center rounded-r-lg hover:bg-[#ddd] hover:cursor-pointer"
          :class="[sortStore.ascending === false ? 'bg-[#ddd]' : 'bg-[#eee]']"
        >
          <Icon icon="tabler:sort-descending" />
        </button>
      </span>
    </div>

    <div
      v-if="expandSorting"
      class="absolute top-[3rem] bg-[#eee] w-[10rem] rounded-lg"
    >
      <button
        @click="
          sortStore.setOption('popularity');
          expandSorting = false;
        "
        class="w-full h-[2.5rem] flex items-center px-2 hover:bg-[#ddd] hover:cursor-pointer rounded-t-lg font-semibold gap-2"
        :class="[sortStore.option === 'popularity' ? 'bg-[#ddd]' : 'bg-none']"
      >
        <Icon icon="tabler:chart-bar-popular" />
        Popularity
      </button>
      <button
        @click="
          sortStore.setOption('price');
          expandSorting = false;
        "
        class="w-full h-[2.5rem] flex items-center px-2 hover:bg-[#ddd] hover:cursor-pointer font-semibold gap-2"
        :class="[sortStore.option === 'price' ? 'bg-[#ddd]' : 'bg-none']"
      >
        <Icon icon="tabler:coins" />
        Price
      </button>
      <button
        @click="
          sortStore.setOption('rating');
          expandSorting = false;
        "
        class="w-full h-[2.5rem] flex items-center px-2 hover:bg-[#ddd] hover:cursor-pointer rounded-b-lg font-semibold gap-2"
        :class="[sortStore.option === 'rating' ? 'bg-[#ddd]' : 'bg-none']"
      >
        <Icon icon="tabler:star" />
        Rating
      </button>
    </div>
  </section>
</template>
