<script setup lang="ts">
import { useFetchSingleGarment } from "~/composables/garments/useFetchSingle";
import { Icon } from "@iconify/vue";
const route = useRoute();
const itemid = Number(route.params.id);

const { garment, loading, error, refresh } = useFetchSingleGarment(itemid);

const isExpanded = ref<boolean>(false);

onMounted(() => {
  refresh();
});
</script>

<template>
  <NavMenu :scrollY="200" />
  <main
    class="w-screen h-screen pt-[4rem] flex flex-col justify-center bg-[#F8F9FA]"
  >
    <div
      v-if="garment"
      class="py-4 px-8 md:p-16 w-full h-full flex flex-col md:flex-row"
    >
      <div class="bg-[#d9d9d9] w-full md:w-[60%] flex flex-col md:flex-row">
        <img
          src="https://static.vecteezy.com/system/resources/previews/034/969/304/non_2x/ai-generated-t-shirt-mockup-clip-art-free-png.png"
          class="w-full md:w-[50%] hover:bg-[#000]/5 hover:cursor-pointer"
        />
        <div class="w-full md:w-[50%] h-full flex flex-row-reverse md:flex-col">
          <img
            src="https://static.vecteezy.com/system/resources/previews/034/969/304/non_2x/ai-generated-t-shirt-mockup-clip-art-free-png.png"
            class="w-[40%] md:w-full md:h-[60%] hover:bg-[#000]/5 hover:cursor-pointer"
          />
          <img
            src="https://static.vecteezy.com/system/resources/previews/034/969/304/non_2x/ai-generated-t-shirt-mockup-clip-art-free-png.png"
            class="w-[60%] md:w-full md:h-[40%] hover:bg-[#000]/5 hover:cursor-pointer"
          />
        </div>
      </div>
      <div
        class="w-full md:w-[40%] p-4 flex flex-col justify-between bg-[#F8F9FA]"
      >
        <div class="flex flex-col gap-4">
          <h3 class="text-xl md:text-3xl font-thin">{{ garment.name }}</h3>

          <h3 class="text-xl md:text-3xl font-thin">${{ garment.price }}</h3>
          <div class="w-full h-[1px] bg-black"></div>

          <div class="flex items-center">
            <Icon
              icon="tabler:star-filled"
              class="text-[#445388] md:text-2xl"
            />
            <Icon
              icon="tabler:star-filled"
              class="text-[#445388] md:text-2xl"
            />
            <Icon
              icon="tabler:star-filled"
              class="text-[#445388] md:text-2xl"
            />
            <Icon
              icon="tabler:star-filled"
              class="text-[#445388] md:text-2xl"
            />
            <Icon icon="tabler:star" class="text-[#445388] md:text-2xl" />
            <p class="text-sm font-thin ml-[1rem]">
              Rating: {{ garment.category }}
            </p>
          </div>

          <div class="w-full flex items-center justify-around">
            <select
              class="w-[4rem] md:w-[6rem] h-[2.5rem] rounded-lg bg-[#d9d9d9] flex justify-center"
            >
              <option>XS</option>
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>
            <button
              class="w-[8rem] md:w-[16rem] h-[2.5rem] bg-[#445388] rounded-lg flex items-center justify-center text-light hover:bg-[#212842] active:bg-[#212842] hover:cursor-pointer self-center"
            >
              Add to cart
            </button>
          </div>

          <button
            @click="isExpanded = !isExpanded"
            class="w-full h-[2.5rem] flex items-center justify-between px-[1rem] text-primary text-lg rounded-lg hover:cursor-pointer self-center hover:bg-black/5"
          >
            See details
            <Icon v-if="!isExpanded" icon="tabler:chevron-right" />
            <Icon v-if="isExpanded" icon="tabler:chevron-down" />
          </button>
          <div
            v-if="isExpanded"
            class="w-full self-center px-[2rem] flex flex-col"
          >
            <p class="text-sm text-secondary font-thin">Description</p>
            <p class="text-primary">{{ garment.description }}</p>
            <p class="text-sm text-secondary font-thin">Fabrics</p>
            <p class="text-primary">{{ garment.fabrics }}</p>
          </div>
        </div>

        <div class="w-full flex flex-col items-center mt-6">
          <h2 class="text-lg font-thin">You may also like</h2>
          <div
            class="w-full flex items-center px-3 gap-8 overflow-x-auto whitespace-nowrap"
          >
            <img
              src="https://static.vecteezy.com/system/resources/previews/034/969/304/non_2x/ai-generated-t-shirt-mockup-clip-art-free-png.png"
              class="h-[12rem] hover:bg-[#000]/5 hover:cursor-pointer"
            />
            <img
              src="https://static.vecteezy.com/system/resources/previews/034/969/304/non_2x/ai-generated-t-shirt-mockup-clip-art-free-png.png"
              class="h-[12rem] hover:bg-[#000]/5 hover:cursor-pointer"
            />
            <img
              src="https://static.vecteezy.com/system/resources/previews/034/969/304/non_2x/ai-generated-t-shirt-mockup-clip-art-free-png.png"
              class="h-[12rem] hover:bg-[#000]/5 hover:cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
