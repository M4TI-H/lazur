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
  <main
    class="max-w-screen w-full min-h-screen flex items-center justify-center bg-[#bbb] py-8"
  >
    <form
      @submit.prevent="onSubmit"
      class="relative bg-[#dee2e6] w-[90%] sm:w-full min-w-[18rem] max-w-[22rem] sm:max-w-[24rem] h-[20rem] py-4 px-8 flex flex-col items-center rounded-xl gap-2 z-30"
    >
      <div class="w-full flex items-center justify-between">
        <h1 class="self-start text-xl !text-[#445388] font-bold">Lazur</h1>
        <NuxtLink to="/account/login" class="text-sm text-secondary"
          >Back</NuxtLink
        >
      </div>
      <h2 class="text-xl sm:text-2xl font-bold text-center mt-4">
        Change password
      </h2>
      <p class="text-sm text-secondary font-semibold text-center max-w-[22rem]">
        Link to change password form
        <br class="hidden sm:block" />
        will be sent to your email.
      </p>
      <div
        class="h-[4rem] max-w-[20rem] lg:max-w-[24rem] w-full flex flex-col mt-8"
      >
        <div class="relative max-w-[20rem] lg:max-w-[24rem] w-full self-center">
          <i
            class="pi pi-user absolute text-secondary text-lg left-3 top-1/2 -translate-y-1/2"
          ></i>
          <input
            type="text"
            v-model="email"
            placeholder="Email"
            class="bg-[#ccc] w-full h-[2.5rem] rounded-lg pl-10 pr-2 focus:outline-2 placeholder:text-secondary outline-none font-semibold"
          />
        </div>
        <p v-if="emailError" class="h-[1rem] text-[red] text-sm ml-2 mt-1">
          {{ emailError }}
        </p>
      </div>

      <SubmitButton :loading="loading" :valid="meta.valid" />
    </form>
  </main>
</template>
