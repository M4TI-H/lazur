import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const body = await readBody<{
    name: string;
    review: string;
    quality: number;
    price: number;
    satisfaction: number;
    experience: number;
    image: string;
  }>(event);

  const general = (
    (body.quality + body.price + body.satisfaction + body.experience) /
    4
  ).toFixed();

  const { data: newReview, error: newOrderError } = await supabase
    .from("reviews")
    .insert({
      name: body.name,
      review: body.review,
      quality: body.quality,
      price: body.price,
      satisfaction: body.satisfaction,
      shopping_experience: body.experience,
      general_rating: general,
      image: body.image ? body.image : null,
    })
    .select("id")
    .single();

  if (newOrderError) {
    throw createError({
      statusCode: 500,
      statusMessage: newOrderError.message,
    });
  }

  if (!newReview) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create review.",
    });
  }

  return { review_id: newReview.id };
});
