import { defineStore } from "pinia";
import type Address from "~/types/Address";

export const useAddressStore = defineStore("address", {
  state: () => ({
    address: null as Address | null,
  }),

  actions: {
    setAddress(address: Address) {
      this.address = address;
      localStorage.setItem("address", JSON.stringify(this.address));

      return true;
    },

    loadFromStorage() {
      const data = localStorage.getItem("order");
      if (data) {
        this.address = JSON.parse(data);
      }
    },
    clearStorage() {
      this.address = null;
      localStorage.removeItem("address");
      localStorage.clear();
    },
  },
});
