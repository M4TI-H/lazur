export default interface Address {
  id: number;
  country: string;
  city: string;
  street: string;
  building_num: string;
  flat_num: string | null;
  postal_code: string;
  is_displayed: boolean;
}
