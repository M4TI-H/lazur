<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
const loading = ref<boolean>(false);

const userStore = useUserStore();

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
const showError = ref<boolean>(false);

const error = computed(() => {
  return (
    loginError.value || passwordError.value || confirmPasswordError.value || ""
  );
});

const handleRegister = async () => {
  try {
    await userStore.signUp(login.value, password.value);
  } catch (error: any) {
    return;
  }
};

const onSubmit = handleSubmit(handleRegister);
</script>

<template>
  <main class="w-full h-screen">
    <img class="absolute w-full h-screen object-cover z-10" src="/login.jpg" />
    <div
      class="w-full h-full flex items-center justify-center absolute z-20 bg-stone-800/70"
    >
      <form
        @submit.prevent="onSubmit"
        class="relative min-h-[30rem] max-h-[42rem] w-full min-w-[18rem] md:min-w-[28rem] max-w-[90%] md:max-w-[32rem] lg:max-w-[32rem] p-4 gap-4 sm:gap-8 flex flex-col items-center bg-white border-2 border-gray-300 rounded-lg overflow-y-auto mx-auto"
      >
        <div class="w-full flex items-center justify-between">
          <h1 class="self-start text-xl text-sky-800 font-bold">Lazur</h1>
          <NuxtLink to="/" class="text-sm text-gray-500">Back</NuxtLink>
        </div>
        <h2
          class="text-xl sm:text-2xl font-bold text-center mt-4 text-stone-800"
        >
          Create new account
        </h2>
        <p
          class="text-sm text-gray-500 font-semibold text-center max-w-[20rem]"
        >
          Join Lazur and redefine your everyday essentials with timeless design.
        </p>

        <ErrorMessage v-if="showError && error" :error="error" />

        <div
          class="relative max-w-[20rem] lg:max-w-[24rem] w-full self-center my-2"
        >
          <i
            class="pi pi-user absolute text-gray-500 text-lg left-3 top-1/2 -translate-y-1/2"
          ></i>
          <input
            type="text"
            v-model="login"
            placeholder="Login"
            class="w-full pl-10 h-[2.5rem] bg-gray-200 border-1 border-gray-300 outline-gray-300 text-sm px-2 rounded-md"
          />
        </div>
        <div
          class="relative max-w-[20rem] lg:max-w-[24rem] w-full self-center my-2"
        >
          <i
            class="pi pi-lock-open absolute text-lg left-3 top-1/2 -translate-y-1/2 text-gray-500"
          ></i>
          <input
            type="password"
            v-model="password"
            placeholder="Password"
            class="w-full pl-10 h-[2.5rem] bg-gray-200 border-1 border-gray-300 outline-gray-300 text-sm px-2 rounded-md"
          />
        </div>
        <div
          class="relative max-w-[20rem] lg:max-w-[24rem] w-full self-center mt-2"
        >
          <i
            class="pi pi-lock absolute text-lg left-3 top-1/2 -translate-y-1/2 text-gray-500"
          ></i>
          <input
            type="password"
            v-model="confirmPassword"
            placeholder="Confirm password"
            class="w-full pl-10 h-[2.5rem] bg-gray-200 border-1 border-gray-300 outline-gray-300 text-sm px-2 rounded-md"
          />
        </div>

        <SubmitButton :loading="loading" :valid="meta.valid" />

        <span class="mt-auto text-sm text-gray-500 text-center"
          >Already registered?
          <br class="sm:hidden" />
          <NuxtLink
            to="/account/login"
            class="!text-sky-800 cursor-pointer hover:underline"
            >Sign in</NuxtLink
          >.</span
        >
      </form>
    </div>
  </main>
</template>
