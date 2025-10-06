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

  const sort = (query.option as string) || "price";
  const ascending = query.ascending === "true";

  if (sort === "price") {
    const { data, error } = await supabase
      .from("garments")
      .select("*")
      .eq("category", category)
      .order("price", { ascending: ascending })
      .range(from, to);

    if (error) {
      throw createError({ statusCode: 500, statusMessage: error.message });
    }

    return data as Garment[];
  } else if (sort === "popularity") {
    const { data, error } = await supabase
      .rpc("garments_category_popularity", { cat: category })
      .order("total_ordered", { ascending: ascending });

    if (error) {
      throw createError({ statusCode: 500, statusMessage: error.message });
    }

    return data as (Garment & { total_ordered: number })[];
  } else if (sort === "rating") {
    const { data, error } = await supabase
      .rpc("garments_category_rating", { cat: category })
      .order("avg_rating", { ascending: ascending });

    if (error) {
      throw createError({ statusCode: 500, statusMessage: error.message });
    }

    return data as (Garment & { avg_rating: number })[];
  }

  return {};
});
