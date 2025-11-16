import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const body = await readBody<{
    name: string;
    email: string;
    phone: string;
    total: number;
    delivery_id: number;
    address: {
      country: string;
      city: string;
      postal_code: string;
      street: string;
      building_num: string;
      flat_num?: string | null;
    };
    items: {
      product_id: number;
      quantity: number;
      size: string;
      price_at_order: number;
    }[];
  }>(event);

  const { data: addressData, error: addressError } = await supabase
    .from("addresses")
    .insert({
      country: body.address.country,
      city: body.address.city,
      postal_code: body.address.postal_code,
      street: body.address.street,
      building_num: body.address.building_num,
      flat_num: body.address.flat_num,
      user_id: null,
    })
    .select("id")
    .single();

  if (addressError) {
    throw createError({
      statusCode: 500,
      statusMessage: addressError.message,
    });
  }

  const { data: newOrder, error: newOrderError } = await supabase
    .from("orders")
    .insert({
      name: body.name,
      address_id: addressData.id,
      email: body.email,
      phone: body.phone,
      delivery_id: body.delivery_id,
      total: body.total,
      user_id: null,
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

  return { order_id: newOrder.id ?? null, address_id: addressData.id ?? null };
});
