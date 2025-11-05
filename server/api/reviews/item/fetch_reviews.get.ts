import { serverSupabaseClient } from "#supabase/server";
import type ItemReview from "~/types/ItemReview";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const { data, error } = await supabase.rpc("reviews_with_user_name");

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return data as (ItemReview & { name: string })[];
});
