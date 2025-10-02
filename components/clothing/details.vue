<script setup lang="ts">
import type Garment from '~/types/Garment';


const { garment } = defineProps<{
    garment: Garment
}>();

const selectedOption = ref<string>("description");
const options = ["description", "category", "fabrics"];

</script>

<template>
<div
    class="w-full self-center flex flex-col z-20 gap-3 mb-4"
>
    <div class="w-full flex items-center gap-2">
        <button v-for="(option, id) in options" :key="id" @click="selectedOption = option"
            class="h-6 pr-2 text-sm text-secondary hover:cursor-pointer"
            :class="[option === selectedOption ? ['border-b-1', 'border-[#6a6272]'] : 'border-none']">
            {{ option.charAt(0).toUpperCase() + option.slice(1) }}
        </button>
    </div>

    <p v-if="selectedOption === 'description'">{{ garment.description }}</p>
    <p v-if="selectedOption === 'category'">{{ garment.category.charAt(0).toUpperCase() + garment.category.slice(1) }}</p>
    <p v-if="selectedOption === 'fabrics'">{{ garment.fabrics }}</p>

</div>
</template>