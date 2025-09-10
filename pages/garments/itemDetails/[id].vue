<script setup lang="ts">
const route = useRoute();
const itemid = route.params.id;
const item = ref<any>(null);

const allItems = [
  {
    id: 0,
    name: "Cotton Shirt",
    price: "79.99",
    category: "Shirt",
    cover:
      "https://png.pngtree.com/png-vector/20240202/ourmid/pngtree-blue-shirt-mockup-cutout-png-file-png-image_11588762.png",
    review: "4",
  },
  {
    id: 1,
    name: "Striped Shirt",
    price: "129.49",
    category: "Shirt",
    cover:
      "https://cdn.shopify.com/s/files/1/2304/9839/files/RW658_DSG_001.png?v=1753091626",
    review: "5",
  },
  {
    id: 2,
    name: "Flaming Shirt",
    price: "99.99",
    category: "Shirt",
    cover:
      "https://cdn11.bigcommerce.com/s-vhimnvf2fd/images/stencil/2000x2000/products/531/2024/425CL-Mens-Button-Down-Printed-Camp-Shirts---Hot-Rod__17274__27168.1717682589.png?c=1",
    review: "3",
  },
];

onMounted(() => {
  item.value = allItems.find((i) => i.id.toString() === itemid);
});

onMounted(async () => {
  //await fetchSingleItem(index);
});
</script>

<template>
  <main
    class="w-screen min-h-screen flex flex-col items-center bg-[#F8F9FA] overflow-y-auto"
  >
    <div v-if="item">
      <h1>{{ item.name }}</h1>
      <p>Price: ${{ item.price }}</p>
      <p>Category: {{ item.category }}</p>
    </div>
    <div v-else>
      <p>Item not found</p>
    </div>
  </main>
</template>
