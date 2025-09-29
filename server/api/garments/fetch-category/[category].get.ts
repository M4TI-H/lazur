import type Garment from "~/types/Garment";
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const category = event.context.params!.category;

  if (!category) {
    throw createError({ statusCode: 400, statusMessage: "Invalid category" });
  }

  const query = getQuery(event);
  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 10;
  const from = (page - 1) * limit;
  const to = page * limit - 1;

  const { data, error } = await supabase
    .from("garments")
    .select("*")
    .eq("category", category)
    .range(from, to);

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return data as Garment[];
});
