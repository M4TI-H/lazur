import { serverSupabaseClient } from "#supabase/server";
import type Delivery from "~/types/Delivery";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const { data, error } = await supabase.from("delivery").select("*");

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return data as Delivery[];
});
