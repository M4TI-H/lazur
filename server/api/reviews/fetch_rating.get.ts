import { serverSupabaseClient } from "#supabase/server";
import type Review from "~/types/Review";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const query = getQuery(event);
  const rating = Number(query.rating);

  const { data, error } = await supabase
    .from("review")
    .select("*")
    .eq("general_rating", rating)
    .limit(10);

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return data as Review[];
});
