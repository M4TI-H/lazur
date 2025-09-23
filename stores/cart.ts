import { defineStore } from "pinia";
import type Garment from "~/types/Garment";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: {
      items: [] as (Garment & { quantity: number; size: string })[],
      total: 0,
    },
  }),

  actions: {
    addToCart(product: Garment, size: string) {
      const isInCart = this.cart.items.find(
        (p) => p.id === product.id && p.size === size
      );
      if (isInCart) {
        isInCart.quantity++;
      } else {
        this.cart.items.push({ ...product, quantity: 1, size });
      }

      this.updateTotal();
      this.saveToStorage();
    },
    removeFromCart(id: number) {
      this.cart.items = this.cart.items.filter((i) => i.id !== id);
      this.updateTotal();
      this.saveToStorage();
    },
    incrementQuantity(id: number) {
      const product = this.cart.items.find((i) => i.id == id);

      if (product && product.quantity < 99) {
        product.quantity++;
        this.updateTotal();
        this.saveToStorage();
      }
    },
    decrementQuantity(id: number) {
      const product = this.cart.items.find((i) => i.id == id);

      if (product && product.quantity > 1) {
        product.quantity--;
        this.updateTotal();
        this.saveToStorage();
      }
    },
    updateTotal() {
      this.cart.total = Number(this.totalPrice);
    },
    saveToStorage() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    loadFromStorage() {
      const data = localStorage.getItem("cart");
      if (data) {
        this.cart = JSON.parse(data);
      }
    },
  },

  getters: {
    itemCount: (state) =>
      state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) =>
      state.cart.items
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toFixed(2),
  },
});
