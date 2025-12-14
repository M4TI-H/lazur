<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useCreateReview } from "~/composables/reviews/useCreateReview";

const emit = defineEmits<{
  (e: "submit"): void;
}>();

const props = defineProps<{
  name?: string;
}>();

const userStore = useUserStore();

const { createReview, loading } = useCreateReview();
const showError = ref<boolean>(false);

const validationSchema = toTypedSchema(
  z.object({
    review: z.string().min(1, "Please write a review."),
    name: z
      .string()
      .refine((val) => userStore.isLoggedIn || (!!val && val.trim() !== ""), {
        message: "Provide your name if you are not logged in.",
      }),
    quality: z.number().min(1, "Please leave a rating"),
    price: z.number().min(1, "Please leave a rating"),
    satisfaction: z.number().min(1, "Please leave a rating"),
    experience: z.number().min(1, "Please leave a rating"),
  })
);

const { handleSubmit, meta } = useForm({
  validationSchema,
  initialValues: {
    review: "",
    name: "",
    quality: 0,
    price: 0,
    satisfaction: 0,
    experience: 0,
  },
});

const { value: review, errorMessage: reviewError } = useField<string>("review");
const { value: name, errorMessage: nameError } = useField<string>("name");
const { value: quality, errorMessage: qualityError } =
  useField<number>("quality");
const { value: satisfaction, errorMessage: satisfactionError } =
  useField<number>("satisfaction");
const { value: price, errorMessage: priceError } = useField<number>("price");
const { value: experience, errorMessage: experienceError } =
  useField<number>("experience");

const error = computed(() => {
  return (
    nameError.value ||
    reviewError.value ||
    qualityError.value ||
    satisfactionError.value ||
    priceError.value ||
    experienceError.value ||
    ""
  );
});

const handleReviewSubmit = async () => {
  const reviewData = {
    id: 0,
    review: review.value,
    price: price.value,
    quality: quality.value,
    satisfaction: satisfaction.value,
    shopping_experience: experience.value,
    general_rating: 0,
    name: userStore.isLoggedIn && props.name ? props.name : name.value,
    created_at: "",
  };

  await createReview(reviewData);

  emit("submit");
};

const onSubmit = handleSubmit(
  async () => {
    showError.value = true;
    await handleReviewSubmit();
  },
  () => {
    showError.value = true;
  }
);
</script>
<template>
  <form
    @submit="onSubmit"
    class="fixed w-full min-w-[18rem] sm:max-w-[24rem] xl:max-w-[28rem] h-auto p-4 gap-4 sm:gap-8 flex flex-col bg-white border-2 border-gray-300 rounded-lg overflow-y-auto z-10"
  >
    <div class="w-full flex items-center justify-between">
      <h2 class="text-xl font-semibold">Review</h2>
      <NuxtLink
        to="/"
        class="text-sm text-gray-700 cursor-pointer hover:underline"
      >
        Cancel
      </NuxtLink>
    </div>

    <ErrorMessage v-if="showError && error" :error="error" />
    <div class="pl-1 text-gray-700 flex flex-col gap-2">
      <div
        class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between sm:px-4 gap-1 sm:gap-0"
      >
        <p class="text-sm text-gray-700">Quality</p>
        <StarReview v-model="quality" />
      </div>

      <div
        class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between sm:px-4 gap-1 sm:gap-0"
      >
        <p class="text-sm text-gray-700">Price</p>
        <StarReview v-model="price" />
      </div>

      <div
        class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between sm:px-4 gap-1 sm:gap-0"
      >
        <p class="text-sm text-gray-700">Satisfaction</p>
        <StarReview v-model="satisfaction" />
      </div>

      <div
        class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between sm:px-4 gap-1 sm:gap-0"
      >
        <p class="text-sm text-gray-700">Shopping experience</p>
        <StarReview v-model="experience" />
      </div>
    </div>

    <div
      class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between sm:px-4 gap-1 sm:gap-0"
    >
      <p class="text-sm text-gray-700">Your Review</p>
      <div class="w-full sm:w-[14rem] flex flex-col gap-1">
        <textarea
          v-model="review"
          class="w-full sm:w-[14rem] h-[8rem] text-sm outline-0 p-2 bg-gray-200 border-1 border-gray-300 rounded-md resize-none"
        ></textarea>
        <p class="text-xs text-gray-700 px-1">
          Please note that your review will be visible to other clients.
        </p>
      </div>
    </div>

    <div
      v-if="!userStore.isLoggedIn"
      class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between sm:px-4 gap-1 sm:gap-0"
    >
      <p class="text-sm text-gray-700">Your Name</p>
      <input
        v-model="name"
        type="text"
        class="w-full sm:w-[14rem] h-[2rem] bg-gray-200 border-1 border-gray-300 outline-0 text-lg px-2 rounded-md"
      />
    </div>

    <SubmitButton :loading="loading" :valid="meta.valid" />
  </form>
</template>
