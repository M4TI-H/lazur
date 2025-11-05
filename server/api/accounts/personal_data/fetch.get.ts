import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import type PersonalData from "~/types/PersonalData";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "User not authenticated",
    });
  }

  const { data, error } = await supabase
    .from("personal_data")
    .select("name, email, phone, newsletter")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  return data as PersonalData;
});
