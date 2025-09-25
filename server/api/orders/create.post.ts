import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const body = await readBody<{
    name: string;
    surname: string;
    address: number;
    email: string;
    phone: string;
    delivery: string;
    total: number;
  }>(event);

  const { data: newOrder, error } = await supabase
    .from("orders")
    .insert({
      name: body.name,
      surname: body.surname,
      address: body.address,
      email: body.email,
      phone: body.phone,
      delivery: body.delivery,
      total: body.total,
    })
    .select("id")
    .single();

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }

  if (!newOrder) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create order.",
    });
  }

  return { element: newOrder[0] };
});
