import type Garment from "~/types/Garment";
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const { data, error } = await supabase
    .rpc("garments_popularity")
    .order("total_ordered", { ascending: false })
    .limit(10);

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return data as (Garment & { total_ordered: number })[];
});
