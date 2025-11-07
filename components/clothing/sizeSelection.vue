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
  <section
    class="w-full flex flex-col items-center md:items-start gap-2 md:px-2"
  >
    <div
      class="w-full max-w-[16rem] flex items-center justify-around md:justify-start md:gap-1 lg:gap-2"
    >
      <button
        v-for="(size, id) in sizes ?? []"
        :key="id"
        @click="selectSize(size)"
        class="min-w-[2.5rem] h-[2.5rem] p-1 rounded-lg border-1 border-[#6a6272] hover:cursor-pointer"
        :class="[
          props.modelValue !== null && props.modelValue === size
            ? ['bg-[#445388]', 'text-light']
            : ['bg-none', 'hover:bg-[#eee]'],
        ]"
      >
        {{ size }}
      </button>
    </div>

    <button
      @click="emit('addToCart')"
      class="w-full max-w-[18rem] md:w-[10rem] h-[2.5rem] bg-[#445388] rounded-lg flex items-center justify-center text-light hover:bg-[#212842] active:bg-[#212842] hover:cursor-pointer"
    >
      Add to cart
    </button>
  </section>
</template>
