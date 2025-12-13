<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useFetchDelivery } from "~/composables/orders/useFetchDelivery";
import { useCreateOrder } from "~/composables/orders/useCreateOrder";
import { useFetchPersonalData } from "~/composables/users/personalData/useFetchPersonalData";
import { useFetchUserAddresses } from "~/composables/users/addresses/useFetchAddresses";
import type Order from "~/types/Order";

const { addresses, addressesLoading, addressesRefresh } =
  useFetchUserAddresses();
const { personalData, personalDataLoading, personalDataRefresh } =
  useFetchPersonalData();
const { deliveries, deliveryLoading, deliveryRefresh } = useFetchDelivery();

const { createOrder, loading } = useCreateOrder();

const showError = ref<boolean>(false);
const displayAddressForm = ref<boolean>(false);

const cartStore = useCartStore();
cartStore.loadFromStorage();
const userStore = useUserStore();

const validationSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, "Your name is required."),
    phone: z.string().min(1, "Phone number is required."),
    email: z.email("Wrong email format.").min(1, "Email is required."),
    address: z.number().min(1, "Address is required."),
    delivery: z.number().min(1, "Delivery type is required."),
  })
);

const { handleSubmit, meta, setValues } = useForm({
  validationSchema,
  initialValues: {
    name: "",
    phone: "",
    email: "",
    address: 0,
    delivery: 0,
  },
});
const { value: name, errorMessage: nameError } = useField<string>("name");
const { value: phone, errorMessage: phoneError } = useField<string>("phone");
const { value: email, errorMessage: emailError } = useField<string>("email");
const { value: delivery, errorMessage: deliveryError } =
  useField<number>("delivery");
const { value: address, errorMessage: addressError } =
  useField<number>("address");

watch(personalData, (data) => {
  if (data) {
    setValues({
      name: data.name ?? "",
      phone: data.phone ?? "",
      email: data.email ?? "",
      address: 0,
      delivery: 0,
    });
  }
});

const error = computed(() => {
  return (
    nameError.value ||
    phoneError.value ||
    emailError.value ||
    deliveryError.value ||
    addressError.value ||
    ""
  );
});

const handleSubmitOrder = async () => {
  const orderData: Order = {
    id: 0,
    created_at: "",
    email: email.value,
    phone: phone.value,
    total: Number(cartStore.cart.total.toFixed(2)),
    user_id: 0,
    address: address.value,
    delivery_id: delivery.value,
    name: name.value,
  };

  const result = await createOrder(orderData, cartStore.cart.items);

  if (!result) {
    console.error("Order failed");
    return;
  }

  if (result.order_id) {
    navigateTo(
      `/cart/confirmation/${result.order_id}?token=${result.order_token}`
    );
  }
};

const onSubmit = handleSubmit(
  async () => {
    showError.value = true;
    await handleSubmitOrder();
  },
  () => {
    showError.value = true;
  }
);

watch(delivery, (newValue) => {
  const selectedDelivery = deliveries.value?.find((d) => d.id === newValue);
  const cost = selectedDelivery?.cost ?? 0;
  cartStore.updateDelivery(cost);
  cartStore.updateTotal();
});

const newAddressAdded = async (id: number) => {
  await addressesRefresh();
  address.value = id;
};

watch(
  () => userStore.isLoggedIn,
  (loggedIn) => {
    if (!loggedIn) {
      navigateTo("/account/login");
    }
  },
  { immediate: true }
);

watch(
  () => cartStore.cart.items.length,
  (length) => {
    if (length < 1) {
      navigateTo("/cart");
    }
  },
  { immediate: true }
);

onMounted(async () => {
  await deliveryRefresh();
  await addressesRefresh();
});
</script>

<template>
  <main
    class="w-full min-h-screen flex flex-col items-center justify-center bg-white"
  >
    <section class="absolute z-10 w-full h-full">
      <img
        class="w-full h-full object-cover"
        src="https://static.vecteezy.com/system/resources/thumbnails/039/653/479/small_2x/ai-generated-stylish-blue-shopping-bags-against-a-matching-blue-background-conveying-a-modern-aesthetic-ai-generated-photo.jpg"
      />
      <div class="absolute inset-0 bg-black/60"></div>
    </section>

    <form
      v-if="!displayAddressForm"
      @submit="onSubmit"
      class="fixed w-full sm:max-w-[24rem] xl:max-w-[28rem] h-full sm:h-auto sm:min-h-[36rem] sm:max-h-[44rem] p-4 gap-4 sm:gap-8 flex flex-col bg-white sm:border-2 border-gray-300 sm:rounded-lg overflow-y-auto z-10"
    >
      <div class="w-full flex items-center justify-between">
        <h2 class="text-xl font-semibold">Shipping details</h2>
        <NuxtLink
          to="/cart"
          class="text-sm text-gray-500 cursor-pointer hover:underline"
        >
          Cancel
        </NuxtLink>
      </div>
      <ErrorMessage v-if="showError && error" :error="error" />
      <EditableOrderField v-model="name" label="Name" />
      <EditableOrderField v-model="phone" label="Phone number" />
      <EditableOrderField v-model="email" label="Email address" />

      <div class="w-full border-t-1 border-gray-300"></div>

      <div
        class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between sm:px-4 gap-1 sm:gap-0"
      >
        <p class="text-sm text-gray-500">Delivery type</p>
        <select
          v-model="delivery"
          class="w-full sm:w-[12rem] xl:w-[14rem] h-[2rem] bg-gray-200 border-1 border-gray-300 outline-0 px-2 rounded-md"
        >
          <option v-for="type in deliveries" :key="type.id" :value="type.id">
            {{ type.name }} | {{ type.cost == 0 ? "Free" : `$${type.cost}` }}
          </option>
        </select>
      </div>

      <AddressSelector
        v-model="address"
        :addresses="addresses ?? []"
        @addNew="displayAddressForm = true"
      />

      <div class="w-full border-t-1 border-gray-300"></div>

      <span class="w-full flex justify-between items-center px-2">
        <p class="text-gray-500 md:text-lg font-semibold">Total</p>
        <p class="font-semibold md:text-lg">
          ${{ cartStore.cart.total.toFixed(2) }}
        </p>
      </span>

      <SubmitButton :loading="loading" :valid="meta.valid" />
    </form>
    <div
      v-if="displayAddressForm"
      class="fixed z-30 w-full min-h-full bg-black/60 flex flex-col items-center justify-center py-16 gap-2 lg:gap-4"
    >
      <AddressForm
        @close="displayAddressForm = false"
        @refresh="newAddressAdded"
      />
    </div>
  </main>
</template>
