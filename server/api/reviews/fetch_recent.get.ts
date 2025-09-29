import { serverSupabaseClient } from "#supabase/server";
import type Review from "~/types/Review";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const { data, error } = await supabase.from("review").select("*").limit(10);

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return data as Review[];
});
