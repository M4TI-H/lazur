import { defineStore } from "pinia";
import type Delivery from "~/types/Delivery";
import type Order from "~/types/Order";

export const useOrderStore = defineStore("order", {
  state: () => ({
    orderData: {} as Order,
    delivery: null as Delivery | null,
  }),

  actions: {
    setOrderData(data: Partial<typeof this.orderData>) {
      this.orderData = { ...this.orderData, ...data };
      this.saveToStorage();
    },
    saveToStorage() {
      localStorage.setItem("order", JSON.stringify(this.orderData));
    },
    loadFromStorage() {
      const data = localStorage.getItem("order");
      if (data) {
        this.orderData = JSON.parse(data);
      }
    },
    clearStorage() {
      localStorage.removeItem("order");
      localStorage.clear();
    },
  },
});
