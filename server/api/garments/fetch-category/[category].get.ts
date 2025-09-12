import type Garment from "~/types/Garment";
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const category = event.context.params!.category;

  if (!category) {
    throw createError({ statusCode: 400, statusMessage: "Invalid category" });
  }

  const { data, error } = await supabase
    .from("garments")
    .select("*")
    .eq("category", category);

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return data as Garment[];
});
