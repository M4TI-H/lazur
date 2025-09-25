<script setup lang="ts">
import { useFetchSingleGarment } from "~/composables/garments/useFetchSingle";
import { Icon } from "@iconify/vue";
const route = useRoute();
const itemid = Number(route.params.id);

const { garment, loading, refresh } = useFetchSingleGarment(itemid);

const isExpanded = ref<boolean>(false);

onMounted(() => {
  refresh();
});
</script>

<template>
  <NavMenu :scrollY="200" />
  <main
    class="w-full min-h-screen pt-[4rem] flex flex-col items-center justify-center bg-[#F8F9FA]"
  >
    <div
      v-if="garment"
      class="py-4 px-8 md:p-16 w-full lg:w-[90vw] xl:w-[80vw] h-full min-h-[36rem] flex flex-col md:flex-row"
    >
      <div class="w-full md:w-[60%] flex flex-col-reverse md:flex-row">
        <div
          class="w-full md:w-[20%] h-full flex md:flex-col justify-center gap-4 py-4 md:px-4"
        >
          <img
            src="https://static.vecteezy.com/system/resources/previews/034/969/304/non_2x/ai-generated-t-shirt-mockup-clip-art-free-png.png"
            class="w-1/3 max-w-[6rem] md:w-full md:max-w-full max-h-[4rem] md:h-[8rem] md:max-h-[6rem] bg-[#d9d9d9] hover:bg-[#000]/5 hover:cursor-pointer"
          />
          <img
            src="https://static.vecteezy.com/system/resources/previews/034/969/304/non_2x/ai-generated-t-shirt-mockup-clip-art-free-png.png"
            class="w-1/3 max-w-[6rem] md:w-full md:max-w-full max-h-[4rem] md:h-[8rem] md:max-h-[6rem] bg-[#d9d9d9] hover:bg-[#000]/5 hover:cursor-pointer"
          />
          <img
            src="https://static.vecteezy.com/system/resources/previews/034/969/304/non_2x/ai-generated-t-shirt-mockup-clip-art-free-png.png"
            class="w-1/3 max-w-[6rem] md:w-full md:max-w-full max-h-[4rem] md:h-[8rem] md:max-h-[6rem] bg-[#d9d9d9] hover:bg-[#000]/5 hover:cursor-pointer"
          />
        </div>
        <img
          src="https://static.vecteezy.com/system/resources/previews/034/969/304/non_2x/ai-generated-t-shirt-mockup-clip-art-free-png.png"
          class="w-full md:w-[80%] md:max-w-full bg-[#d9d9d9] hover:bg-[#000]/5 hover:cursor-pointer"
        />
      </div>
      <div
        class="w-full md:w-[40%] p-4 flex flex-col justify-between bg-[#F8F9FA]"
      >
        <div class="flex flex-col gap-2 md:gap-4">
          <h3 class="text-xl md:text-3xl font-thin whitespace-nowrap">
            {{ garment.name }}
          </h3>

          <h3 class="text-xl md:text-3xl font-thin">
            ${{ garment.price.toFixed(2) }}
          </h3>
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

          <div>
            <button
              @click="isExpanded = !isExpanded"
              class="w-full h-[2.5rem] flex items-center justify-between text-lg rounded-lg hover:cursor-pointer self-center hover:bg-black/5"
            >
              See details
              <Icon v-if="!isExpanded" icon="tabler:chevron-right" />
              <Icon v-if="isExpanded" icon="tabler:chevron-down" />
            </button>
            <div
              v-if="isExpanded"
              class="w-full self-center px-[0.5rem] md:px-[1rem] flex flex-col z-20"
            >
              <p class="text-sm text-secondary font-thin">Description</p>
              <p>{{ garment.description }}</p>
              <p class="text-sm text-secondary font-thin whitespace-nowrap">
                Categry
              </p>
              <p>
                {{
                  garment.category.charAt(0).toUpperCase() +
                  garment.category.slice(1)
                }}
              </p>
              <p class="text-sm text-secondary font-thin">Fabrics</p>
              <p class="whitespace-nowrap">
                {{ garment.fabrics }}
              </p>
            </div>
          </div>
        </div>

        <div class="w-full flex items-center justify-around gap-2">
          <select
            class="w-[6rem] h-[2.5rem] rounded-lg bg-[#d9d9d9] flex justify-center"
          >
            <option class="text-center">XS</option>
            <option class="text-center">S</option>
            <option class="text-center">M</option>
            <option class="text-center">L</option>
            <option class="text-center">XL</option>
          </select>
          <button
            class="w-[10rem] md:w-[16rem] h-[2.5rem] bg-[#445388] rounded-lg flex items-center justify-center text-light hover:bg-[#212842] active:bg-[#212842] hover:cursor-pointer self-center"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>

    <div
      class="w-[90vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw] flex flex-col gap-4"
    >
      <h2 class="text-lg">You may also like</h2>
      <div class="w-full flex px-3 gap-8 overflow-x-auto whitespace-nowrap">
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
  </main>
</template>
