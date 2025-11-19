import { serverSupabaseClient } from "#supabase/server";
import type Address from "~/types/Address";
import type Order from "~/types/Order";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const query = getQuery(event);
  const token = String(query.token);
  const id = Number(event.context.params!.id);

  if (!id || isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid id" });
  }

  const { data, error } = await supabase
    .from("orders")
    .select(`*, delivery(name), address:addresses(*)`)
    .eq("id", id)
    .eq("order_token", token)
    .single();

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return data as Order & { delivery: { name: string } } & { address: Address };
});
