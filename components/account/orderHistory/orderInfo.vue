<script setup lang="ts">
import { useFetchOneAddress } from "~/composables/users/addresses/useFetchAddress";
import type Order from "~/types/Order";

const { order } = defineProps<{
  order: Order & { item_count: number };
}>();

const { address, addressLoading, addressRefresh } = useFetchOneAddress(
  order.address_id
);

onMounted(async () => {
  await addressRefresh();
});
</script>
<template>
  <div
    class="w-full min-w-[16rem] h-[18rem] md:h-[13rem] flex flex-col p-4 border-2 border-[#ccc] rounded-lg"
  >
    <div class="w-full flex items-center justify-between">
      <button
        class="text-lg md:text-2xl font-semibold hover:cursor-pointer hover:underline"
      >
        Order #{{ order.id }}
      </button>
      <p class="text-secondary text-sm font-semibold">
        {{ useFormatDate(order.created_at) }}
      </p>
    </div>

    <div class="w-full flex flex-col-reverse md:flex-row">
      <div
        class="w-full md:w-[70%] h-[8rem] flex flex-col items-start gap-2 bg-[#ccc] self-end"
      ></div>
      <div class="md:w-[30%]">
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
          class="w-full flex items-center justify-between md:justify-end md:flex-col md:items-end gap-2 mt-4"
        >
          <p class="text-lg font-semibold">
            {{
              order.item_count === 1
                ? `${order.item_count} item`
                : `${order.item_count} items`
            }}
          </p>
          <p class="text-lg font-semibold">
            Total: ${{ order.total.toFixed(2) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
