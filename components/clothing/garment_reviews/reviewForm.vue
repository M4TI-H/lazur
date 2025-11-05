<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useCreateItemReview } from "~/composables/reviews/item/useCreateItemReview";

const { createItemReview, loading } = useCreateItemReview();

const { item_id, item_name } = defineProps<{
  item_id: number;
  item_name: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const validationSchema = toTypedSchema(
  z.object({
    review: z.string().min(1, "Please write a review."),
    rating: z.number().min(1, "Please leave a rating"),
  })
);

const { handleSubmit, meta } = useForm({
  validationSchema,
  initialValues: {
    review: "",
    rating: 0,
  },
});

const { value: review } = useField<string>("review");
const { value: rating } = useField<number>("rating");

const handleReviewSubmit = async () => {
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
    class="w-[18rem] md:w-[36rem] min-h-[18rem] flex flex-col gap-4 p-4 rounded-lg bg-[#eee]"
  >
    <div class="flex items-center justify-between">
      <h2 class="text-xl md:text-2xl font-semibold">
        Reviewing {{ item_name }}
      </h2>
      <button @click="emit('close')">
        <i class="pi pi-times text-lg hover:cursor-pointer"></i>
      </button>
    </div>

    <div class="w-full flex items-center gap-8">
      <p class="text-sm md:text-lg text-secondary">Your rating</p>
      <StarReview v-model="rating" />
    </div>

    <textarea
      v-model="review"
      placeholder="Describe your experience with this product"
      class="w-full h-[6rem] md:h-[10rem] text-sm md:text-lg outline-0 p-2 border-1 border-[#6a6272] rounded-md resize-none"
    ></textarea>

    <button
      type="submit"
      v-if="!loading && meta.valid"
      class="max-w-[12rem] w-full h-[2.5rem] bg-[#445388] text-light rounded-md mt-auto self-end hover:cursor-pointer hover:bg-[#212842] active:bg-[#212842] transition-color ease-in-out duration-200"
    >
      Confirm
    </button>
    <button
      type="submit"
      v-if="!loading && !meta.valid"
      class="max-w-[12rem] w-full h-[2.5rem] bg-[#8088a3] text-light rounded-md mt-auto self-end"
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
