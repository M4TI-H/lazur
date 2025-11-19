import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as any,
    loading: false as boolean,
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
  },

  actions: {
    async loadUser() {
      const supabase = useSupabaseClient();
      this.loading = true;

      const { data } = await supabase.auth.getSession();
      this.user = data.session?.user ?? null;

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

      if (error) throw error;
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

      if (error) throw error;
      this.user = data.user;
    },

    async signOut() {
      const supabase = useSupabaseClient();
      await supabase.auth.signOut();
      this.user = null;
    },
  },
});
