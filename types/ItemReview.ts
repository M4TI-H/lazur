export default interface ItemReview {
  id: number;
  item_id: number;
  user_id: number;
  review: string;
  rating: number;
  image_url: string;
  created_at: string;
}
