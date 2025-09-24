<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";

const cartStore = useCartStore();
cartStore.loadFromStorage();

const validationSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, "Name is required."),
    surname: z.string().min(1, "Surname is required."),
    address: z.string().min(1, "Address is required."),
    phone: z.string().min(1, "Phone number is required."),
    email: z.email("Wrong email format.").min(1, "Email is required."),
  })
);

const { handleSubmit, meta } = useForm({
  validationSchema,
  initialValues: {
    name: "",
    surname: "",
    address: "",
    phone: "",
    email: "",
  },
});

const { value: name, errorMessage: nameError } = useField<string>("name");
const { value: surname, errorMessage: surnameError } =
  useField<string>("surname");
const { value: address, errorMessage: addressError } =
  useField<string>("address");
const { value: phone, errorMessage: phoneError } = useField<string>("phone");
const { value: email, errorMessage: emailError } = useField<string>("email");

const handleSubmitOrder = () => {
  console.log("submit");
};

const onSubmit = handleSubmit(handleSubmitOrder);
</script>

<template>
  <form
    @submit="onSubmit"
    class="lg:w-[30vw] max-w-[32rem] max-h-[40rem] h-min flex flex-col bg-[#ddd] px-8 py-4 gap-4 rounded-md mt-2"
  >
    <span class="w-full flex justify-between items-center">
      <h2 class="text-2xl text-primary font-semibold">Summary</h2>
      <p class="text-primary">{{ cartStore.itemCount }} Items</p>
    </span>

    <div class="flex flex-col gap-2 lg:gap-4">
      <span class="w-full flex items-center justify-between gap-2">
        <div class="w-full lg:w-[50%]">
          <input
            type="text"
            v-model="name"
            placeholder="Name"
            class="h-[2.5rem] bg-white text-lg px-2 rounded-md"
          />
          <p v-if="nameError" class="h-[1rem] text-sm text-[red] pl-1 mt-1">
            {{ nameError }}
          </p>
        </div>
        <div class="w-full lg:w-[50%]">
          <input
            type="text"
            v-model="surname"
            placeholder="Surname"
            class="h-[2.5rem] bg-white text-lg px-2 rounded-md"
          />
          <p v-if="surnameError" class="h-[1rem] text-sm text-[red] pl-1 mt-1">
            {{ surnameError }}
          </p>
        </div>
      </span>

      <div class="w-full">
        <input
          type="text"
          v-model="address"
          placeholder="Shipping address"
          class="w-full h-[2.5rem] bg-white text-lg px-2 rounded-md"
        />
        <p v-if="addressError" class="h-[1rem] text-sm text-[red] pl-1 mt-1">
          {{ addressError }}
        </p>
      </div>

      <span
        class="w-full flex flex-col lg:flex-row items-center justify-between gap-2"
      >
        <div class="w-full lg:w-[50%]">
          <input
            type="text"
            v-model="email"
            placeholder="Email"
            class="w-full h-[2.5rem] bg-white text-lg px-2 rounded-md"
          />
          <p v-if="emailError" class="h-[1rem] text-sm text-[red] pl-1 mt-1">
            {{ emailError }}
          </p>
        </div>
        <div class="w-full lg:w-[50%]">
          <input
            type="text"
            v-model="phone"
            placeholder="Phone"
            class="w-full h-[2.5rem] bg-white text-lg px-2 rounded-md"
          />
          <p v-if="phoneError" class="h-[1rem] text-sm text-[red] pl-1 mt-1">
            {{ phoneError }}
          </p>
        </div>
      </span>
    </div>

    <div class="flex flex-col gap-1">
      <select class="w-full h-[2.5rem] bg-white text-lg px-2 rounded-md">
        <option>Standard delivery | $4.99</option>
        <option>Express delivery | $14.99</option>
        <option>Personal pickup | Free</option>
      </select>
    </div>

    <div class="w-full self-center h-[2px] bg-[#444] mt-6"></div>

    <span class="w-full flex justify-between items-center px-2">
      <p class="text-primary">Subtotal</p>
      <p class="text-primary">${{ cartStore.totalPrice }}</p>
    </span>
    <span class="w-full flex justify-between items-center px-2">
      <p class="text-primary">Shipping</p>
      <p class="text-primary">$4.99</p>
    </span>
    <span class="w-full flex justify-between items-center px-2">
      <p class="text-2xl text-primary font-semibold">Total</p>
      <p class="text-2xl text-primary font-semibold">
        ${{ cartStore.totalPrice }}
      </p>
    </span>
    <button
      v-if="meta.valid"
      class="w-[80%] max-w-[24rem] h-[2.5rem] bg-[#444] text-light rounded-md self-center mt-auto hover:cursor-pointer hover:bg-[#222] transition-color ease-in-out duration-200"
    >
      Continue
    </button>
    <button
      v-if="!meta.valid"
      class="w-[80%] max-w-[24rem] h-[2.5rem] bg-[#888] text-light rounded-md self-center mt-auto"
    >
      Continue
    </button>
    <button
      v-if="meta.valid"
      class="w-[80%] max-w-[24rem] h-[2.5rem] bg-[#444] text-light rounded-md self-center mt-auto"
    >
      <i class="pi pi-spin pi-spinner"></i>
    </button>
  </form>
</template>
