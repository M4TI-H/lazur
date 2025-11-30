<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useCreateItemReview } from "~/composables/reviews/item/useCreateItemReview";
import { useImageUpload } from "~/composables/reviews/useImageUpload";

const userStore = useUserStore();

const { createItemReview, loading } = useCreateItemReview();
const { uploadImage, imageUrl, uploadLoading } = useImageUpload();

const { item_id, item_name } = defineProps<{
  item_id: number;
  item_name: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "closeAlert"): void;
}>();

const validationSchema = toTypedSchema(
  z.object({
    review: z
      .string()
      .min(1, "Please, write a review.")
      .max(50, "Your review is too long"),
    rating: z.number().min(1, "Please, leave a rating"),
  })
);

const { handleSubmit, meta } = useForm({
  validationSchema,
  initialValues: {
    review: "",
    rating: 0,
  },
});

const { value: review, errorMessage: reviewError } = useField<string>("review");
const { value: rating, errorMessage: ratingError } = useField<number>("rating");

const error = computed(() => {
  return reviewError.value || ratingError.value || "";
});

const reviewImage = ref<File | null>(null);
const previewImageUrl = ref<string | null>(null);

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;

  if (target.files && target.files.length > 0) {
    reviewImage.value = target.files[0];
    previewImageUrl.value = URL.createObjectURL(reviewImage.value);
  } else {
    reviewImage.value = null;
    previewImageUrl.value = null;
  }
};

const handleReviewSubmit = async () => {
  if (!userStore.isLoggedIn) {
    emit("closeAlert");
  }

  let newImageUrl: string | null = null;

  if (reviewImage.value) {
    newImageUrl = await uploadImage(reviewImage.value);
  }

  await createItemReview(item_id, review.value, rating.value, newImageUrl);

  review.value = "";
  rating.value = 0;
  if (previewImageUrl.value) {
    URL.revokeObjectURL(previewImageUrl.value);
  }
  emit("close");
};

const onSubmit = handleSubmit(handleReviewSubmit);
</script>

<template>
  <form
    @submit.prevent="onSubmit"
    class="relative mx-auto w-[18rem] md:min-w-[32rem] max-w-[90%] sm:max-w-[28rem] xl:max-w-[32rem] min-h-[18rem] p-4 gap-4 sm:gap-8 flex flex-col bg-white border-2 border-[#ccc] rounded-lg overflow-y-auto"
  >
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold">Reviewing {{ item_name }}</h2>
      <button
        @click="emit('close')"
        class="text-sm flex items-center justify-center p-1 rounded-full hover:bg-[#ccc]/50 hover:cursor-pointer transition-colors duration-150"
      >
        <i class="pi pi-times"></i>
      </button>
    </div>

    <div
      v-if="error"
      class="bg-[#f8d8d8] border-1 border-[#b14e4e] rounded-md p-2"
    >
      <p class="!text-[#b14e4e] text-sm">{{ error }}</p>
    </div>

    <div
      class="w-full flex sm:flex-row sm:items-center justify-between sm:px-4"
    >
      <p class="text-sm text-secondary">Your rating</p>
      <StarReview v-model="rating" />
    </div>

    <div class="relative w-full h-[6rem] sm:h-[8rem] sm:px-4">
      <textarea
        v-model="review"
        placeholder="Describe your experience with this product"
        class="w-full h-full text-sm md:text-base outline-0 p-2 border-1 border-[#6a6272] rounded-md resize-none"
      ></textarea>
      <p class="absolute bottom-1 right-2 text-xs sm:text-sm text-secondary">
        {{ review.length }}/500
      </p>
    </div>

    <div class="size-32 mx-auto flex flex-col items-center justify-center">
      <input
        type="file"
        accept="image/*"
        id="selectimage"
        @change="handleFileChange"
        class="hidden"
      />

      <div v-if="previewImageUrl">
        <img :src="previewImageUrl" class="size-30" />
        <button
          as="button"
          class="w-full text-sm text-secondary hover:underline cursor-pointer text-center"
        >
          Remove photo
        </button>
      </div>

      <label
        v-else
        for="selectimage"
        class="size-full border-2 border-dashed border-[#6a6272] rounded-md flex flex-col items-center justify-center gap-1 mx-auto"
      >
        <i class="pi pi-image text-5xl text-secondary"></i>
        <p class="text-secondary text-sm font-semibold">Attach image</p>
      </label>
    </div>

    <button
      type="submit"
      v-if="!loading"
      class="max-w-[12rem] w-full h-[2.5rem] bg-[#445388] text-light rounded-md mt-auto self-end hover:cursor-pointer hover:bg-[#212842] active:bg-[#212842] transition-color ease-in-out duration-200"
    >
      Confirm
    </button>

    <button
      v-if="loading && meta.valid"
      class="max-w-[12rem] w-full h-[2.5rem] bg-[#445388] text-light rounded-md mt-auto self-end"
    >
      <i class="pi pi-spin pi-spinner"></i>
    </button>
  </form>
</template>
