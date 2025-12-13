<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
const loading = ref<boolean>(false);

const validationSchema = toTypedSchema(
  z.object({
    login: z.email(),
  })
);
const { handleSubmit, meta } = useForm({
  validationSchema,
  initialValues: {
    login: "",
  },
});

const { value: email, errorMessage: emailError } = useField<string>("email");

const handleLogin = async () => {
  loading.value = true;

  loading.value = false;
};

const onSubmit = handleSubmit(handleLogin);
</script>

<template>
  <main class="w-full h-screen">
    <img class="absolute w-full h-screen object-cover z-10" src="/login.jpg" />
    <div
      class="w-full h-full flex items-center justify-center absolute z-20 bg-stone-800/70"
    >
      <form
        @submit.prevent="onSubmit"
        class="relative min-h-[20rem] max-h-[32rem] w-full min-w-[18rem] md:min-w-[28rem] max-w-[90%] md:max-w-[32rem] lg:max-w-[32rem] p-4 gap-4 flex flex-col items-center bg-white border-2 border-gray-300 rounded-lg overflow-y-auto mx-auto"
      >
        <div class="w-full flex items-center justify-between">
          <h1 class="self-start text-xl text-sky-800 font-bold">Lazur</h1>
          <NuxtLink to="/account/login" class="text-sm text-gray-500"
            >Back</NuxtLink
          >
        </div>
        <h2
          class="text-xl sm:text-2xl font-bold text-center mt-4 text-stone-800"
        >
          Change password
        </h2>
        <p class="text-sm text-gray-500 font-semibold text-center">
          Link to change password form will be sent to your email.
        </p>

        <ErrorMessage v-if="emailError" :error="emailError" />
        <div
          class="relative max-w-[20rem] lg:max-w-[24rem] w-full self-center my-4"
        >
          <i
            class="pi pi-user absolute text-gray-500 text-lg left-3 top-1/2 -translate-y-1/2"
          ></i>
          <input
            type="text"
            v-model="email"
            placeholder="Email"
            class="w-full pl-10 h-[2.5rem] bg-gray-200 border-1 border-gray-300 outline-gray-300 text-sm px-2 rounded-md"
          />
        </div>

        <SubmitButton :loading="loading" :valid="meta.valid" />
      </form>
    </div>
  </main>
</template>
