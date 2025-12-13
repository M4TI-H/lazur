<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useUpdatePersonalData } from "~/composables/users/personalData/useUpdatePersonalData";
import type PersonalData from "~/types/PersonalData";

const emit = defineEmits<{
  (e: "close"): void;
  (e: "refresh"): void;
}>();

const props = defineProps<{
  personalData: PersonalData;
}>();

const { updatePersonalData, personalDataLoading } = useUpdatePersonalData();

const validationSchema = toTypedSchema(
  z.object({
    phone: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
    name: z.string().min(1, "Please provide your name"),
    newsletter: z.boolean(),
  })
);

const { handleSubmit, meta } = useForm({
  validationSchema,
  initialValues: {
    phone: props.personalData.phone,
    name: props.personalData.name,
    newsletter: props.personalData.newsletter,
  },
});

const { value: phone, errorMessage: phoneError } = useField<string>("phone");
const { value: name, errorMessage: nameError } = useField<string>("name");
const { value: newsletter, errorMessage: newsletterError } =
  useField<boolean>("newsletter");

const error = computed(() => {
  return phoneError.value || nameError.value || newsletterError.value || "";
});

const handleSubmitDataChange = async () => {
  await updatePersonalData(name.value, phone.value, newsletter.value);

  emit("close");
  emit("refresh");
};

const onSubmit = handleSubmit(handleSubmitDataChange);
</script>

<template>
  <form
    @submit.prevent="onSubmit"
    class="fixed w-full min-w-[14rem] max-w-[90%] sm:max-w-[24rem] xl:max-w-[28rem] min-h-[32rem] p-4 gap-4 sm:gap-8 flex flex-col bg-white border-2 border-gray-300 rounded-lg overflow-y-auto"
  >
    <div class="w-full flex items-center justify-between mb-4">
      <h2 class="text-xl font-semibold">Modify personal data</h2>
      <ExitButton @click="emit('close')" />
    </div>
    <ErrorMessage v-if="error" :error="error" />
    <div
      class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between sm:px-4 gap-1 sm:gap-0"
    >
      <p class="text-sm text-gray-500">Name</p>
      <input
        v-model="name"
        type="text"
        class="w-full sm:w-[14rem] xl:w-[16rem] h-[2.5rem] bg-gray-200 border-1 border-gray-300 outline-gray-300 text-lg px-2 rounded-md"
      />
    </div>
    <div
      class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between sm:px-4 gap-1 sm:gap-0"
    >
      <p class="text-sm text-gray-500">Phone number</p>
      <input
        v-model="phone"
        type="text"
        class="w-full sm:w-[14rem] xl:w-[16rem] h-[2.5rem] bg-gray-200 border-1 border-gray-300 outline-gray-300 text-lg px-2 rounded-md"
      />
    </div>
    <div
      class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between sm:px-4 gap-1 sm:gap-0"
    >
      <p class="text-sm text-gray-500">Email address</p>
      <input
        type="text"
        :value="props.personalData.email"
        disabled
        class="w-full sm:w-[14rem] xl:w-[16rem] h-[2.5rem] bg-gray-200 border-1 border-gray-300 outline-gray-300 text-lg px-2 rounded-md opacity-50"
      />
    </div>
    <div
      class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-around sm:px-4 gap-1 sm:gap-0"
    >
      <p class="text-sm text-gray-500">Subscribe to the newsletter</p>
      <input v-model="newsletter" type="checkbox" class="size-[1rem]" />
    </div>

    <SubmitButton :loading="personalDataLoading" :valid="meta.valid" />
  </form>
</template>
