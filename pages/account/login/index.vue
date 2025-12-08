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
  <main
    class="max-w-screen w-full min-h-screen flex items-center justify-center bg-[#aaa] py-8"
  >
    <form
      @submit.prevent="onSubmit"
      class="relative bg-[#dee2e6] w-[90%] sm:w-full min-w-[18rem] max-w-[22rem] sm:max-w-[24rem] h-[32rem] py-4 px-8 flex flex-col items-center rounded-xl gap-2 z-30"
    >
      <div class="w-full flex items-center justify-between">
        <h1 class="self-start text-xl !text-[#445388] font-bold">Lazur</h1>
        <NuxtLink to="/" class="text-sm text-secondary">Back</NuxtLink>
      </div>
      <h2 class="text-xl sm:text-2xl font-bold text-center mt-4">
        Sign in with email
      </h2>
      <p class="text-sm text-secondary font-semibold text-center max-w-[22rem]">
        Enter your details below and
        <br class="sm:hidden" />
        continue your
        <br class="hidden sm:block" />
        journey into
        <br class="sm:hidden" />
        modernminimalism.
      </p>

      <div
        v-if="showError && error"
        class="w-full bg-[#f8d8d8] border-1 border-[#b14e4e] rounded-md p-2"
      >
        <p class="!text-[#b14e4e] text-sm">{{ error }}</p>
      </div>

      <div
        class="relative max-w-[20rem] lg:max-w-[24rem] w-full self-center my-4"
      >
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

      <div
        class="relative max-w-[20rem] lg:max-w-[24rem] w-full self-center mt-4"
      >
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

      <NuxtLink
        to="/account/login/changePassword"
        class="text-sm md:text-md text-secondary font-semibold hover:cursor-pointer hover:underline self-end mt-1"
      >
        Forgot password?
      </NuxtLink>

      <SubmitButton :loading="loading" :valid="meta.valid" />

      <span class="mt-auto text-sm text-secondary text-center"
        >Not registered yet?
        <br class="sm:hidden" />
        <NuxtLink
          to="/account/register"
          class="!text-[#445388] hover:cursor-pointer hover:underline"
          >Create an account</NuxtLink
        >.</span
      >
    </form>
  </main>
</template>
