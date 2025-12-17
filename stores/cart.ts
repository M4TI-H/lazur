import { defineStore } from "pinia";
import { useAddToCart } from "~/composables/cart/useAddToCart";
import { useFetchCart } from "~/composables/cart/useFetchCart";
import { useRemoveFromCart } from "~/composables/cart/useRemoveFromCart";
import { useUpdateQuantity } from "~/composables/cart/useUpdateQuantity";
import type CartItem from "~/types/CartItem";
import type Garment from "~/types/Garment";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: {
      items: [] as CartItem[],
      total: 0,
      delivery_cost: 0,
    },
  }),

  actions: {
    async loadCart() {
      const { cartItems, fetchCart } = useFetchCart();
      await fetchCart();
      this.cart.items = cartItems.value;
    },
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
          id: null,
          user_id: userStore.user?.id ?? 0,
          product_id: product.id,
          quantity: 1,
          size,
          product,
        };
        this.cart.items.push(item);
      }
      this.updateTotal();
      this.saveToStorage();

      if (!userStore.isLoggedIn) return;

      const cartItemId = await addItemToCart(product.id, size);

      if (cartItemId) {
        item.id = cartItemId;
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

      if (!userStore.isLoggedIn || !item.id) return;

      removeFromCart(item.id);
    },
    chageQuantity(id: number, size: string, delta: number) {
      const userStore = useUserStore();
      const { updateQuantity } = useUpdateQuantity();

      const item = this.cart.items.find((i) => i.id === id && i.size === size);
      if (!item) return;

      item.quantity = Math.max(1, Math.min(10, item.quantity + delta));

      this.updateTotal();
      this.saveToStorage();

      if (userStore.isLoggedIn && item.id) {
        updateQuantity(item.id, delta);
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
      this.cart.delivery_cost = 0;
      localStorage.removeItem("cart");
    },
  },

  getters: {
    itemCount: (state) =>
      state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) =>
      state.cart.items
        .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
        .toFixed(2),
  },
});
