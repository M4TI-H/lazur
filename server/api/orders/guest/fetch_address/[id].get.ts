import { serverSupabaseClient } from "#supabase/server";
import type Address from "~/types/Address";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const id = Number(event.context.params!.id);

  if (!id || isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid id" });
  }

  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return data as Address;
});
