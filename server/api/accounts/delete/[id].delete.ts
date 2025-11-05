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

  const { data, error } = await supabase
    .from("orders")
    .select("address")
    .eq("address", id);

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }

  if (data.length > 0) {
    const { error: editError } = await supabase
      .from("addresses")
      .update({ is_displayed: false })
      .eq("id", id)
      .eq("user_id", user.id);

    if (editError) {
      throw createError({
        statusCode: 500,
        statusMessage: editError.message,
      });
    }
  } else {
    const { error: deleteError } = await supabase
      .from("addresses")
      .delete()
      .eq("user_id", user.id)
      .eq("id", id);

    if (deleteError) {
      throw createError({
        statusCode: 500,
        statusMessage: deleteError.message,
      });
    }
  }

  return { success: true };
});
