export default defineNuxtPlugin(() => {
  const supabase = useSupabaseClient();
  const userStore = useUserStore();

  supabase.auth.onAuthStateChange((_event, session) => {
    userStore.user = session?.user ?? null;
  });
});
