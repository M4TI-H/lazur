import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const body = await readBody<{
    name: string;
    surname: string;
    address: string;
    email: string;
    phone: string;
    delivery: string;
    total: number;
    items: {
      product_id: number;
      quantity: number;
      size: string;
      price_at_order: number;
    }[];
  }>(event);

  const { data: newOrder, error: newOrderError } = await supabase
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

  if (newOrderError) {
    throw createError({
      statusCode: 500,
      statusMessage: newOrderError.message,
    });
  }

  if (!newOrder) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create order.",
    });
  }

  const { error } = await supabase.from("order_items").insert(
    body.items.map((item) => ({
      order_id: newOrder.id,
      garment_id: item.product_id,
      quantity: item.quantity,
      size: item.size,
      price_at_order: item.price_at_order,
    }))
  );

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }

  return { order_id: newOrder.id };
});
