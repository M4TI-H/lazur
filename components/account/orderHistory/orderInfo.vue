<script setup lang="ts">
import { useFetchOneAddress } from "~/composables/users/addresses/useFetchAddress";
import type Order from "~/types/Order";

const { order } = defineProps<{
  order: Order & { item_count: number };
}>();

const { address, fetchAddress, addressLoading } = useFetchOneAddress();

onMounted(async () => {
  await fetchAddress(order.address);
});
</script>
<template>
  <OrderSkeleton v-if="addressLoading" />
  <div
    v-else
    class="w-full min-w-[16rem] h-[20rem] md:h-[15rem] flex flex-col border-2 border-[#ccc] rounded-lg"
  >
    <div
      class="w-full flex items-center justify-between bg-[#445388] p-4 rounded-t-lg"
    >
      <h2 class="text-light text-lg md:text-2xl font-semibold">
        Order #{{ order.id }}
      </h2>
      <p class="text-light text-sm font-semibold">
        {{ useFormatDate(order.created_at) }}
      </p>
    </div>

    <div class="w-full h-full flex flex-col-reverse md:flex-row p-4">
      <div
        class="w-full md:w-[70%] h-[8rem] md:h-[9rem] flex flex-col items-start gap-2 bg-[#ccc] self-end mt-1"
      ></div>
      <div class="w-full md:w-[30%] flex flex-row md:flex-col justify-between">
        <div v-if="address" class="flex flex-col items-start md:items-end">
          <p class="text-sm text-secondary">
            {{ address.street }} {{ address.building_num
            }}{{ address.flat_num ? `/${address.flat_num}` : "" }}
          </p>
          <p class="text-sm text-secondary">
            {{ address.city }}, {{ address.postal_code }}
          </p>
          <p class="text-sm text-secondary">{{ address.country }}</p>
        </div>
        <div
          class="w-full flex flex-col justify-between md:justify-end items-end gap-2 md:mt-4"
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
