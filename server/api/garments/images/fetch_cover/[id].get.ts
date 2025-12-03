import { serverSupabaseClient } from "#supabase/server";
import type ProductImage from "~/types/ProductImage";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const id = Number(event.context.params!.id);

  if (!id || isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid id" });
  }

  const { data, error } = await supabase
    .from("product_images")
    .select("*")
    .eq("product_id", id)
    .ilike("url", "%cover%")
    .maybeSingle();

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return data as ProductImage;
});
