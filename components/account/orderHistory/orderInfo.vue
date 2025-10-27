<script setup lang="ts">
import type Order from "~/types/Order";

const { order } = defineProps<{
  order: Order & { item_count: number };
}>();
</script>
<template>
  <div
    class="w-full min-w-[16rem] h-[14rem] flex flex-col py-2 px-4 border-2 border-[#ccc] rounded-lg"
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
    <div class="w-full flex flex-col-reverse md:flex-row mt-auto">
      <div
        class="w-full md:w-[70%] h-[8rem] flex flex-col items-start gap-2 bg-[#ccc]"
      ></div>
      <div
        class="w-full md:w-[30%] flex items-center justify-between md:justify-end md:flex-col md:items-end gap-2 mt-4"
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
</template>
