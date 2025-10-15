import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const { data, error } = await supabase.from("categories").select("category");

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  const categories = [...new Set((data ?? []).map((row) => row.category))];

  return categories as string[];
});
