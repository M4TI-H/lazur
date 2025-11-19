import { defineStore } from "pinia";
import type Garment from "~/types/Garment";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: {
      items: [] as (Garment & { quantity: number; size: string })[],
      total: 0,
      delivery_cost: 0,
    },
  }),

  actions: {
    addToCart(product: Garment, size: string) {
      const isInCart = this.cart.items.find(
        (p) => p.id === product.id && p.size === size
      );
      if (isInCart) {
        if (isInCart.quantity < 10) {
          isInCart.quantity++;
        }
      } else {
        this.cart.items.push({ ...product, quantity: 1, size });
      }

      this.updateTotal();
      this.saveToStorage();
    },
    removeFromCart(id: number, size: string) {
      this.cart.items = this.cart.items.filter(
        (i) => !(i.id === id && i.size === size)
      );
      this.updateTotal();
      this.saveToStorage();
    },
    incrementQuantity(id: number, size: string) {
      const product = this.cart.items.find(
        (i) => i.id === id && i.size === size
      );

      if (product && product.quantity < 10) {
        product.quantity++;
        this.updateTotal();
        this.saveToStorage();
      }
    },
    decrementQuantity(id: number, size: string) {
      const product = this.cart.items.find(
        (i) => i.id == id && i.size === size
      );

      if (product && product.quantity > 1) {
        product.quantity--;
        this.updateTotal();
        this.saveToStorage();
      }
    },
    updateTotal() {
      this.cart.total =
        Number(this.totalPrice) + (this.cart.delivery_cost ?? 0);
    },
    updateDelivery(cost: number) {
      this.cart.delivery_cost = cost;
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
    clearStorage() {
      this.cart.items = [];
      this.cart.total = 0;
      localStorage.removeItem("cart");
      localStorage.clear();
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
