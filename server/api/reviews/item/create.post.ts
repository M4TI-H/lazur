import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "User not authenticated",
    });
  }

  const body = await readBody<{
    item_id: number;
    review: string;
    rating: number;
    image_url: string | null;
  }>(event);

  const { data, error } = await supabase
    .from("item_reviews")
    .insert({
      user_id: user.id,
      review: body.review,
      rating: body.rating,
      item_id: body.item_id,
      image_url: body.image_url,
    })
    .select("id")
    .single();

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }

  return { review_id: data.id };
});
