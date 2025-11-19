<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useCreateItemReview } from "~/composables/reviews/item/useCreateItemReview";

const userStore = useUserStore();

const { createItemReview, loading } = useCreateItemReview();

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

const handleReviewSubmit = async () => {
  if (!userStore.isLoggedIn) {
    emit("closeAlert");
  }
  await createItemReview(item_id, review.value, rating.value);

  review.value = "";
  rating.value = 0;
  emit("close");
};

const onSubmit = handleSubmit(handleReviewSubmit);
</script>

<template>
  <form
    @submit="onSubmit"
    class="w-[18rem] md:w-[36rem] min-h-[18rem] flex flex-col gap-4 p-4 rounded-lg bg-white border-2 border-[#ccc]"
  >
    <div class="flex items-center justify-between">
      <h2 class="text-xl md:text-2xl font-semibold">
        Reviewing {{ item_name }}
      </h2>
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

    <div class="w-full flex items-center gap-8">
      <p class="text-sm md:text-lg text-secondary">Your rating</p>
      <StarReview v-model="rating" />
    </div>

    <div class="relative w-full h-[6rem] md:h-[10rem]">
      <textarea
        v-model="review"
        placeholder="Describe your experience with this product"
        class="w-full h-full text-sm md:text-lg outline-0 p-2 border-1 border-[#6a6272] rounded-md resize-none"
      ></textarea>
      <p class="absolute bottom-2 right-4 text-sm text-secondary">
        {{ review.length }}/500
      </p>
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
