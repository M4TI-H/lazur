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
    class="fixed w-full min-w-[14rem] max-w-[90%] sm:max-w-[24rem] xl:max-w-[28rem] min-h-[32rem] p-4 gap-4 sm:gap-8 flex flex-col bg-white border-2 border-[#ccc] rounded-lg overflow-y-auto"
  >
    <div class="w-full flex items-center justify-between">
      <h2 class="text-xl font-semibold">Modify personal data</h2>
      <button
        @click="emit('close')"
        class="text-sm flex items-center justify-center p-1 rounded-full hover:bg-[#ccc]/50 hover:cursor-pointer transition-colors duration-150"
      >
        <i class="pi pi-times"></i>
      </button>
    </div>
    <div
      v-if="error"
      class="bg-[#f8d8d8] border-1 border-[#b14e4e] rounded-md p-2"
    >
      <p class="!text-[#b14e4e] text-sm">{{ error }}</p>
    </div>
    <div
      class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between sm:px-4 gap-1 sm:gap-0"
    >
      <p class="text-sm text-secondary">Name</p>
      <input
        v-model="name"
        type="text"
        class="w-full sm:w-[14rem] xl:w-[16rem] h-[2.5rem] bg-[#eee] text-lg px-2 rounded-md"
      />
    </div>
    <div
      class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between sm:px-4 gap-1 sm:gap-0"
    >
      <p class="text-sm text-secondary">Phone number</p>
      <input
        v-model="phone"
        type="text"
        class="w-full sm:w-[14rem] xl:w-[16rem] h-[2.5rem] bg-[#eee] text-lg px-2 rounded-md"
      />
    </div>
    <div
      class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between sm:px-4 gap-1 sm:gap-0"
    >
      <p class="text-sm text-secondary">Email address</p>
      <input
        type="text"
        :value="props.personalData.email"
        disabled
        class="w-full sm:w-[14rem] xl:w-[16rem] h-[2.5rem] bg-[#eee] text-lg px-2 rounded-md opacity-50"
      />
    </div>
    <div
      class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-around sm:px-4 gap-1 sm:gap-0"
    >
      <p class="text-sm text-secondary">Subscribe to the newsletter</p>
      <input v-model="newsletter" type="checkbox" class="size-[1rem]" />
    </div>

    <button
      v-if="!personalDataLoading"
      class="w-[80%] max-w-[12rem] h-[2.5rem] bg-[#445388] text-light rounded-md self-center mt-auto hover:cursor-pointer hover:bg-[#212842] transition-color ease-in-out duration-200"
    >
      Confirm
    </button>

    <button
      v-if="personalDataLoading && meta.valid"
      class="w-[80%] max-w-[12rem] h-[2.5rem] bg-[#445388] text-light rounded-md self-center mt-auto"
    >
      <i class="pi pi-spin pi-spinner"></i>
    </button>
  </form>
</template>
