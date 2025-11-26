import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import type Address from "~/types/Address";

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
    .from("addresses")
    .select("*")
    .eq("is_displayed", true)
    .eq("user_id", user.id);

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return data as Address[];
});
