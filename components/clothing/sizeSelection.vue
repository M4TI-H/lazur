<script setup lang="ts">
const sizes = ["XS", "S", "M", "L", "XL"];

const emit = defineEmits<{
    (e: "update:modelValue", value: string): void
}>();

const props = defineProps<{
  modelValue: string;
}>();

const selectSize = (value: string) => {
    if(value === props.modelValue) {
        emit("update:modelValue", "");
    }
    else {
        emit("update:modelValue", value);
    }
};

</script>

<template>
    <section class="w-full flex flex-col items-center md:items-start gap-2">
        <div class="w-full max-w-[16rem] flex items-center justify-around md:justify-start md:gap-1 lg:gap-2">
        <button v-for="(size, id) in sizes" :key="id" @click="selectSize(size)"
        class="size-[2.5rem] rounded-sm border-1 border-[#6a6272] hover:cursor-pointer "
        :class="[props.modelValue !== null && props.modelValue === size ? ['bg-[#445388]', 'text-light'] : ['bg-none', 'hover:bg-[#eee]'],
        ]">
            {{ size }}
        </button>
        </div>

        <button
        class="w-full max-w-[18rem] md:w-[10rem] h-[2.5rem] bg-[#445388] rounded-lg flex items-center justify-center text-light hover:bg-[#212842] active:bg-[#212842] hover:cursor-pointer"
        >
        Add to cart
        </button>
    </section>
</template>