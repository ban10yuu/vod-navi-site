import { Article } from '@/lib/types';

import { articles as uNextArticles } from '@/data/articles/u-next';
import { articles as netflixArticles } from '@/data/articles/netflix';
import { articles as amazonPrimeVideoArticles } from '@/data/articles/amazon-prime-video';
import { articles as dmmTvArticles } from '@/data/articles/dmm-tv';
import { articles as dAnimeStoreArticles } from '@/data/articles/d-anime-store';
import { articles as huluArticles } from '@/data/articles/hulu';
import { articles as disneyPlusArticles } from '@/data/articles/disney-plus';
import { articles as abemaArticles } from '@/data/articles/abema';
import { articles as fodPremiumArticles } from '@/data/articles/fod-premium';
import { articles as leminoArticles } from '@/data/articles/lemino';
import { articles as telasaArticles } from '@/data/articles/telasa';
import { articles as crunchyrollArticles } from '@/data/articles/crunchyroll';
import { articles as wowowArticles } from '@/data/articles/wowow';
import { articles as appleTvPlusArticles } from '@/data/articles/apple-tv-plus';
import { articles as rakutenTvArticles } from '@/data/articles/rakuten-tv';
import { articles as daznArticles } from '@/data/articles/dazn';
import { articles as tverArticles } from '@/data/articles/tver';
import { articles as bandaiChannelArticles } from '@/data/articles/bandai-channel';
import { articles as spotifyArticles } from '@/data/articles/spotify';
import { articles as youtubePremiumArticles } from '@/data/articles/youtube-premium';

const allArticles: Article[] = [
  ...uNextArticles,
  ...netflixArticles,
  ...amazonPrimeVideoArticles,
  ...dmmTvArticles,
  ...dAnimeStoreArticles,
  ...huluArticles,
  ...disneyPlusArticles,
  ...abemaArticles,
  ...fodPremiumArticles,
  ...leminoArticles,
  ...telasaArticles,
  ...crunchyrollArticles,
  ...wowowArticles,
  ...appleTvPlusArticles,
  ...rakutenTvArticles,
  ...daznArticles,
  ...tverArticles,
  ...bandaiChannelArticles,
  ...spotifyArticles,
  ...youtubePremiumArticles,
];

const BUILD_DATE = new Date().toISOString().slice(0, 10);
const publishedArticles = allArticles
  .filter(a => a.publishedAt <= BUILD_DATE)
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export function getAllArticles() { return publishedArticles; }
export function getArticleBySlug(slug: string) { return allArticles.find(a => a.slug === slug); }
export function getArticlesByService(serviceSlug: string) {
  return publishedArticles.filter(a => a.serviceSlug === serviceSlug);
}
export function getArticlesByCategory(category: string) {
  return publishedArticles.filter(a => a.category === category);
}
export function getRelatedArticles(article: Article, limit = 5) {
  if (article.relatedSlugs?.length) {
    const related = article.relatedSlugs
      .map(slug => publishedArticles.find(a => a.slug === slug))
      .filter((a): a is Article => !!a);
    if (related.length >= limit) return related.slice(0, limit);
  }
  return publishedArticles
    .filter(a => a.slug !== article.slug && (a.serviceSlug === article.serviceSlug || a.category === article.category))
    .slice(0, limit);
}
export const ARTICLES_PER_PAGE = 10;

export function getPaginatedArticles(page: number) {
  const start = (page - 1) * ARTICLES_PER_PAGE;
  return {
    articles: publishedArticles.slice(start, start + ARTICLES_PER_PAGE),
    totalPages: Math.ceil(publishedArticles.length / ARTICLES_PER_PAGE),
    currentPage: page,
    totalArticles: publishedArticles.length,
  };
}

export function getPopularArticles(limit = 10) { return publishedArticles.slice(0, limit); }
export function getAllSlugs() { return allArticles.map(a => a.slug); }
export function searchArticles(query: string) {
  const q = query.toLowerCase();
  return publishedArticles.filter(a =>
    a.title.toLowerCase().includes(q) ||
    a.excerpt.toLowerCase().includes(q) ||
    a.tags.some(t => t.toLowerCase().includes(q))
  );
}
