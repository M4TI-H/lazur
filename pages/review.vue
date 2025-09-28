<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";

const { scrollY } = useScroll();

const validationSchema = toTypedSchema(
  z.object({
    review: z.string().min(1, "Please write a review."),
    name: z.string().min(1, "Provide us your credentials."),
    quality: z.number(),
    price: z.number(),
    satisfaction: z.number(),
    experience: z.number(),
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

const handleReviewSubmit = () => {
  const reviewData = {
    id: 0,
    review: review.value,
    name: name.value,
    quality: quality.value,
    price: price.value,
    experience: experience.value,
    created_at: "",
  };

  console.log(reviewData);
};

const onSubmit = handleSubmit(handleReviewSubmit);
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
      @submit="onSubmit"
      class="lg:w-[24vw] max-w-[90vw] max-h-[48rem] h-min flex flex-col bg-[#ddd] px-4 lg:px-8 py-4 gap-4 rounded-md z-10"
    >
      <h2 class="text-2xl font-semibold">Review Lazur</h2>

      <div class="w-full flex flex-col gap-2">
        <p>Rating</p>
        <div class="pl-1 text-secondary flex flex-col gap-2">
          <span>
            <span class="w-[70%] flex justify-between gap-2">
              <p class="text-sm text-secondary">Quality</p>
              <StarReview v-model="quality" :value="quality" />
            </span>
            <p v-if="satisfactionError" class="text-sm !text-[red]">
              {{ qualityError }}
            </p>
          </span>

          <span>
            <span class="w-[70%] flex justify-between gap-2">
              <p class="text-sm text-secondary">Price</p>
              <StarReview v-model="price" :value="price" />
            </span>
            <p v-if="satisfactionError" class="text-sm !text-[red]">
              {{ priceError }}
            </p>
          </span>

          <span>
            <span class="w-[70%] flex justify-between gap-2">
              <p class="text-sm text-secondary">Satisfaction</p>
              <StarReview v-model="satisfaction" :value="satisfaction" />
            </span>
            <p v-if="satisfactionError" class="text-sm !text-[red]">
              {{ satisfactionError }}
            </p>
          </span>

          <span>
            <span class="w-[70%] flex justify-between gap-2">
              <p class="text-sm text-secondary">Shopping experience</p>
              <StarReview v-model="experience" :value="experience" />
            </span>
            <p v-if="experienceError" class="text-sm !text-[red]">
              {{ experienceError }}
            </p>
          </span>
        </div>
      </div>

      <div class="w-full flex flex-col gap-1">
        <p>Your Review</p>
        <textarea
          v-model="review"
          class="w-full h-[5rem] text-sm outline-0 p-2 border-2 border-[#6a6272] rounded-md resize-none"
        ></textarea>
        <p v-if="reviewError" class="text-sm !text-[red]">{{ reviewError }}</p>
      </div>

      <div class="w-full flex flex-col gap-1">
        <p>Your Name</p>
        <input
          v-model="name"
          type="text"
          class="w-full h-[2.5rem] text-sm outline-0 p-2 border-2 border-[#6a6272] rounded-md"
        />
        <p v-if="nameError" class="text-sm !text-[red]">{{ nameError }}</p>
      </div>

      <div class="w-full flex flex-col gap-1">
        <p>Upload image</p>
        <input
          type="image"
          class="w-full h-[2.5rem] text-sm outline-0 border-2 border-[#6a6272] rounded-md"
        />
      </div>

      <p class="text-sm text-secondary">
        Please note that your review may be visible to other clients.
      </p>

      <button
        v-if="meta.valid"
        class="w-[80%] max-w-[24rem] h-[2.5rem] bg-[#444] text-light rounded-md self-center mt-auto hover:cursor-pointer hover:bg-[#222] transition-color ease-in-out duration-200"
      >
        Confirm
      </button>
      <button
        v-if="!meta.valid"
        class="w-[80%] max-w-[24rem] h-[2.5rem] bg-[#666] text-light rounded-md self-center mt-auto"
      >
        Confirm
      </button>
      <button
        v-if="meta.valid"
        class="w-[80%] max-w-[24rem] h-[2.5rem] bg-[#444] text-light rounded-md self-center mt-auto"
      >
        <i class="pi pi-spin pi-spinner"></i>
      </button>
    </form>
  </main>
</template>
