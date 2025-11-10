export default interface Order {
  id: number;
  created_at: string;
  email: string;
  phone: string;
  total: number;
  user_id: number;
  address_id: number;
  delivery_id: number;
  name: string;
}
