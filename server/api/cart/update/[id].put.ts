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

  const id = Number(event.context.params!.id);

  if (!id || isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid id" });
  }

  const body = await readBody<{ delta: number }>(event);

  const { data: item, error: fetchError } = await supabase
    .from("cart_items")
    .select("quantity")
    .eq("id", id)
    .single();

  if (fetchError) {
    throw createError({
      statusCode: 500,
      statusMessage: fetchError.message,
    });
  }

  const updatedQuantity = Math.max(0, Math.min(10, item.quantity + body.delta));

  const { error: updateError } = await supabase
    .from("cart_items")
    .update({ quantity: updatedQuantity })
    .eq("id", id)
    .eq("user_id", user.id);

  if (updateError) {
    throw createError({ statusCode: 500, statusMessage: updateError.message });
  }

  return { quantity: updatedQuantity };
});
