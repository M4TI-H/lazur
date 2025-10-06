import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const body = await readBody<{
    name: string;
    review: string;
    rating: number;
    item_id: number;
  }>(event);

  const { data, error } = await supabase
    .from("item_reviews")
    .insert({
      name: body.name,
      review: body.review,
      rating: body.rating,
      item_id: body.item_id,
    })
    .select("id")
    .single();

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }

  if (!data) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create review.",
    });
  }

  return { review_id: data.id };
});
