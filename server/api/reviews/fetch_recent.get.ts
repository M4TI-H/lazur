import { serverSupabaseClient } from "#supabase/server";
import type Review from "~/types/Review";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .limit(10)
    .order("created_at", { ascending: false });

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return data as Review[];
});
