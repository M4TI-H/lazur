<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useCreateReview } from "~/composables/reviews/useCreateReview";
const { scrollY } = useScroll();

const { createReview, loading } = useCreateReview();
const confirmReview = ref<boolean>(false);
const showError = ref<boolean>(false);

const validationSchema = toTypedSchema(
  z.object({
    review: z.string().min(1, "Please write a review."),
    name: z.string().min(1, "Provide your credentials to us."),
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
    name: name.value,
    created_at: "",
  };

  await createReview(reviewData);

  confirmReview.value = true;
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
  <NavMenu :scrollY="scrollY" />
  <main
    class="w-full min-h-screen flex flex-col items-center justify-center bg-[#F8F9FA] overflow-hidden"
  >
    <section class="absolute z-10 w-full h-full">
      <img
        class="w-full h-full object-cover"
        src="https://static.vecteezy.com/system/resources/thumbnails/039/653/479/small_2x/ai-generated-stylish-blue-shopping-bags-against-a-matching-blue-background-conveying-a-modern-aesthetic-ai-generated-photo.jpg"
      />
      <div class="absolute inset-0 bg-[#1F1D20]/70"></div>
    </section>

    <form
      v-if="!confirmReview"
      @submit="onSubmit"
      class="fixed w-full min-w-[18rem] sm:max-w-[24rem] xl:max-w-[28rem] h-full max-h-[32rem] sm:h-auto sm:min-h-[34rem] sm:max-h-[40rem] p-4 gap-4 sm:gap-8 flex flex-col bg-white border-2 border-[#ccc] rounded-lg overflow-y-auto z-10"
    >
      <div class="w-full flex items-center justify-between">
        <h2 class="text-xl font-semibold">Review</h2>
        <NuxtLink
          to="/"
          class="text-sm text-secondary hover:cursor-pointer hover:underline"
        >
          Cancel
        </NuxtLink>
      </div>
      <div
        v-if="showError && error"
        class="bg-[#f8d8d8] border-1 border-[#b14e4e] rounded-md p-2"
      >
        <p class="!text-[#b14e4e] text-sm">{{ error }}</p>
      </div>
      <div class="pl-1 text-secondary flex flex-col gap-2">
        <div
          class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between sm:px-4 gap-1 sm:gap-0"
        >
          <p class="text-sm text-secondary">Quality</p>
          <StarReview v-model="quality" />
        </div>

        <div
          class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between sm:px-4 gap-1 sm:gap-0"
        >
          <p class="text-sm text-secondary">Price</p>
          <StarReview v-model="price" />
        </div>

        <div
          class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between sm:px-4 gap-1 sm:gap-0"
        >
          <p class="text-sm text-secondary">Satisfaction</p>
          <StarReview v-model="satisfaction" />
        </div>

        <div
          class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between sm:px-4 gap-1 sm:gap-0"
        >
          <p class="text-sm text-secondary">Shopping experience</p>
          <StarReview v-model="experience" />
        </div>
      </div>

      <div
        class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between sm:px-4 gap-1 sm:gap-0"
      >
        <p class="text-sm text-secondary">Your Review</p>
        <div class="w-full sm:w-[14rem] flex flex-col gap-1">
          <textarea
            v-model="review"
            class="w-full sm:w-[14rem] h-[8rem] text-sm outline-0 p-2 bg-[#eee] rounded-md resize-none"
          ></textarea>
          <p class="text-xs text-secondary px-1">
            Please note that your review will be visible to other clients.
          </p>
        </div>
      </div>

      <div
        class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between sm:px-4 gap-1 sm:gap-0"
      >
        <p class="text-sm text-secondary">Your Name</p>
        <input
          v-model="name"
          type="text"
          class="w-full sm:w-[14rem] h-[2rem] bg-[#eee] text-lg px-2 rounded-md"
        />
      </div>

      <button
        v-if="!loading"
        class="w-[80%] max-w-[16rem] h-[2.5rem] bg-[#445388] text-light rounded-md self-center mt-auto hover:cursor-pointer hover:bg-[#212842] transition-color ease-in-out duration-200"
      >
        Confirm
      </button>

      <button
        v-if="loading && meta.valid"
        class="w-[80%] max-w-[16rem] h-[2.5rem] bg-[#445388] text-light rounded-md self-center mt-auto"
      >
        <i class="pi pi-spin pi-spinner"></i>
      </button>
    </form>

    <ReviewConfirm v-else />
  </main>
</template>
