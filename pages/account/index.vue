<script setup lang="ts">
const { scrollY } = useScroll();
import { useFetchUserAddresses } from "~/composables/users/addresses/useFetchAddresses";
import { useFetchPersonalData } from "~/composables/users/personalData/useFetchPersonalData";

const userStore = useUserStore();

const { addressesRefresh } = useFetchUserAddresses();

const { personalData, personalDataLoading, personalDataRefresh } =
  useFetchPersonalData();

const showAddressForm = ref<boolean>(false);
const showDataForm = ref<boolean>(false);
const showReviewForm = ref<boolean>(false);

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
      <div
        class="w-full min-w-[18rem] max-w-[18rem] sm:max-w-[24rem] flex flex-col gap-8"
      >
        <UserData :personalData="personalData" @modify="showDataForm = true" />
        <button
          @click="showReviewForm = true"
          class="w-full h-[13rem] bg-white border-2 border-gray-200 rounded-lg flex flex-col items-center justify-center gap-2 p-4 cursor-pointer hover:bg-gray-100"
        >
          <div class="flex gap-2">
            <i class="pi pi-thumbs-up text-4xl text-gray-500"></i>
            <i class="pi pi-thumbs-down text-4xl text-gray-500"></i>
          </div>
          <p class="text-lg text-gray-500 font-semibold">Leave a review</p>
        </button>
      </div>
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
    <div
      v-if="showReviewForm"
      class="fixed z-30 w-full min-h-full bg-stone-900/70 flex flex-col items-center justify-center py-16 gap-2 lg:gap-4"
    >
      <div class="fixed inset-0" @click="showReviewForm = false"></div>
      <LazurReviewForm
        :name="personalData?.name"
        @submit="showReviewForm = false"
        @cancel="showReviewForm = false"
      />
    </div>
  </main>
</template>
