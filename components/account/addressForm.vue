<script setup lang="ts">
// @ts-ignore
import { getNames } from "country-list";
import { useField, useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useCreateAddress } from "~/composables/users/addresses/useCreateAddress";
import type Address from "~/types/Address";

const userStore = useUserStore();

const addressStore = useAddressStore();
addressStore.loadFromStorage();

const countries = getNames();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "refresh", newAddress: number): void;
}>();

const { createAddress, loading } = useCreateAddress();

const validationSchema = toTypedSchema(
  z.object({
    country: z.string().min(1, "Please select your country."),
    city: z.string().min(1, "Please provide your city."),
    postal: z.string().min(1, "Please provide your postal code."),
    street: z.string().min(1, "Please provide your street name."),
    building: z.string().min(1, "Please provide your building number."),
    flat: z.string().nullable(),
  })
);

const { handleSubmit, meta } = useForm({
  validationSchema,
  initialValues: {
    country: "",
    city: "",
    postal: "",
    street: "",
    building: "",
    flat: null,
  },
});

const { value: country, errorMessage: countryError } =
  useField<string>("country");
const { value: city, errorMessage: cityError } = useField<string>("city");
const { value: postal, errorMessage: postalError } = useField<string>("postal");
const { value: street, errorMessage: streetError } = useField<string>("street");
const { value: building, errorMessage: buildingError } =
  useField<string>("building");
const { value: flat, errorMessage: flatError } = useField<string | null>(
  "flat"
);

const error = computed(() => {
  return (
    countryError.value ||
    cityError.value ||
    postalError.value ||
    streetError.value ||
    buildingError.value ||
    flatError.value ||
    ""
  );
});

const handleSubmitAddress = async () => {
  const addressData = {
    id: 0,
    country: country.value,
    city: city.value,
    postal_code: postal.value,
    street: street.value,
    building_num: building.value,
    flat_num: flat.value || null,
    is_displayed: true,
  };

  if (userStore.isLoggedIn) {
    const newAddress = await createAddress(addressData);
    if (newAddress) {
      emit("close");
      emit("refresh", newAddress);
    }
  } else {
    const guestAddress = addressStore.setAddress(addressData);
    if (guestAddress) {
      emit("close");
    }
  }
};

const onSubmit = handleSubmit(handleSubmitAddress);
</script>

<template>
  <form
    @submit.prevent="onSubmit"
    class="fixed w-full min-w-[14rem] max-w-[90%] sm:max-w-[24rem] xl:max-w-[28rem] min-h-[32rem] p-4 gap-4 sm:gap-8 flex flex-col bg-white border-2 border-[#ccc] rounded-lg overflow-y-auto"
  >
    <div class="w-full flex items-center justify-between">
      <h2 class="text-xl font-semibold">New address</h2>
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
      <p class="text-sm text-secondary">Country</p>
      <div
        class="w-full sm:w-[14rem] xl:w-[16rem] h-[2.5rem] bg-[#eee] rounded-md"
      >
        <select v-model="country" class="w-full h-full text-lg px-2 rounded-md">
          <option v-for="country in countries" :key="country" :value="country">
            {{ country }}
          </option>
        </select>
      </div>
    </div>

    <div
      class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between sm:px-4 gap-1 sm:gap-0"
    >
      <p class="text-sm text-secondary">City</p>
      <input
        v-model="city"
        type="text"
        class="w-full sm:w-[14rem] xl:w-[16rem] h-[2.5rem] bg-[#eee] text-lg px-2 rounded-md"
      />
    </div>
    <div
      class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between sm:px-4 gap-1 sm:gap-0"
    >
      <p class="text-sm text-secondary">Postal code</p>
      <input
        v-model="postal"
        type="text"
        class="w-full sm:w-[14rem] xl:w-[16rem] h-[2.5rem] bg-[#eee] text-lg px-2 rounded-md"
      />
    </div>
    <div
      class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between sm:px-4 gap-1 sm:gap-0"
    >
      <p class="text-sm text-secondary">Street name</p>
      <input
        v-model="street"
        type="text"
        class="w-full sm:w-[14rem] xl:w-[16rem] h-[2.5rem] bg-[#eee] text-lg px-2 rounded-md"
      />
    </div>
    <div
      class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between sm:px-4 gap-1 sm:gap-0"
    >
      <p class="text-sm text-secondary">Building / Apt.</p>
      <div class="w-full sm:w-[14rem] xl:w-[16rem] flex justify-between">
        <input
          v-model="building"
          type="text"
          class="w-[45%] sm:w-[6.5rem] xl:w-[7.5rem] h-[2.5rem] bg-[#eee] text-lg px-2 rounded-md"
        />
        <input
          v-model="flat"
          type="text"
          class="w-[45%] sm:w-[6.5rem] xl:w-[7.5rem] h-[2.5rem] bg-[#eee] text-lg px-2 rounded-md"
        />
      </div>
    </div>
    <button
      v-if="!loading"
      class="w-[80%] max-w-[12rem] h-[2.5rem] bg-[#445388] text-light rounded-md self-center mt-auto hover:cursor-pointer hover:bg-[#212842] transition-color ease-in-out duration-200"
    >
      Confirm
    </button>

    <button
      v-if="loading && meta.valid"
      class="w-[80%] max-w-[12rem] h-[2.5rem] bg-[#445388] text-light rounded-md self-center mt-auto"
    >
      <i class="pi pi-spin pi-spinner"></i>
    </button>
  </form>
</template>
