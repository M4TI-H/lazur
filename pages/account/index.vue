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
    <section class="relative w-full h-[24rem] flex flex-col items-center">
      <img class="w-full h-full object-cover z-10" src="/accountBg.jpeg" />
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
    <section
      class="w-full flex flex-col md:flex-row items-center md:items-start p-8 gap-8"
    >
      <UserData :personalData="personalData" @modify="showDataForm = true" />

      <div
        v-if="addresses"
        class="w-full min-w-[18rem] max-w-[18rem] sm:max-w-[24rem] md:max-w-none h-auto md:h-[30rem] p-4 gap-2 sm:gap-4 flex flex-col bg-white border-2 border-[#ccc] rounded-lg overflow-y-auto"
      >
        <div class="w-full flex items-center justify-between">
          <span class="flex items-center gap-2">
            <h2 class="text-xl font-semibold">Address book</h2>
            <p class="text-xs text-secondary">{{ addresses.length }}/6</p>
          </span>

          <button
            @click="showAddressForm = true"
            class="text-sm flex items-center justify-center gap-2 text-secondary py-1 px-2 rounded-full bg-[#ccc]/25 hover:bg-[#ccc]/50 hover:cursor-pointer transition-colors duration-150"
          >
            Add new
            <i class="pi pi-file-plus text-xs"></i>
          </button>
        </div>

        <p v-if="addresses.length === 0" class="text-sm text-secondary">
          No saved addresses.
        </p>

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
