<script setup lang="ts">
const { scrollY } = useScroll();
import { useFetchUserAddresses } from "~/composables/users/addresses/useFetchAddresses";
import { useFetchPersonalData } from "~/composables/users/personalData/useFetchPersonalData";

const userStore = useUserStore();

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

watch([showAddressForm, showDataForm], ([reviews, form]) => {
  if (reviews || form) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
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
    class="w-full min-h-screen flex flex-col items-center bg-white overflow-y-auto overflow-x-hidden"
  >
    <ImageHeader :image="`/accountBg.jpeg`" :title="`Account settings`" />
    <section
      class="w-full flex flex-col md:flex-row items-center md:items-start px-8 py-6 gap-8"
    >
      <UserData :personalData="personalData" @modify="showDataForm = true" />
      <AddressBook
        @addNew="showAddressForm = true"
        @refresh="refreshAddresses"
      />
    </section>

    <div
      v-if="showAddressForm"
      class="fixed z-30 w-full min-h-full bg-stone-900/70 flex flex-col items-center justify-center py-16 gap-2 lg:gap-4"
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
      class="fixed z-30 w-full min-h-full bg-stone-900/70 flex flex-col items-center justify-center py-16 gap-2 lg:gap-4"
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
</template>
