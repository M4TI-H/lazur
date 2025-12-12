<script setup lang="ts">
import { useFetchSizes } from "~/composables/garments/useFetchSizes";

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "addToCart"): void;
}>();

const props = defineProps<{
  modelValue: string;
  id: number;
}>();

const { sizes, loading, refresh } = useFetchSizes(props.id);

const selectSize = (value: string) => {
  if (value === props.modelValue) {
    emit("update:modelValue", "");
  } else {
    emit("update:modelValue", value);
  }
};

onMounted(async () => {
  if (props.id) {
    await refresh();
  }
});
</script>

<template>
  <section class="w-full flex flex-col sm:flex-row items-center gap-2 py-4">
    <div class="w-full flex items-center justify-center md:justify-start gap-2">
      <button
        v-for="(size, id) in sizes ?? []"
        :key="id"
        @click="selectSize(size)"
        class="min-w-[3rem] h-[3rem] p-1 rounded-md border border-gray-300 cursor-pointer text-lg"
        :class="[
          props.modelValue !== null && props.modelValue === size
            ? ['bg-gray-200', 'text-gray-500']
            : ['bg-none', 'hover:bg-gray-100', 'text-gray-500'],
        ]"
      >
        {{ size }}
      </button>
    </div>

    <button
      @click="emit('addToCart')"
      class="w-full h-[3rem] min-w-[18rem] max-w-[24rem] bg-sky-700 rounded-lg flex items-center justify-center gap-2 text-gray-200 hover:bg-sky-800 active:bg-sky-800 cursor-pointer"
    >
      <i class="pi pi-shopping-cart text-xl" />
      Add to cart
    </button>
  </section>
</template>
