<script setup lang="ts">
const { scrollY } = useScroll();

const userStore = useUserStore();
userStore.loadFromStorage();

const showAddressForm = ref<boolean>(false);

onMounted(() => {
  if (!userStore.isLoggedIn) {
    navigateTo("/account/login");
  }
});

watch(
  () => userStore.isLoggedIn,
  (loggedIn) => {
    if (!loggedIn) {
      navigateTo("/account/login");
    }
  }
);
</script>

<template>
  <NavMenu :scrollY="scrollY" />
  <main
    class="w-full min-h-screen flex flex-col items-center bg-[#F8F9FA] overflow-y-auto overflow-x-hidden"
  >
    <section class="relative w-full h-[16rem] flex flex-col items-center">
      <img
        class="w-full h-full object-cover z-10"
        src="https://images.unsplash.com/photo-1736248434061-2f5edd04a423?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880"
      />
      <div
        class="absolute z-30 w-full h-full bg-[#1F1D20]/70 flex flex-col items-center justify-center py-16 gap-2 lg:gap-4"
      >
        <h1
          class="text-2xl sm:text-3xl lg:text-4xl text-center text-light font-bold whitespace-nowrap"
        >
          Account
        </h1>
      </div>
    </section>
    <section class="w-full flex flex-col px-4 py-2 gap-4">
      <div class="w-full flex flex-col gap-2">
        <div class="flex gap-2">
          <h3 class="text-xl lg:text-2xl font-semibold">Your data</h3>
          <button
            class="flex items-center justify-center gap-2 p-1 rounded-lg text-[#888] font-semibold border-2 border-[#ccc] hover:bg-[#ccc]/50 hover:cursor-pointer transition-colors duration-150"
          >
            <i class="pi pi-pencil text-lg"></i>
            Modify
          </button>
        </div>
        <UserData />
      </div>
      <div class="flex items-center gap-4">
        <p class="text-secondary">Subscribe to the newsletter</p>
        <input type="checkbox" class="size-[1rem]" />
      </div>
      <div class="w-full flex flex-col gap-2">
        <div class="flex gap-2">
          <h3 class="text-xl lg:text-2xl font-semibold">Address book</h3>
          <button
            @click="showAddressForm = true"
            class="flex items-center justify-center gap-2 p-1 rounded-lg text-[#888] font-semibold border-2 border-[#ccc] hover:bg-[#ccc]/50 hover:cursor-pointer transition-colors duration-150"
          >
            <i class="pi pi-file-plus text-lg"></i>
            Add new
          </button>
        </div>
        <AddressBook />
      </div>
    </section>
    <div
      v-if="showAddressForm"
      class="absolute z-30 w-full h-full bg-[#1F1D20]/70 flex flex-col items-center justify-center py-16 gap-2 lg:gap-4"
    >
      <div class="absolute inset-0" @click="showAddressForm = false"></div>
      <AddressForm />
    </div>
  </main>
  <Footer />
</template>
