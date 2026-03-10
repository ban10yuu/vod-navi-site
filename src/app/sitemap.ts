import { MetadataRoute } from 'next';
import { getAllArticles, ARTICLES_PER_PAGE } from '@/lib/articles';
import { serviceList } from '@/data/services';
import { CATEGORY_LABELS, ServiceCategory } from '@/lib/types';

export const dynamic = 'force-static';

const BASE_URL = 'https://vod-navi-site.vercel.app';
const TODAY = new Date().toISOString().slice(0, 10);

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();
  const categories = Object.keys(CATEGORY_LABELS) as ServiceCategory[];

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: TODAY,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/campaigns/`,
      lastModified: TODAY,
      changeFrequency: 'daily',
      priority: 0.7,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = serviceList.map(s => ({
    url: `${BASE_URL}/service/${s.slug}/`,
    lastModified: TODAY,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map(cat => ({
    url: `${BASE_URL}/category/${cat}/`,
    lastModified: TODAY,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map(a => ({
    url: `${BASE_URL}/article/${a.slug}/`,
    lastModified: a.publishedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const paginationPages: MetadataRoute.Sitemap = Array.from({ length: totalPages - 1 }, (_, i) => ({
    url: `${BASE_URL}/page/${i + 2}/`,
    lastModified: TODAY,
    changeFrequency: 'daily' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...paginationPages, ...servicePages, ...categoryPages, ...articlePages];
}
