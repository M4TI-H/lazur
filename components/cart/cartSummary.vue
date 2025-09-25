<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";

const loading = ref<boolean>(false);
const orderStore = useOrderStore();
orderStore.loadFromStorage();
const cartStore = useCartStore();
cartStore.loadFromStorage();

const validationSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, "Name is required."),
    surname: z.string().min(1, "Surname is required."),
    phone: z.string().min(1, "Phone number is required."),
    email: z.string().min(1, "Email is required.").email("Wrong email format."),
  })
);

const { handleSubmit, meta } = useForm({
  validationSchema,
  initialValues: {
    name: "",
    surname: "",
    phone: "",
    email: "",
  },
});

const { value: name, errorMessage: nameError } = useField<string>("name");
const { value: surname, errorMessage: surnameError } =
  useField<string>("surname");
const { value: phone, errorMessage: phoneError } = useField<string>("phone");
const { value: email, errorMessage: emailError } = useField<string>("email");

const handleSubmitData = async () => {
  loading.value = true;

  const orderData = {
    name: name.value,
    surname: surname.value,
    email: email.value,
    phone: phone.value,
    total: Number(cartStore.totalPrice),
  };

  orderStore.setOrderData(orderData);

  navigateTo("/cart/order");

  loading.value = false;
};

const onSubmit = handleSubmit(handleSubmitData);
</script>

<template>
  <form
    @submit="onSubmit"
    class="lg:w-[30vw] max-w-[32rem] max-h-[40rem] h-min flex flex-col bg-[#ddd] px-8 py-4 gap-4 rounded-md mt-2"
  >
    <span class="w-full flex justify-between items-center">
      <h2 class="text-2xl font-semibold">Summary</h2>
      <p class="">{{ cartStore.itemCount }} Items</p>
    </span>

    <div class="flex flex-col gap-2 lg:gap-4">
      <span class="w-full flex items-center justify-between gap-2">
        <div class="w-full lg:w-[50%]">
          <input
            type="text"
            v-model="name"
            placeholder="Name"
            class="w-full h-[2.5rem] bg-white text-lg px-2 rounded-md"
          />
          <p v-if="nameError" class="h-[1rem] text-sm !text-[red] pl-1 mt-1">
            {{ nameError }}
          </p>
        </div>
        <div class="w-full lg:w-[50%]">
          <input
            type="text"
            v-model="surname"
            placeholder="Surname"
            class="w-full h-[2.5rem] bg-white text-lg px-2 rounded-md"
          />
          <p v-if="surnameError" class="h-[1rem] text-sm !text-[red] pl-1 mt-1">
            {{ surnameError }}
          </p>
        </div>
      </span>

      <span class="w-full flex flex-col justify-center gap-4">
        <div class="w-full">
          <input
            type="text"
            v-model="email"
            placeholder="Email"
            class="w-full h-[2.5rem] bg-white text-lg px-2 rounded-md"
          />
          <p v-if="emailError" class="h-[1rem] text-sm !text-[red] pl-1 mt-1">
            {{ emailError }}
          </p>
        </div>
        <div class="w-full">
          <input
            type="text"
            v-model="phone"
            placeholder="Phone"
            class="w-full h-[2.5rem] bg-white text-lg px-2 rounded-md"
          />
          <p v-if="phoneError" class="h-[1rem] text-sm !text-[red] pl-1 mt-1">
            {{ phoneError }}
          </p>
        </div>
      </span>
    </div>

    <div class="w-full self-center h-[2px] bg-[#444] mt-6"></div>

    <span class="w-full flex justify-between items-center px-2">
      <p class="text-2xl font-semibold">Total</p>
      <p class="text-2xl font-semibold">
        ${{ cartStore.totalPrice
        }}<span class="text-sm text-secondary"> + delivery</span>
      </p>
    </span>
    <button
      v-if="!loading && meta.valid"
      class="w-[80%] max-w-[24rem] h-[2.5rem] bg-[#444] text-light rounded-md self-center mt-auto hover:cursor-pointer hover:bg-[#222] transition-color ease-in-out duration-200"
    >
      Continue
    </button>
    <button
      v-if="!loading && !meta.valid"
      class="w-[80%] max-w-[24rem] h-[2.5rem] bg-[#666] text-light rounded-md self-center mt-auto"
    >
      Continue
    </button>
    <button
      v-if="loading && meta.valid"
      class="w-[80%] max-w-[24rem] h-[2.5rem] bg-[#444] text-light rounded-md self-center mt-auto"
    >
      <i class="pi pi-spin pi-spinner"></i>
    </button>
  </form>
</template>
