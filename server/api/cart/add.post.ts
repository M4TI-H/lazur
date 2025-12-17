import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

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
    product_id: number;
    size: string;
  }>(event);

  const { data, error } = await supabase
    .from("cart_items")
    .insert({
      product_id: body.product_id,
      quantity: 1,
      size: body.size,
      user_id: user.id,
    })
    .select("id")
    .single();

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }

  return { cartItemId: data.id };
});
