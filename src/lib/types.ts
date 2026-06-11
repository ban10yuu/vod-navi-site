export type ServiceCategory = 'review' | 'comparison' | 'recommend' | 'howto' | 'cost';

export interface Section {
  heading: string;
  content: string;
}

export interface Article {
  slug: string;
  title: string;
  serviceSlug: string;
  category: ServiceCategory;
  excerpt: string;
  sections: Section[];
  tags: string[];
  publishedAt: string;
  relatedSlugs?: string[];
}

export interface ServiceInfo {
  slug: string;
  title: string;
  type: 'subscription' | 'free' | 'freemium';
  monthlyPrice: number;
  freeTrialDays: number;
  genre: string[];
  description: string;
  color: string;
  officialUrl: string;
}

export interface Campaign {
  slug: string;
  serviceSlug: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  url: string;
  badge?: string;
}

export interface AffiliateLink {
  service: string;
  label: string;
  url: string;
  badge?: string;
  moshimo?: boolean;
}

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  review: 'レビュー・評価',
  comparison: '比較・対決',
  recommend: 'おすすめ作品',
  howto: '使い方・登録',
  cost: '料金・コスパ',
};

export const CATEGORY_COLORS: Record<ServiceCategory, string> = {
  review: 'bg-amber-400/10 text-amber-300 border-amber-400/30',
  comparison: 'bg-sky-400/10 text-sky-300 border-sky-400/30',
  recommend: 'bg-rose-400/10 text-rose-300 border-rose-400/30',
  howto: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/30',
  cost: 'bg-orange-400/10 text-orange-300 border-orange-400/30',
};
