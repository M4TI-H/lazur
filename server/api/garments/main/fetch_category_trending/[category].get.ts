import type Garment from "~/types/Garment";
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const category = event.context.params!.category;

  if (!category) {
    throw createError({ statusCode: 400, statusMessage: "Invalid category" });
  }

  if (category === "any") {
    const { data, error } = await supabase
      .rpc("garments_popularity", { ascending: false })
      .limit(10);

    if (error) {
      throw createError({ statusCode: 500, statusMessage: error.message });
    }

    return data as (Garment & { total_ordered: number })[];
  }

  const { data: categoryData, error: catError } = await supabase
    .from("categories")
    .select("id")
    .eq("category", category)
    .single();

  if (catError) {
    throw createError({ statusCode: 500, statusMessage: catError.message });
  }

  const category_id = categoryData.id;

  if (category !== "any") {
    const { data, error } = await supabase
      .rpc("garments_category_popularity", {
        cat: category_id,
        ascending: false,
      })
      .limit(10);

    if (error) {
      throw createError({ statusCode: 500, statusMessage: error.message });
    }

    return data as (Garment & { total_ordered: number })[];
  }
});
