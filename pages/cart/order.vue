<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useFetchDelivery } from "~/composables/orders/useFetchDelivery";
import { useCreateOrder } from "~/composables/orders/useCreateOrder";
import { useFetchPersonalData } from "~/composables/users/personalData/useFetchPersonalData";
import { useFetchUserAddresses } from "~/composables/users/addresses/useFetchAddresses";

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
userStore.loadFromStorage();

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
  const orderData = {
    id: 0,
    created_at: "",
    email: email.value,
    phone: phone.value,
    total: cartStore.cart.total,
    user_id: 0,
    address_id: address.value,
    delivery_id: delivery.value,
    name: name.value,
  };

  const order_id = await createOrder(orderData, cartStore.cart.items);

  if (order_id) {
    navigateTo(`/cart/confirmation/${order_id}?address_id=${address.value}`);
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

const deliveryCost = computed(() => {
  if (!deliveries.value || deliveries.value.length === 0) {
    return 0;
  }

  const selectedDelivery =
    deliveries.value!.find((d) => d.id === delivery.value) || null;
  return selectedDelivery?.cost ?? 0;
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
      @submit="onSubmit"
      class="fixed w-full sm:max-w-[24rem] xl:max-w-[28rem] h-full sm:h-auto sm:min-h-[36rem] sm:max-h-[44rem] p-4 gap-4 sm:gap-8 flex flex-col bg-white sm:border-2 border-[#ccc] sm:rounded-lg overflow-y-auto z-10"
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
      <EditableOrderField v-model="name" label="Name" />
      <EditableOrderField v-model="phone" label="Phone number" />
      <EditableOrderField v-model="email" label="Email address" />

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

      <AddressSelector
        v-model="address"
        :addresses="addresses ?? []"
        @addNew="displayAddressForm = true"
      />

      <div class="w-full border-t-1 border-[#ccc]"></div>

      <span class="w-full flex justify-between items-center px-2">
        <p class="text-secondary md:text-lg font-semibold">Total</p>
        <p class="font-semibold md:text-lg">
          ${{ (deliveryCost + Number(cartStore.totalPrice)).toFixed(2) }}
        </p>
      </span>

      <button
        v-if="!loading"
        class="w-[80%] max-w-[16rem] h-[2.5rem] bg-[#445388] text-light rounded-md self-center mt-auto hover:cursor-pointer hover:bg-[#212842] transition-color ease-in-out duration-200"
      >
        Confirm
      </button>

      <button
        v-if="loading && meta.valid"
        class="w-[80%] max-w-[16rem] h-[2.5rem] bg-[#445388] text-light rounded-md self-center mt-auto"
      >
        <i class="pi pi-spin pi-spinner"></i>
      </button>
    </form>
    <div
      v-if="displayAddressForm"
      class="fixed z-30 w-full min-h-full bg-[#1F1D20]/70 flex flex-col items-center justify-center py-16 gap-2 lg:gap-4"
    >
      <AddressForm
        @close="displayAddressForm = false"
        @refresh="newAddressAdded"
      />
    </div>
  </main>
</template>
