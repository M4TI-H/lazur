import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const query = getQuery(event);
  const id = Number(query.id);

  if (!id || isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid id" });
  }

  const { data: garment, error: garmentError } = await supabase
    .from("garments")
    .select("*")
    .eq("id", id)
    .single();

  if (garmentError) {
    throw createError({ statusCode: 404, statusMessage: "Garment not found" });
  }

  const { data, error } = await supabase
    .from("sizes")
    .select("size")
    .eq("type_id", garment.type_id);

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  const sizes = [...new Set((data ?? []).map((row) => row.size))];

  return sizes as string[];
});
