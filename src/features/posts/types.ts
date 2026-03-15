export type PostCategory =
  | 'price_paid'
  | 'lease_finance'
  | 'issue'
  | 'maintenance'
  | 'review'
  | 'question';

export const POST_CATEGORIES: { value: PostCategory; label: string }[] = [
  { value: 'price_paid', label: 'Price Paid' },
  { value: 'lease_finance', label: 'Lease/Finance' },
  { value: 'issue', label: 'Issue' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'review', label: 'Review' },
  { value: 'question', label: 'Question' },
];

export const CATEGORY_LABELS: Record<PostCategory, string> = {
  price_paid: 'Price Paid',
  lease_finance: 'Lease/Finance',
  issue: 'Issue',
  maintenance: 'Maintenance',
  review: 'Review',
  question: 'Question',
};

export interface Post {
  id: string;
  author_id: string;
  vehicle_model_id: string | null;
  body: string;
  category: PostCategory | null;
  created_at: string;
  vehicle_model?: {
    id: string;
    name: string;
    slug: string;
    vehicle_makes?: { name: string };
  } | null;
}

export interface CreatePostInput {
  body: string;
  vehicle_model_id?: string;
  category?: PostCategory;
}

export interface PostComment {
  id: string;
  post_id: string;
  author_id: string;
  body: string;
  created_at: string;
}
