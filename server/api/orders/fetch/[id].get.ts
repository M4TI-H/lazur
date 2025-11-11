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

  const id = Number(event.context.params!.id);

  if (!id || isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid id" });
  }

  const { data, error } = await supabase
    .from("orders")
    .select(`*, delivery(name)`)
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return data as Order & { delivery: { name: string } };
});
