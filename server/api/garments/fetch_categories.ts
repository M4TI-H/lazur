import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const { data, error } = await supabase.from("garments").select("category");

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  const uniqueCategories = [
    ...new Set((data ?? []).map((row) => row.category)),
  ];

  return uniqueCategories as string[];
});
