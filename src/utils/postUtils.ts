import type { PostCategory } from '../features/posts/types';

export function relativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'now';
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  return `${Math.floor(days / 7)}w`;
}

export const CATEGORY_STYLE: Record<PostCategory, { bg: string; text: string }> = {
  general:       { bg: '#F3F4F6', text: '#6B7280' },
  price_paid:    { bg: '#ECFDF5', text: '#059669' },
  lease_finance: { bg: '#EFF6FF', text: '#2563EB' },
  issue:         { bg: '#FEF2F2', text: '#DC2626' },
  maintenance:   { bg: '#FFFBEB', text: '#D97706' },
  review:        { bg: '#F5F3FF', text: '#7C3AED' },
  question:      { bg: '#F3F4F6', text: '#6B7280' },
};

export const CATEGORY_ACCENT: Record<PostCategory, string> = {
  general:       '#6B7280',
  price_paid:    '#059669',
  lease_finance: '#2563EB',
  issue:         '#DC2626',
  maintenance:   '#D97706',
  review:        '#7C3AED',
  question:      '#6B7280',
};
