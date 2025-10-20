<script setup lang="ts">
import { useFetchSingleGarment } from "~/composables/garments/useFetchSingle";
import { Icon } from "@iconify/vue";
import { useFetchRating } from "~/composables/reviews/item/useFetchRating";
const route = useRoute();
const itemid = Number(route.params.id);

const cartStore = useCartStore();
cartStore.loadFromStorage();

const { garment, loading, refresh } = useFetchSingleGarment(itemid);
const { rating, ratingLoading, ratingRefresh } = useFetchRating(itemid);

const selectedSize = ref<string>("");
const displayReviews = ref<boolean>(false);
const displayForm = ref<boolean>(false);

function addToCart() {
  if (garment.value && selectedSize.value !== "-") {
    cartStore.addToCart(garment.value, selectedSize.value);

    selectedSize.value = "-";
  }
}

onMounted(async () => {
  await refresh();
  await ratingRefresh();
});

watch(displayReviews, (val) => {
  if (val) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});
</script>

<template>
  <NavMenu :scrollY="200" />
  <main
    class="relative w-full min-h-screen pt-[4rem] flex flex-col items-center justify-center bg-[#F8F9FA]"
  >
    <div
      v-if="garment"
      class="relative py-4 px-8 md:p-16 w-full lg:w-[90vw] xl:w-[80vw] h-full min-h-[36rem] flex flex-col md:flex-row"
    >
      <ImageGallery />
      <div class="w-full md:w-[40%] p-4 flex flex-col gap-4 bg-[#F8F9FA]">
        <div class="flex flex-col gap-2 md:gap-4">
          <div class="flex flex-col">
            <h3 class="text-xl md:text-3xl font-thin whitespace-nowrap">
              {{ garment.name }}
            </h3>
            <div class="flex items-center gap-4">
              <h3 class="md:text-xl font-thin">
                ${{ garment.price.toFixed(2) }}
              </h3>
              <button
                @click="displayReviews = true"
                class="flex hover:cursor-pointer hover:bg-[#eee] p-1 rounded-md"
              >
                <Icon
                  v-for="i in 5"
                  :key="i"
                  :icon="
                    i <= (rating ?? 0) ? 'tabler:star-filled' : 'tabler:star'
                  "
                  class="text-[#445388]"
                />
              </button>
            </div>
          </div>

          <div class="w-full h-[1px] bg-[#1f1d20]"></div>

          <Details :garment="garment" />
        </div>

        <SizeSelection
          v-model="selectedSize"
          :value="selectedSize"
          :id="garment.id"
          @addToCart="addToCart()"
        />

        <div class="w-full h-[1px] bg-[#1f1d20]"></div>

        <div class="flex flex-col gap-2">
          <button
            @click="displayReviews = true"
            class="w-full h-[2.5rem] flex items-center justify-between text-lg rounded-lg border-1 border-[#6a6272] hover:cursor-pointer self-center hover:bg-black/5 px-2"
          >
            Read reviews
            <Icon icon="tabler:chevron-right" />
          </button>
          <button
            @click="displayForm = !displayForm"
            class="w-full h-[2.5rem] flex items-center justify-between text-lg rounded-lg border-1 border-[#6a6272] hover:cursor-pointer self-center hover:bg-black/5 px-2"
          >
            Write a review
            <Icon v-if="!displayForm" icon="tabler:chevron-right" />
            <Icon v-if="displayForm" icon="tabler:chevron-down" />
          </button>
        </div>

        <ReviewForm
          v-if="displayForm"
          @close="displayForm = false"
          :item_id="itemid"
        />
      </div>
    </div>

    <div
      v-if="displayReviews"
      class="absolute top-0 w-screen h-screen bg-[#1f1d20]/50 flex items-center justify-center z-20"
    >
      <ItemReviews @close="displayReviews = false" />
    </div>

    <ItemSuggestions />
  </main>
</template>
