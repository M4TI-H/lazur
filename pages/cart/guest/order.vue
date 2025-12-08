<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useFetchDelivery } from "~/composables/orders/useFetchDelivery";
import { useCreateGuestOrder } from "~/composables/orders/guest/useCreateGuestOrder";

const { deliveries, deliveryLoading, deliveryRefresh } = useFetchDelivery();

const { createGuestOrder, loading } = useCreateGuestOrder();

const showError = ref<boolean>(false);
const displayAddressForm = ref<boolean>(false);

const cartStore = useCartStore();
cartStore.loadFromStorage();

const addressStore = useAddressStore();
addressStore.loadFromStorage();

const validationSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, "Your name is required."),
    phone: z.string().min(1, "Phone number is required."),
    email: z.email("Wrong email format.").min(1, "Email is required."),
    delivery: z.number().min(1, "Delivery type is required."),
  })
);

const { handleSubmit, meta, setValues } = useForm({
  validationSchema,
  initialValues: {
    name: "",
    phone: "",
    email: "",
    delivery: 0,
  },
});
const { value: name, errorMessage: nameError } = useField<string>("name");
const { value: phone, errorMessage: phoneError } = useField<string>("phone");
const { value: email, errorMessage: emailError } = useField<string>("email");
const { value: delivery, errorMessage: deliveryError } =
  useField<number>("delivery");

const error = computed(() => {
  return (
    nameError.value ||
    phoneError.value ||
    emailError.value ||
    deliveryError.value ||
    ""
  );
});

const handleSubmitOrder = async () => {
  if (!addressStore.address) {
    console.error("No address provided.");
    return;
  }

  const orderData = {
    id: 0,
    created_at: "",
    email: email.value,
    phone: phone.value,
    total: cartStore.cart.total,
    user_id: 0,
    address: 0,
    delivery_id: delivery.value,
    name: name.value,
    order_address: addressStore.address,
  };

  const result = await createGuestOrder(orderData, cartStore.cart.items);

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
});
</script>

<template>
  <main
    class="w-full min-h-screen flex flex-col items-center justify-center bg-[#F8F9FA]"
  >
    <section class="absolute z-10 w-full h-full">
      <img
        class="w-full h-full object-cover"
        src="https://static.vecteezy.com/system/resources/thumbnails/039/653/479/small_2x/ai-generated-stylish-blue-shopping-bags-against-a-matching-blue-background-conveying-a-modern-aesthetic-ai-generated-photo.jpg"
      />
      <div class="absolute inset-0 bg-[#1F1D20]/70"></div>
    </section>

    <form
      v-if="!displayAddressForm"
      @submit="onSubmit"
      class="fixed w-full sm:max-w-[24rem] xl:max-w-[28rem] h-full sm:h-auto sm:min-h-[38rem] sm:max-h-[44rem] p-4 gap-4 sm:gap-8 flex flex-col bg-white sm:border-2 border-[#ccc] sm:rounded-lg overflow-y-auto z-10"
    >
      <div class="w-full flex items-center justify-between">
        <h2 class="text-xl font-semibold">Shipping details</h2>
        <NuxtLink
          to="/cart"
          class="text-sm text-secondary hover:cursor-pointer hover:underline"
        >
          Cancel
        </NuxtLink>
      </div>
      <div
        v-if="showError && error"
        class="bg-[#f8d8d8] border-1 border-[#b14e4e] rounded-md p-2"
      >
        <p class="!text-[#b14e4e] text-sm">{{ error }}</p>
      </div>

      <GuestOrderField v-model="name" label="Name" />
      <GuestOrderField v-model="phone" label="Phone number" />
      <GuestOrderField v-model="email" label="Email address" />

      <div class="w-full border-t-1 border-[#ccc]"></div>

      <div
        class="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between sm:px-4 gap-1 sm:gap-0"
      >
        <p class="text-sm text-secondary">Delivery type</p>
        <select
          v-model="delivery"
          class="w-full sm:w-[12rem] xl:w-[14rem] h-[2rem] bg-[#eee] px-2 rounded-md"
        >
          <option v-for="type in deliveries" :key="type.id" :value="type.id">
            {{ type.name }} | {{ type.cost == 0 ? "Free" : `$${type.cost}` }}
          </option>
        </select>
      </div>

      <div
        class="w-full flex flex-col sm:flex-row items-start justify-between sm:px-4 gap-1 sm:gap-0"
      >
        <p class="text-sm text-secondary">Delivery address</p>
        <button
          v-if="!addressStore.address"
          @click="displayAddressForm = true"
          type="button"
          class="text-sm font-semibold hover:cursor-pointer hover:underline"
        >
          Add address
        </button>
        <div v-if="addressStore.address" class="flex flex-col items-end">
          <p class="text-sm font-semibold">
            {{ addressStore.address.street }}
            {{ addressStore.address.building_num
            }}{{
              addressStore.address.flat_num
                ? `/${addressStore.address.flat_num}`
                : ""
            }}
          </p>
          <p class="text-sm font-semibold">
            {{ addressStore.address.city }},
            {{ addressStore.address.postal_code }}
          </p>
          <p class="text-sm font-semibold">
            {{ addressStore.address.country }}
          </p>
          <button
            type="button"
            @click="addressStore.clearStorage()"
            class="text-sm text-secondary hover:cursor-pointer hover:underline"
          >
            Remove
          </button>
        </div>
      </div>

      <div class="w-full border-t-1 border-[#ccc]"></div>

      <span class="w-full flex justify-between items-center px-2">
        <p class="text-secondary md:text-lg font-semibold">Total</p>
        <p class="font-semibold md:text-lg">
          ${{ cartStore.cart.total.toFixed(2) }}
        </p>
      </span>

      <SubmitButton :loading="loading" :valid="meta.valid" />
    </form>
    <div
      v-if="displayAddressForm"
      class="fixed z-30 w-full min-h-full flex flex-col items-center justify-center"
    >
      <AddressForm @close="displayAddressForm = false" />
    </div>
  </main>
</template>
