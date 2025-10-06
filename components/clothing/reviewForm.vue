<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useCreateReview } from "~/composables/reviews/item/useCreateReview";

const { createReview, loading } = useCreateReview();

const { item_id } = defineProps<{
  item_id: number;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const validationSchema = toTypedSchema(
  z.object({
    review: z.string().min(1, "Please write a review."),
    name: z.string().min(1, "Provide your credentials to us."),
    rating: z.number().min(1, "Please leave a rating"),
  })
);

const { handleSubmit, meta } = useForm({
  validationSchema,
  initialValues: {
    review: "",
    name: "",
    rating: 0,
  },
});

const { value: review } = useField<string>("review");
const { value: name } = useField<string>("name");
const { value: rating } = useField<number>("rating");

const handleReviewSubmit = async () => {
  const reviewData = {
    id: 0,
    item_id: item_id,
    review: review.value,
    name: name.value,
    rating: rating.value,
    created_at: "",
  };

  await createReview(reviewData);

  review.value = "";
  name.value = "";
  rating.value = 0;
  emit("close");
};

const onSubmit = handleSubmit(handleReviewSubmit);
</script>

<template>
  <form
    @submit="onSubmit"
    class="wfull flex flex-col gap-4 p-4 rounded-lg bg-[#eee]"
  >
    <h3 class="text-lg">Write your review</h3>

    <div class="flex items-center justify-between pr-4">
      <p class="text-sm text-secondary">How do you rate this product?</p>
      <StarReview v-model="rating" />
    </div>

    <textarea
      v-model="review"
      placeholder="Describe your experience with this product"
      class="w-full h-[5rem] text-sm outline-0 p-2 border-1 border-[#6a6272] rounded-md resize-none"
    ></textarea>

    <input
      v-model="name"
      placeholder="Your name"
      type="text"
      class="w-full h-[2.5rem] text-sm outline-0 p-2 border-1 border-[#6a6272] rounded-md"
    />

    <button
      type="submit"
      v-if="!loading && meta.valid"
      class="max-w-[12rem] w-full h-[2.5rem] bg-[#445388] text-light rounded-md self-end hover:cursor-pointer hover:bg-[#212842] active:bg-[#212842] transition-color ease-in-out duration-200"
    >
      Confirm
    </button>
    <button
      type="submit"
      v-if="!loading && !meta.valid"
      class="max-w-[12rem] w-full h-[2.5rem] bg-[#8088a3] text-light rounded-md self-end"
    >
      Confirm
    </button>
    <button
      v-if="loading && meta.valid"
      class="max-w-[12rem] w-full h-[2.5rem] bg-[#445388] text-light rounded-md self-end"
    >
      <i class="pi pi-spin pi-spinner"></i>
    </button>
  </form>
</template>
