import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as any,
    loading: false as boolean,
    name: null as string | null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
  },

  actions: {
    async setName(name: string | null) {
      this.name = name;
    },
    async loadUser() {
      const supabase = useSupabaseClient();
      this.loading = true;

      const { data, error } = await supabase.auth.getSession();
      this.user = data.session?.user ?? null;

      if (error) {
        this.loading = false;
        return;
      }

      if (this.user) {
        const cartStore = useCartStore();
        await cartStore.loadCart();
      }

      this.loading = false;
    },

    async signIn(email: string, password: string) {
      const supabase = useSupabaseClient();
      this.loading = true;

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      this.loading = false;

      if (error) {
        this.loading = false;
        return;
      }

      if (this.user) {
        const cartStore = useCartStore();
        await cartStore.loadCart();
      }

      this.user = data.user;
    },

    async signUp(email: string, password: string) {
      const supabase = useSupabaseClient();
      this.loading = true;

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      this.loading = false;

      if (error) return;
      this.user = data.user;
      navigateTo("/account/login");
    },

    async signOut() {
      const cartStore = useCartStore();
      const supabase = useSupabaseClient();
      this.user = null;
      cartStore.clearStorage();
      await supabase.auth.signOut();
    },
  },
});
