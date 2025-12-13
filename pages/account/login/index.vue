<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
const loading = ref<boolean>(false);

const userStore = useUserStore();

const validationSchema = toTypedSchema(
  z.object({
    login: z.email(),
    password: z.string().min(1, "Password is required"),
  })
);
const { handleSubmit, meta } = useForm({
  validationSchema,
  initialValues: {
    login: "",
    password: "",
  },
});

const { value: login, errorMessage: loginError } = useField<string>("login");
const { value: password, errorMessage: passwordError } =
  useField<string>("password");
const invalidCredentialsError = ref<string | null>(null);
const showError = ref<boolean>(false);

const error = computed(() => {
  return (
    loginError.value ||
    passwordError.value ||
    invalidCredentialsError.value ||
    ""
  );
});

const handleLogin = async () => {
  invalidCredentialsError.value = null;

  try {
    await userStore.signIn(login.value, password.value);
    navigateTo("/");
  } catch (error: any) {
    invalidCredentialsError.value = "Invalid user credentials";
  }
};

const onSubmit = handleSubmit(
  async () => {
    showError.value = true;
    await handleLogin();
  },
  () => {
    showError.value = true;
  }
);

onMounted(() => {
  if (userStore.isLoggedIn) {
    navigateTo("/");
  }
});
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
          Sign in with email
        </h2>
        <p
          class="text-sm text-gray-500 font-semibold text-center max-w-[20rem]"
        >
          Enter your details below and continue your journey into
          modernminimalism.
        </p>

        <ErrorMessage v-if="showError && error" />

        <div
          class="relative max-w-[20rem] lg:max-w-[24rem] w-full self-center my-4"
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

        <div class="max-w-[20rem] lg:max-w-[24rem] w-full flex flex-col">
          <div class="relative w-full self-center mt-4">
            <i
              class="pi pi-lock absolute text-gray-500 text-lg left-3 top-1/2 -translate-y-1/2"
            ></i>
            <input
              type="password"
              v-model="password"
              placeholder="Password"
              class="w-full pl-10 h-[2.5rem] bg-gray-200 border-1 border-gray-300 outline-gray-300 text-sm px-2 rounded-md"
            />
          </div>

          <NuxtLink
            to="/account/login/changePassword"
            class="text-sm md:text-md text-gray-500 font-semibold cursor-pointer hover:underline self-end mt-1"
          >
            Forgot password?
          </NuxtLink>
        </div>

        <SubmitButton :loading="loading" :valid="meta.valid" />

        <span class="mt-auto text-sm text-gray-500 text-center"
          >Not registered yet?
          <br class="sm:hidden" />
          <NuxtLink
            to="/account/register"
            class="!text-sky-800 cursor-pointer hover:underline"
            >Create an account</NuxtLink
          >.</span
        >
      </form>
    </div>
  </main>
</template>
