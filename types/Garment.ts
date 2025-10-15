export default interface Garment {
  id: number;
  name: string;
  price: number;
  categories?: {
    category: string;
  };
  description: string;
  fabrics: string;
  gender: string;
}
