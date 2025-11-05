<script setup lang="ts">
const { scrollY } = useScroll();
import { useFetchUserAddresses } from "~/composables/users/addresses/useFetchAddresses";
import { useFetchPersonalData } from "~/composables/users/personalData/useFetchPersonalData";

const userStore = useUserStore();
userStore.loadFromStorage();

const { addresses, addressesLoading, addressesRefresh } =
  useFetchUserAddresses();
const { personalData, personalDataLoading, personalDataRefresh } =
  useFetchPersonalData();

const showAddressForm = ref<boolean>(false);
const showDataForm = ref<boolean>(false);

const refreshAddresses = async () => await addressesRefresh();
const refreshPersonalData = async () => await personalDataRefresh();

onMounted(async () => {
  if (!userStore.isLoggedIn) {
    navigateTo("/account/login");
  }
  await refreshAddresses();
  await personalDataRefresh();
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
            @click="showDataForm = true"
            class="flex items-center justify-center gap-2 p-1 rounded-lg text-[#888] font-semibold border-2 border-[#ccc] hover:bg-[#ccc]/50 hover:cursor-pointer transition-colors duration-150"
          >
            <i class="pi pi-pencil text-lg"></i>
            Modify
          </button>
        </div>
        <UserData :personalData="personalData" />
      </div>

      <div v-if="addresses" class="w-full flex flex-col gap-2">
        <div class="flex items-end gap-4">
          <h3 class="text-xl lg:text-2xl font-semibold">Address book</h3>
          <p class="text-sm text-secondary font-semibold">
            ({{ addresses.length }} / 5 added)
          </p>
          <button
            v-if="addresses.length < 5"
            @click="showAddressForm = true"
            class="flex items-center justify-center gap-2 p-1 rounded-lg text-[#888] font-semibold border-2 border-[#ccc] hover:bg-[#ccc]/50 hover:cursor-pointer transition-colors duration-150"
          >
            <i class="pi pi-file-plus text-lg"></i>
            Add new
          </button>
        </div>
        <div class="w-full flex flex-wrap gap-4">
          <AddressCard
            v-for="address in addresses"
            :key="address.id"
            :addressData="address"
            @refresh="refreshAddresses"
          />
        </div>
      </div>
    </section>
    <div
      v-if="showAddressForm"
      class="fixed z-30 w-full min-h-full bg-[#1F1D20]/70 flex flex-col items-center justify-center py-16 gap-2 lg:gap-4"
    >
      <div class="fixed inset-0" @click="showAddressForm = false"></div>
      <AddressForm
        class="z-50"
        @close="showAddressForm = false"
        @refresh="refreshAddresses"
      />
    </div>

    <div
      v-if="showDataForm"
      class="fixed z-30 w-full min-h-full bg-[#1F1D20]/70 flex flex-col items-center justify-center py-16 gap-2 lg:gap-4"
    >
      <div class="fixed inset-0" @click="showDataForm = false"></div>
      <DataForm
        class="z-50"
        :personalData="personalData"
        @close="showDataForm = false"
        @refresh="refreshPersonalData"
      />
    </div>
  </main>
  <Footer />
</template>
