<script setup lang="ts">
const { scrollY } = useScroll();

const sliderContent = [
  {
    id: 0,
    header: "Redefining Urban Elegance",
    desc: "Lazur was founded with a single purpose — to create clothing that merges urban confidence with refined minimalism. We believe true style isn't about excess it's about balance, precision, and authenticity. Each piece we design reflects the rhythm of the city — bold yet understated, modern yet timeless.",
    image:
      "https://images.unsplash.com/photo-1760564704843-07b22892b0bf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
  },
  {
    id: 1,
    header: "Craftsmanship Meets Modern Design",
    desc: "Every Lazur garment begins with meticulous attention to detail. From carefully selected fabrics to clean silhouettes, we focus on quality that speaks for itself. Our designers collaborate with experienced artisans to ensure every seam, button, and texture contributes to a seamless whole. We don't just make clothes — we build experiences through design.",
    image:
      "https://images.unsplash.com/photo-1580981433573-c5804ced20ad?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
  },
  {
    id: 2,
    header: "Sustainability in Simplicity",
    desc: "We are committed to responsible production and thoughtful consumption. By creating versatile essentials built to last, we minimize waste and encourage mindful choices. Fewer pieces, better made — that's the Lazur way. Our minimalist philosophy extends beyond aesthetics — it's a statement about living consciously in a fast-paced world.",
    image:
      "https://images.unsplash.com/photo-1617117501418-93383b0fcb29?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=831",
  },
  {
    id: 3,
    header: "A Vision for Every Individual",
    desc: "At Lazur, we design for people who move with purpose. Our collections are intentionally neutral, allowing every individual to define their own expression through simplicity. Whether you're walking through the city, working, or unwinding — our pieces adapt effortlessly to your life and movement.It's not fashion that defines you; it's how you wear it.",
    image:
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
  },
  {
    id: 4,
    header: "Lazur Today",
    desc: "What began as a small studio project has evolved into a growing community of modern creators and thinkers. We continue to challenge the boundaries of urban fashion by exploring new materials, innovative cuts, and timeless proportions. With every collection, we aim to elevate essentials into statements of quiet confidence.",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
];

const idCounter = ref<number>(0);
const showDesc = ref<boolean>(false);

const prevID = () => {
  if (idCounter.value > 0) {
    idCounter.value = (idCounter.value -= 1) % sliderContent.length;
  }
};
const nextID = () => {
  if (idCounter.value < sliderContent.length - 1) {
    idCounter.value = (idCounter.value += 1) % sliderContent.length;
  }
};
</script>

<template>
  <NavMenu :scrollY="scrollY" />
  <main
    class="w-full min-h-screen flex flex-col items-center bg-[#F8F9FA] overflow-y-auto overflow-x-hidden"
  >
    <section class="w-full h-[24rem] md:h-[32rem] bg-[red]"></section>
    <section class="w-full h-[12rem] md:h-[16rem] bg-[blue]"></section>
    <section
      class="relative w-full md:max-w-[56rem] h-[24rem] sm:h-[32rem] md:h-[36rem] flex flex-col md:flex-row items-center justify-center md:justify-end md:px-8"
    >
      <div class="w-full md:w-[42rem] h-full md:h-[32rem]">
        <img
          :src="sliderContent[idCounter].image"
          class="w-full h-full object-cover md:rounded-lg"
        />
      </div>

      <div
        class="hidden md:flex flex-col absolute size-[24rem] left-0 md:ml-8 bg-neutral-900 rounded-lg p-4 gap-4"
      >
        <h2 class="text-light md:text-xl font-semibold">
          {{ sliderContent[idCounter].header }}
        </h2>
        <p class="text-light">{{ sliderContent[idCounter].desc }}</p>
        <div class="absolute flex items-center bottom-4 gap-4">
          <button
            @click="prevID"
            class="bg-[#445388] size-[2.5rem] rounded-full"
            :class="[
              idCounter > 0
                ? ['bg-[#445388]', 'hover:cursor-pointer']
                : 'bg-[#445388]/50',
            ]"
          >
            <i class="pi pi-chevron-left"></i>
          </button>
          <button
            @click="nextID"
            class="bg-[#445388] size-[2.5rem] rounded-full"
            :class="[
              idCounter < sliderContent.length - 1
                ? ['bg-[#445388]', 'hover:cursor-pointer']
                : 'bg-[#445388]/50',
            ]"
          >
            <i class="pi pi-chevron-right"></i>
          </button>
        </div>
        <p class="absolute bottom-4 right-4 text-secondary text-sm">
          {{ sliderContent[idCounter].id + 1 }} / {{ sliderContent.length }}
        </p>
      </div>

      <div
        class="flex md:hidden absolute bottom-0 w-full h-full flex-col justify-end bg-gradient-to-b from-transparent to-neutral-900"
      >
        <div
          @click="showDesc = !showDesc"
          class="flex items-center justify-between w-full h-[2rem] px-2 hover:bg-black/30 hover:cursor-pointer"
        >
          <h2 class="text-light font-semibold">
            {{ sliderContent[0].header }}
          </h2>
          <button v-if="!showDesc">
            <i class="pi pi-chevron-right text-light text-xs"></i>
          </button>
          <button v-if="showDesc" class="size-[1.5rem] rounded-full">
            <i class="pi pi-chevron-down text-light text-xs"></i>
          </button>
        </div>
        <Transition
          v-if="showDesc"
          enter-active-class="transition-all duration-300 ease-out"
          leave-active-class="transition-all duration-200 ease-in"
          enter-from-class="translate-y-full opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-from-class="translate-y-0 opacity-100"
          leave-to-class="translate-y-full opacity-0"
        >
          <p v-if="showDesc" class="text-light text-sm px-2 pb-2">
            {{ sliderContent[0].desc }}
          </p>
        </Transition>
      </div>
    </section>
    <section class="w-full h-[16rem]"></section>
  </main>
  <Footer />
</template>
