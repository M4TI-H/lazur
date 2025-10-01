<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useFetchDelivery } from "~/composables/orders/useFetchDelivery";
import { useCreateOrder } from "~/composables/orders/useCreateOrder";

const { scrollY } = useScroll();

const { deliveries, delivery_loading, delivery_refresh } = useFetchDelivery();
const { createOrder, loading } = useCreateOrder();

const orderStore = useOrderStore();
orderStore.loadFromStorage();
const cartStore = useCartStore();
cartStore.loadFromStorage();

const validationSchema = toTypedSchema(
  z.object({
    address: z.string().min(1, "Address is required."),
    delivery: z.number(),
  })
);

const { handleSubmit, meta } = useForm({
  validationSchema,
  initialValues: {
    address: "",
    delivery: 1,
  },
});

const { value: delivery, errorMessage: deliveryError } =
  useField<number>("delivery");

const { value: address, errorMessage: addressError } =
  useField<string>("address");

const handleSubmitOrder = async () => {
  const totalOrderData = {
    ...orderStore.orderData,
    total: Number(totalCost.value),
    id: 0,
    address: address.value,
    delivery: delivery.value,
    created_at: "",
  };

  const result = await createOrder(totalOrderData, cartStore.cart.items);
  if (result && result != "error") {
    orderStore.setOrderData({ id: result });
    navigateTo("/cart/confirmation");
  }
};

const onSubmit = handleSubmit(handleSubmitOrder);

const deliveryCost = computed(() => {
  if (!deliveries.value || deliveries.value.length === 0) {
    return 0;
  }

  const selectedDelivery =
    deliveries.value!.find((d) => d.id === delivery.value) || null;
  return selectedDelivery?.cost ?? 0;
});

const totalCost = computed(() => {
  return deliveryCost.value + Number(cartStore.totalPrice);
});

onMounted(() => {
  delivery_refresh();
});
</script>

<template>
  <NavMenu :scrollY="scrollY" />
  <main
    class="w-full min-h-screen flex flex-col items-center justify-center bg-[#F8F9FA] overflow-hidden"
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
      class="lg:w-[30vw] max-w-[90vw] max-h-[40rem] h-min flex flex-col bg-[#ddd] px-4 lg:px-8 py-4 gap-4 rounded-md z-10"
    >
      <h2 class="text-2xl font-semibold">Shipping</h2>

      <div class="w-full">
        <p class="text-sm text-secondary">Name & Surname</p>
        <p class="text-lg">
          {{ orderStore.orderData.name }} {{ orderStore.orderData.surname }}
        </p>
      </div>
      <div class="w-full">
        <p class="text-sm text-secondary">Email</p>
        <p class="text-lg">{{ orderStore.orderData.email }}</p>
      </div>
      <div class="w-full">
        <p class="text-sm text-secondary">Phone number</p>
        <p class="text-lg">{{ orderStore.orderData.phone }}</p>
      </div>

      <div class="w-full self-center h-[2px] bg-[#444] my-2"></div>

      <div class="flex flex-col gap-1">
        <select
          v-model="delivery"
          class="w-full h-[2.5rem] bg-white text-lg px-2 rounded-md"
        >
          <option v-for="type in deliveries" :key="type.id" :value="type.id">
            {{ type.name }} | {{ type.cost == 0 ? "Free" : `$${type.cost}` }}
          </option>
        </select>
      </div>

      <div class="w-full">
        <input
          type="text"
          v-model="address"
          placeholder="Shipping address"
          class="w-full h-[2.5rem] bg-white text-lg px-2 rounded-md"
        />
        <p v-if="addressError" class="h-[1rem] text-sm !text-red-500 pl-1 mt-1">
          {{ addressError }}
        </p>
      </div>

      <div class="w-full self-center h-[2px] bg-[#444] mt-2"></div>
      <span class="w-full flex justify-between items-center px-2">
        <p>Subtotal</p>
        <p>${{ cartStore.totalPrice }}</p>
      </span>
      <span class="w-full flex justify-between items-center px-2">
        <p>Shipping</p>
        <p>
          {{ deliveryCost === 0 ? "Free" : `$${deliveryCost}` }}
        </p>
      </span>
      <span class="w-full flex justify-between items-center px-2">
        <p class="text-2xl font-semibold">Total</p>
        <p class="text-2xl font-semibold">${{ totalCost.toFixed(2) }}</p>
      </span>

      <button
        v-if="!loading && meta.valid"
        class="w-[80%] max-w-[24rem] h-[2.5rem] bg-[#444] text-light rounded-md self-center mt-auto hover:cursor-pointer hover:bg-[#222] transition-color ease-in-out duration-200"
      >
        Place order
      </button>
      <button
        v-if="!loading && !meta.valid"
        class="w-[80%] max-w-[24rem] h-[2.5rem] bg-[#666] text-light rounded-md self-center mt-auto"
      >
        Place order
      </button>
      <button
        v-if="loading && meta.valid"
        class="w-[80%] max-w-[24rem] h-[2.5rem] bg-[#444] text-light rounded-md self-center mt-auto"
      >
        <i class="pi pi-spin pi-spinner"></i>
      </button>
    </form>
  </main>
</template>
