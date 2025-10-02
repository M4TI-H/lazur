<script setup lang="ts">
import { useFetchSingleGarment } from "~/composables/garments/useFetchSingle";
import { Icon } from "@iconify/vue";
const route = useRoute();
const itemid = Number(route.params.id);

const { garment, loading, refresh } = useFetchSingleGarment(itemid);

const selectedSize = ref<string>("");

const isExpanded = ref<boolean>(false);
const isReviewExpanded = ref<boolean>(false);

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
        class="w-full md:w-[40%] p-4 flex flex-col gap-4 bg-[#F8F9FA]"
      >
        <div class="flex flex-col gap-2 md:gap-4">
          <div class="flex flex-col">
            <h3 class="text-xl md:text-3xl font-thin whitespace-nowrap">
              {{ garment.name }}
            </h3>

            <div class="flex items-center gap-4">
              <h3 class="md:text-xl font-thin">
                ${{ garment.price.toFixed(2) }}
              </h3>
              <span class="flex">
                <Icon
                  v-for="i in 5"
                  :key="i"
                  :icon="
                    i <= 4 ? 'tabler:star-filled' : 'tabler:star'
                  "
                  class="text-[#445388]"
                />
              </span>
            </div>
          </div>
          
          <div class="w-full h-[1px] bg-black"></div>

          <Details :garment="garment"/>
        </div>

        <SizeSelection v-model="selectedSize" :value="selectedSize"/>
        <div>
          <button
            @click="isReviewExpanded = !isReviewExpanded"
            class="w-full h-[2.5rem] flex items-center justify-between text-lg rounded-lg hover:cursor-pointer self-center hover:bg-black/5 pr-2"
          >
            Leave a review
            <Icon v-if="!isReviewExpanded" icon="tabler:chevron-right" />
            <Icon v-if="isReviewExpanded" icon="tabler:chevron-down" />
          </button>
          <div
            v-if="isReviewExpanded"
            class="w-full self-center flex flex-col gap-2 z-20"
          >
            <div class="w-full flex flex-col gap-1">
              <p>Your Name</p>
              <input
                type="text"
                class="w-full h-[2.5rem] text-sm outline-0 p-2 border-1 border-[#6a6272] rounded-md"
              />
            </div>

            <div class="w-full flex flex-col gap-1">
              <p>Your Review</p>
              <textarea
                class="w-full h-[5rem] text-sm outline-0 p-2 border-1 border-[#6a6272] rounded-md resize-none"
              ></textarea>
            </div>

            <button
              class="w-full max-w-[8rem] md:w-[8rem] h-[2.5rem] bg-[#445388] rounded-lg flex items-center justify-center text-light hover:bg-[#212842] active:bg-[#212842] hover:cursor-pointer self-center sm:self-start"
            >
              Submit
            </button>
          </div>
          
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
