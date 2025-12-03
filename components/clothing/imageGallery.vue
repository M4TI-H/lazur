<script setup lang="ts">
import { useFetchAllImages } from "~/composables/garments/images/useFetchAllImages";
import { useFetchCoverImage } from "~/composables/garments/images/useFetchCoverImage";
import type ProductImage from "~/types/ProductImage";
import { Swiper, SwiperSlide } from "swiper/vue";

const props = defineProps<{
  itemid: number;
}>();

const { images, imagesLoading, imagesError, refreshImages } = useFetchAllImages(
  props.itemid
);

const { cover, coverLoading, refreshCover } = useFetchCoverImage(props.itemid);

const featuredImage = ref<ProductImage | null>(cover.value);

watch(
  cover,
  (newImage) => {
    if (newImage) {
      featuredImage.value = newImage;
    }
  },
  { immediate: true }
);

const selectImage = (image: ProductImage) => {
  featuredImage.value = image;
};

onMounted(async () => {
  await refreshCover();
  await refreshImages();
});
</script>

<template>
  <div class="w-full min-w-[18rem] flex gap-2">
    <div v-if="images" class="hidden lg:flex w-[8rem] flex-col gap-2">
      <div v-for="image in images" class="w-full h-[8rem] hover:bg-black">
        <img
          :key="image.id"
          :src="image.url"
          @click="selectImage(image)"
          class="w-full h-full cursor-pointer hover:opacity-80"
        />
      </div>
    </div>
    <div
      class="relative w-full lg:w-[36rem] h-[28rem] lg:h-[36rem] xl:h-[44rem] bg-slate-100 flex items-center"
    >
      <div
        class="lg:hidden scrollbar-hide w-full h-[28rem] lg:h-[36rem] xl:h-[44rem] flex flex-row overflow-x-auto whitespace-nowrap snap-x snap-mandatory"
      >
        <img
          v-for="image in images"
          :key="image.id"
          :src="image.url"
          class="flex-shrink-0 w-full h-full snap-center"
        />
      </div>

      <img
        v-if="featuredImage"
        :src="featuredImage.url"
        class="hidden lg:flex w-full h-auto max-h-[44rem]"
      />
      <div
        v-if="images"
        class="absolute h-[1rem] bottom-2 lg:bottom-4 right-4 flex gap-1"
      >
        <div
          v-for="image in images"
          :key="image.id"
          class="size-[1rem] border border-slate-700 bg-white p-0.5"
        >
          <div
            v-if="image.id === featuredImage?.id"
            class="size-full bg-sky-700"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
