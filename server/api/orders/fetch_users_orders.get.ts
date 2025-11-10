import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import type Order from "~/types/Order";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "User not authenticated",
    });
  }

  const { data, error } = await supabase.rpc("orders_with_item_count", {
    userid: user.id,
  });

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return data as (Order & { total_count: number })[];
});
