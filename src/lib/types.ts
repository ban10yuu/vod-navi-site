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
  review: 'bg-purple-50 text-purple-700 border-purple-200',
  comparison: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  recommend: 'bg-amber-50 text-amber-700 border-amber-200',
  howto: 'bg-green-50 text-green-700 border-green-200',
  cost: 'bg-rose-50 text-rose-700 border-rose-200',
};
