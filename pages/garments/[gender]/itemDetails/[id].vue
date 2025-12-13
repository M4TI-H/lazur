<script setup lang="ts">
import { useFetchSingleGarment } from "~/composables/garments/useFetchSingle";
import { Icon } from "@iconify/vue";
import { useFetchItemRating } from "~/composables/reviews/item/useFetchItemRating";
const route = useRoute();
const itemid = Number(route.params.id);

const cartStore = useCartStore();
cartStore.loadFromStorage();
const userStore = useUserStore();

const { garment, loading, refresh } = useFetchSingleGarment(itemid);
const { rating, ratingLoading, ratingRefresh } = useFetchItemRating(itemid);

const selectedSize = ref<string>("");
const displayReviews = ref<boolean>(false);
const displayForm = ref<boolean>(false);
const displayAlert = ref<boolean>(false);

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

watch([displayReviews, displayForm], ([reviews, form]) => {
  if (reviews || form) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});
</script>

<template>
  <NavMenu :scrollY="200" />
  <main
    class="relative w-full min-h-screen flex flex-col items-center justify-center bg-white pt-13 overflow-x-hidden"
  >
    <div
      v-if="garment"
      class="relative py-4 w-full xl:w-[80rem] h-full min-h-[36rem] flex flex-col lg:flex-row"
    >
      <ImageGallery :itemid="itemid" />

      <div class="w-full flex flex-col items-center sm:items-start gap-2 p-4">
        <h3 class="text-xl md:text-3xl font-thin whitespace-nowrap">
          {{ garment.name }}
        </h3>
        <div class="flex items-center gap-4">
          <h3 class="sm:text-xl font-thin">${{ garment.price.toFixed(2) }}</h3>
          <button
            @click="displayReviews = true"
            class="flex :cursor-pointer hover:bg-gray-100 p-2 rounded-md"
          >
            <Icon
              v-for="i in 5"
              :key="i"
              :icon="
                i <= (Number(rating?.avg_rating) ?? 0)
                  ? 'tabler:star-filled'
                  : 'tabler:star'
              "
              class="text-sky-800"
            />
          </button>
        </div>

        <div class="w-full min-w-[18rem] h-[1px] bg-gray-700"></div>

        <SizeSelection
          v-model="selectedSize"
          :value="selectedSize"
          :id="garment.id"
          @addToCart="addToCart()"
        />
        <Details :garment="garment" />

        <div class="w-full min-w-[18rem] h-[1px] bg-gray-700 my-2"></div>

        <div
          class="w-full min-w-[18rem] max-w-[24rem] sm:max-w-full flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <button
            @click="displayReviews = true"
            class="w-full sm:w-1/2 h-[2.5rem] flex items-center justify-center gap-2 rounded-md border border-gray-700 cursor-pointer hover:bg-gray-100 text-gray-500 px-2"
          >
            <i class="pi pi-comments"></i>
            Read reviews
          </button>
          <button
            @click="displayForm = !displayForm"
            class="w-full sm:w-1/2 h-[2.5rem] flex items-center justify-center gap-2 rounded-md border border-gray-700 cursor-pointer hover:bg-gray-100 text-gray-500 px-2"
          >
            <i class="pi pi-thumbs-up"></i>
            Write a review
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="displayForm"
      class="fixed inset-0 w-screen min-h-screen bg-black/60 flex items-center justify-center z-50"
    >
      <div class="absolute inset-0" @click="displayForm = false"></div>
      <div class="relative z-10">
        <ReviewForm
          v-if="userStore.isLoggedIn"
          @close="displayForm = false"
          @closeAlert="
            displayForm = false;
            displayAlert = true;
          "
          :item_id="itemid"
          :item_name="garment?.name"
        />
        <NotLoggedAlert
          @close="
            displayForm = false;
            displayAlert = false;
          "
          v-if="!userStore.isLoggedIn || displayAlert"
        />
      </div>
    </div>
    <div
      v-if="displayReviews"
      class="fixed inset-0 w-screen min-h-screen bg-gray-700/50 flex items-center justify-center z-50"
    >
      <div class="w-full relative z-10 flex justify-center">
        <div class="absolute inset-0" @click="displayReviews = false"></div>
        <ItemReviews @close="displayReviews = false" :item_id="itemid" />
      </div>
    </div>
  </main>
</template>
