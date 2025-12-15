<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useCreateItemReview } from "~/composables/reviews/item/useCreateItemReview";
import { useReviewImageUpload } from "~/composables/reviews/useReviewImageUpload";

const userStore = useUserStore();

const { createItemReview, loading } = useCreateItemReview();
const { uploadImage, imageUrl, uploadLoading } = useReviewImageUpload();

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
const previewImageUrl = ref<string>("");

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

  reviewImage.value = null;
  previewImageUrl.value = "";

  emit("close");
};

const onSubmit = handleSubmit(handleReviewSubmit);
</script>

<template>
  <form
    @submit.prevent="onSubmit"
    class="relative h-full min-h-[30rem] w-full min-w-[18rem] md:min-w-[28rem] lg:min-w-[32rem] max-w-[90%] md:max-w-[32rem] lg:max-w-[64rem] p-4 gap-4 sm:gap-8 flex flex-col bg-white border-2 border-gray-300 rounded-lg overflow-y-auto mx-auto"
  >
    <div class="flex items-center justify-between">
      <h2 class="sm:text-xl font-semibold truncate">
        Reviewing {{ item_name }}
      </h2>
      <ExitButton @click="emit('close')" />
    </div>

    <ErrorMessage v-if="error" :error="error" />

    <ImageSelector
      v-model="previewImageUrl"
      @file-selected="reviewImage = $event"
    />

    <div
      class="w-full flex sm:flex-row sm:items-center justify-between sm:px-4"
    >
      <p class="text-sm text-gray-500">Your rating</p>
      <StarReview v-model="rating" />
    </div>

    <div class="relative w-full h-[6rem] sm:h-[8rem] sm:px-4">
      <textarea
        v-model="review"
        placeholder="Describe your experience with this product"
        class="w-full h-full text-sm md:text-base outline-0 p-2 border-1 border-gray-300 rounded-md resize-none"
      ></textarea>
      <p
        class="absolute bottom-1 right-2 text-xs sm:text-sm text-gray-500 sm:px-4"
      >
        {{ review.length }}/500
      </p>
    </div>

    <SubmitButton :loading="loading" :valid="meta.valid" />
  </form>
</template>
