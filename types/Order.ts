export default interface Order {
  id: number;
  name: string;
  surname: string;
  address: string;
  email: string;
  phone: string;
  delivery: number;
  total: number;
  created_at: string;
}
