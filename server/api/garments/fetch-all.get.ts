import type Garment from "~/types/Garment";
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const { data, error } = await supabase.from("garments").select("*");

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return data as Garment[];
});
