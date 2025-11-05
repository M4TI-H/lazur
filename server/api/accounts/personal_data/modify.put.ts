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
    name: string;
    phone: string;
    newsletter: boolean;
  }>(event);

  const { error } = await supabase
    .from("personal_data")
    .update({
      name: body.name,
      phone: body.phone,
      newsletter: body.newsletter,
    })
    .eq("user_id", user.id);

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return { success: true };
});
