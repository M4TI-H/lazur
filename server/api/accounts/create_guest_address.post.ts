import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const body = await readBody<{
    country: string;
    city: string;
    postal_code: string;
    street: string;
    building_num: string;
    flat_num: string;
  }>(event);

  const { data, error } = await supabase
    .from("addresses")
    .insert({
      country: body.country,
      city: body.city,
      postal_code: body.postal_code,
      street: body.street,
      building_num: body.building_num,
      flat_num: body.flat_num,
      user_id: null,
    })
    .select("id")
    .single();

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }

  return { address_id: data.id };
});
