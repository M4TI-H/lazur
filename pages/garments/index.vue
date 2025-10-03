<script setup lang="ts">
import { Icon } from "@iconify/vue";
const { scrollY } = useScroll();

const expandSorting = ref<boolean>(false);
</script>

<template>
  <NavMenu :scrollY="scrollY" />
  <main
    class="w-full min-h-screen flex flex-col items-center bg-[#F8F9FA] overflow-y-auto"
  >
    <section class="w-full h-[40vh] relative flex flex-col items-center">
      <img
        class="w-full h-full object-cover z-10"
        src="https://images.unsplash.com/photo-1664095885291-80e42e5692ae?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <div
        class="absolute bg-[#1F1D20]/70 w-full h-full z-20 flex items-center justify-center"
      >
        <h1
          class="text-xl md:text-4xl text-center text-light font-bold whitespace-nowrap"
        >
          Discover our world of<br />quality clothing.
        </h1>
      </div>
    </section>
    <CategoryMenu />
    <div class="relative w-full flex items-center gap-8 px-16">
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2">
          <button
            @click="expandSorting = !expandSorting"
            class="flex items-center justify-between px-2 w-[6rem] h-[2.5rem] bg-[#eee] rounded-lg outline-0 font-semibold hover:cursor-pointer hover:bg-[#ddd]"
          >
            Sort by
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
              class="size-[2.5rem] bg-[#eee] flex items-center justify-center rounded-l-lg hover:bg-[#ddd] hover:cursor-pointer"
            >
              <Icon icon="tabler:sort-ascending" />
            </button>
            <button
              class="size-[2.5rem] bg-[#eee] flex items-center justify-center rounded-r-lg hover:bg-[#ddd] hover:cursor-pointer"
            >
              <Icon icon="tabler:sort-descending" />
            </button>
          </span>
        </div>

        <div class="absolute top-[3rem] bg-[#eee] w-[10rem] rounded-lg">
          <button
            class="w-full h-[2.5rem] flex items-center px-2 hover:bg-[#ddd] hover:cursor-pointer rounded-t-lg font-semibold"
          >
            Price
          </button>
          <button
            class="w-full h-[2.5rem] flex items-center px-2 hover:bg-[#ddd] hover:cursor-pointer font-semibold"
          >
            Rating
          </button>
          <button
            class="w-full h-[2.5rem] flex items-center px-2 hover:bg-[#ddd] hover:cursor-pointer rounded-b-lg font-semibold"
          >
            Popularity
          </button>
        </div>
      </div>
    </div>
    <ClothesDisplay />
  </main>
</template>
