<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
const supabase = useSupabaseClient();
const loading = ref<boolean>(false);

const validationSchema = toTypedSchema(
  z
    .object({
      login: z.email(),
      password: z
        .string()
        .min(1, "Password is required")
        .min(6, { message: "Password must include at least 6 characters" })
        .regex(/[!@#$%^&]/, {
          message: "At least one special character - !@#$%^&",
        })
        .regex(/(?=.*[A-Z])/, { message: "At least one capitalized letter" }),
      confirmPassword: z.string().nonempty({ message: "Password is required" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords are not the same",
      path: ["confirmPassword"],
    })
);

const { handleSubmit, meta } = useForm({
  validationSchema,
  initialValues: {
    login: "",
    password: "",
    confirmPassword: "",
  },
});

const { value: login, errorMessage: loginError } = useField<string>("login");
const { value: password, errorMessage: passwordError } =
  useField<string>("password");
const { value: confirmPassword, errorMessage: confirmPasswordError } =
  useField<string>("confirmPassword");

const handleRegister = async () => {
  loading.value = true;
  try {
    const { data, error } = await supabase.auth.signUp({
      email: login.value.trim(),
      password: password.value,
    });
    loading.value = false;

    if (data.user) {
      navigateTo("/account/login");
    }
  } catch (error: any) {
    loading.value = false;
  }
};

const onSubmit = handleSubmit(handleRegister);
</script>

<template>
  <main
    class="max-w-screen w-full min-h-screen flex items-center justify-center bg-[#bbb] py-8"
  >
    <form
      @submit.prevent="onSubmit"
      class="relative bg-[#dee2e6] w-[90%] sm:w-full min-w-[18rem] max-w-[22rem] sm:max-w-[24rem] h-[34rem] py-4 px-8 flex flex-col items-center rounded-xl gap-2 z-30"
    >
      <div class="w-full flex items-center justify-between">
        <h1 class="self-start text-xl !text-[#445388] font-bold">Lazur</h1>
        <NuxtLink to="/" class="text-sm text-secondary">Back</NuxtLink>
      </div>
      <h2 class="text-xl sm:text-2xl font-bold text-center mt-4">
        Create new account
      </h2>
      <p class="text-sm text-secondary font-semibold text-center max-w-[22rem]">
        Join Lazur and redefine your
        <br class="sm:hidden" />
        everyday essentials
        <br class="hidden sm:block" />
        with timeless design.
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
            v-model="login"
            placeholder="Login"
            class="bg-[#ccc] w-full h-[2.5rem] rounded-lg pl-10 pr-2 focus:outline-2 placeholder:text-secondary outline-none font-semibold"
          />
        </div>
        <p v-if="loginError" class="h-[1rem] !text-[red] text-sm ml-2 mt-1">
          {{ loginError }}
        </p>
      </div>
      <div class="h-[4rem] max-w-[20rem] lg:max-w-[24rem] w-full flex flex-col">
        <div class="relative max-w-[20rem] lg:max-w-[24rem] w-full self-center">
          <i
            class="pi pi-lock absolute text-lg left-3 top-1/2 -translate-y-1/2 text-secondary"
          ></i>
          <input
            type="password"
            v-model="password"
            placeholder="Password"
            class="bg-[#ccc] w-full h-[2.5rem] rounded-lg pl-10 pr-2 focus:outline-2 placeholder:text-secondary outline-none font-semibold"
          />
        </div>

        <p v-if="passwordError" class="h-[1rem] !text-[red] text-sm ml-2 mt-1">
          {{ passwordError }}
        </p>
      </div>
      <div class="h-[4rem] max-w-[20rem] lg:max-w-[24rem] w-full flex flex-col">
        <div class="relative max-w-[20rem] lg:max-w-[24rem] w-full self-center">
          <i
            class="pi pi-lock absolute text-lg left-3 top-1/2 -translate-y-1/2 text-secondary"
          ></i>
          <input
            type="password"
            v-model="confirmPassword"
            placeholder="Confirm password"
            class="bg-[#ccc] w-full h-[2.5rem] rounded-lg pl-10 pr-2 focus:outline-2 placeholder:text-secondary outline-none font-semibold"
          />
        </div>

        <p
          v-if="confirmPasswordError"
          class="h-[1rem] !text-[red] text-sm ml-2 mt-1"
        >
          {{ confirmPassword === password ? "essa" : confirmPasswordError }}
        </p>
      </div>

      <button
        type="submit"
        v-if="!loading && meta.valid"
        class="max-w-[20rem] lg:max-w-[24rem] w-full h-[2.5rem] bg-[#445388] text-light rounded-md hover:cursor-pointer hover:bg-[#212842] active:bg-[#212842] transition-color ease-in-out duration-200"
      >
        Confirm
      </button>
      <button
        type="submit"
        v-if="!loading && !meta.valid"
        class="max-w-[20rem] lg:max-w-[24rem] w-full h-[2.5rem] bg-[#8088a3] text-light rounded-md"
      >
        Confirm
      </button>
      <button
        v-if="loading && meta.valid"
        class="max-w-[20rem] lg:max-w-[24rem] w-full h-[2.5rem] bg-[#445388] text-light rounded-md"
      >
        <i class="pi pi-spin pi-spinner"></i>
      </button>

      <span class="mt-auto text-sm text-secondary text-center"
        >Already registered?
        <br class="sm:hidden" />
        <NuxtLink
          to="/account/login"
          class="!text-[#445388] hover:cursor-pointer hover:underline"
          >Sign in</NuxtLink
        >.</span
      >
    </form>
  </main>
</template>
