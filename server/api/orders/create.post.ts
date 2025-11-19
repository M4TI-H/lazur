import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import { randomUUID } from "crypto";

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
    email: string;
    phone: string;
    total: number;
    address_id: number;
    delivery_id: number;
    items: {
      product_id: number;
      quantity: number;
      size: string;
      price_at_order: number;
    }[];
  }>(event);

  const order_token = randomUUID();

  const { data: newOrder, error: newOrderError } = await supabase
    .from("orders")
    .insert({
      name: body.name,
      address_id: body.address_id,
      email: body.email,
      phone: body.phone,
      delivery_id: body.delivery_id,
      total: body.total,
      user_id: user.id,
      order_token: order_token,
    })
    .select("id, order_token")
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

  return {
    order_id: newOrder.id ?? null,
    order_token: newOrder.order_token ?? null,
  };
});
