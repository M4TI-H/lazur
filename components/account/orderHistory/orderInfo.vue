<script setup lang="ts">
import { useFetchOrderImages } from "~/composables/orders/useFetchOrderImages";
import { useFetchOneAddress } from "~/composables/users/addresses/useFetchAddress";
import type Order from "~/types/Order";

const { order } = defineProps<{
  order: Order & { item_count: number };
}>();

const { address, fetchAddress, addressLoading } = useFetchOneAddress();
const { orderImages, imagesLoading, fetchImages } = useFetchOrderImages();

onMounted(async () => {
  await fetchAddress(order.address);
  await fetchImages(order.id);
});
</script>
<template>
  <OrderSkeleton v-if="addressLoading" />
  <div
    v-else
    class="w-full min-w-[16rem] h-[13rem] sm:h-[15rem] flex flex-col border-2 border-gray-300 rounded-lg"
  >
    <div
      class="w-full flex items-center justify-between bg-sky-800 p-4 rounded-t-lg"
    >
      <h2 class="text-lg md:text-2xl font-semibold text-gray-200">
        Order #{{ order.id }}
      </h2>
      <p class="text-gray-200 text-sm font-semibold">
        {{ useFormatDate(order.created_at) }}
      </p>
    </div>

    <div
      class="w-full h-full flex flex-col-reverse md:flex-row md:justify-between p-4"
    >
      <div
        v-if="!imagesLoading"
        class="max-w-full md:max-w-[32rem] lg:max-w-[40rem] h-[3rem] sm:h-[5rem] md:h-[9rem] flex mt-1"
      >
        <img
          v-if="orderImages"
          v-for="(image, id) in orderImages"
          :key="id"
          :src="image.url"
          class="h-full max-w-[3rem] md:max-w-[8rem]"
        />
      </div>
      <div
        v-else
        class="w-[40rem] h-[3rem] sm:h-[5rem] md:h-[9rem] flex items-center justify-center mt-1"
      >
        <i class="pi pi-spinner pi-spin"></i>
      </div>
      <div class="w-full md:w-[30%] flex flex-row md:flex-col justify-between">
        <div
          v-if="address"
          class="max-w-[50%] md:max-w-none flex flex-col items-start md:items-end"
        >
          <p class="text-sm text-gray-500">
            {{ address.street }} {{ address.building_num
            }}{{ address.flat_num ? `/${address.flat_num}` : "" }}
          </p>
          <p class="text-sm text-gray-500">
            {{ address.city }}, {{ address.postal_code }}
          </p>
          <p class="text-sm text-gray-500">{{ address.country }}</p>
        </div>
        <div
          class="max-w-[50%] md:max-w-none flex flex-col justify-between md:justify-end items-end gap-2 md:mt-4"
        >
          <p class="md:text-lg md:font-semibold">
            {{
              order.item_count === 1
                ? `${order.item_count} item`
                : `${order.item_count} items`
            }}
          </p>
          <p class="md:text-lg md:font-semibold">
            Total: ${{ order.total.toFixed(2) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
