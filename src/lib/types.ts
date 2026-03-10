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
}

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  review: 'レビュー・評価',
  comparison: '比較・対決',
  recommend: 'おすすめ作品',
  howto: '使い方・登録',
  cost: '料金・コスパ',
};

export const CATEGORY_COLORS: Record<ServiceCategory, string> = {
  review: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  comparison: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  recommend: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  howto: 'bg-green-500/20 text-green-300 border-green-500/30',
  cost: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
};
