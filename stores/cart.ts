import { defineStore } from "pinia";
import { useAddToCart } from "~/composables/cart/useAddToCart";
import { useRemoveFromCart } from "~/composables/cart/useRemoveFromCart";
import type Garment from "~/types/Garment";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: {
      items: [] as (Garment & {
        quantity: number;
        size: string;
        cartItemId: number | null;
      })[],
      total: 0,
      delivery_cost: 0,
    },
  }),

  actions: {
    async addToCart(product: Garment, size: string) {
      const userStore = useUserStore();
      const { addItemToCart } = useAddToCart();

      let item = this.cart.items.find(
        (p) => p.id === product.id && p.size === size
      );

      if (item) {
        if (item.quantity < 10) {
          item.quantity++;
        }
      } else {
        item = {
          ...product,
          quantity: 1,
          size,
          cartItemId: null,
        };
        this.cart.items.push(item);
      }
      this.updateTotal();
      this.saveToStorage();

      if (!userStore.isLoggedIn) return;

      const cartItemId = await addItemToCart(product.id, size);

      if (cartItemId) {
        item.cartItemId = cartItemId;
        this.saveToStorage();
      }
    },
    removeFromCart(product_id: number, size: string) {
      const userStore = useUserStore();
      const { removeFromCart } = useRemoveFromCart();

      const item = this.cart.items.find(
        (i) => i.id === product_id && i.size === size
      );

      if (!item) return;

      this.cart.items = this.cart.items.filter((i) => i !== item);

      this.updateTotal();
      this.saveToStorage();

      if (!userStore.isLoggedIn || !item.cartItemId) return;

      removeFromCart(item.cartItemId);
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
