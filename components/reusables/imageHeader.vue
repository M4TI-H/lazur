<script setup lang="ts">
const props = defineProps<{
  image: string;
  title: string;
}>();
</script>

<template>
  <section class="w-full h-[40vh] relative flex flex-col items-center">
    <img class="w-full h-full object-cover z-10" :src="props.image" />
    <div
      class="absolute bg-stone-800/70 w-full h-full z-20 flex items-center justify-center"
    >
      <h1
        class="text-xl md:text-3xl max-w-2/3 md:max-w-[24rem] text-center text-slate-200 font-bold"
      >
        {{ props.title }}
      </h1>
    </div>
  </section>
</template>
