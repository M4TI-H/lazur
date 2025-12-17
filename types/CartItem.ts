import type Garment from "./Garment";

export default interface CartItem {
  id: number | null;
  user_id: number;
  product_id: number;
  quantity: number;
  size: string;
  product: Garment;
}
