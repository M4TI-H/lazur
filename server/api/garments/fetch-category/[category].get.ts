import type Garment from "~/types/Garment";
import { serverSupabaseClient } from "#supabase/server";
import { categories } from "@vueuse/core/metadata.mjs";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const category = event.context.params!.category;

  if (!category) {
    throw createError({ statusCode: 400, statusMessage: "Invalid category" });
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

  const query = getQuery(event);
  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 10;
  const from = (page - 1) * limit;
  const to = page * limit - 1;
  const gender = query.gender;

  const sort = (query.option as string) || "price";
  const ascending = query.ascending === "true";

  if (sort === "price") {
    const { data, error } = await supabase
      .from("garments")
      .select(
        `
        id,
        name,
        price,
        description,
        fabrics,
        gender,
        categories ( category )
      `
      )
      .eq("category", category_id)
      .or(`gender.eq.${gender},gender.eq.Unisex`)
      .order("price", { ascending: ascending })
      .range(from, to);

    if (error) {
      throw createError({ statusCode: 500, statusMessage: error.message });
    }

    return data as Garment[];
  } else if (sort === "popularity") {
    const { data, error } = await supabase
      .rpc("garments_category_popularity", {
        cat: category_id,
        ascending: ascending,
      })
      .or(`gender.eq.${gender},gender.eq.Unisex`);

    if (error) {
      throw createError({ statusCode: 500, statusMessage: error.message });
    }

    return data as (Garment & { total_ordered: number })[];
  } else if (sort === "rating") {
    const { data, error } = await supabase
      .rpc("garments_category_rating", {
        cat: category_id,
        ascending: ascending,
      })
      .or(`gender.eq.${gender},gender.eq.Unisex`);

    if (error) {
      throw createError({ statusCode: 500, statusMessage: error.message });
    }

    return data as (Garment & { avg_rating: number })[];
  }

  return {};
});
