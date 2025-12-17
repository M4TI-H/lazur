import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import type CartItem from "~/types/CartItem";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "User not authenticated",
    });
  }

  const { data, error } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return data as CartItem[];
});
