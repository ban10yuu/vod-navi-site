import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllSlugs, getArticleBySlug, getRelatedArticles } from '@/lib/articles';
import { getServiceBySlug } from '@/data/services';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/types';
import ArticleCard from '@/components/ArticleCard';
import AdBanner from '@/components/AdBanner';
import AffiliateWidget from '@/components/AffiliateWidget';
import ServiceProductCard from '@/components/ServiceProductCard';
import CommentSection from '@/components/CommentSection';

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { title: article.title, description: article.excerpt, type: 'article' },
    alternates: { canonical: `https://vod-navi-site.vercel.app/article/${slug}/` },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const service = getServiceBySlug(article.serviceSlug);
  const related = getRelatedArticles(article, 4);
  const catLabel = CATEGORY_LABELS[article.category];
  const catColor = CATEGORY_COLORS[article.category];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: article.title,
        description: article.excerpt,
        datePublished: article.publishedAt,
        author: { '@type': 'Organization', name: '動画配信ナビ' },
        publisher: { '@type': 'Organization', name: '動画配信ナビ', url: 'https://vod-navi-site.vercel.app' },
        mainEntityOfPage: `https://vod-navi-site.vercel.app/article/${slug}/`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://vod-navi-site.vercel.app/' },
          ...(service ? [{ '@type': 'ListItem', position: 2, name: service.title, item: `https://vod-navi-site.vercel.app/service/${service.slug}/` }] : []),
          { '@type': 'ListItem', position: service ? 3 : 2, name: article.title },
        ],
      },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-600 mb-4 flex items-center gap-1 flex-wrap">
        <Link href="/" className="hover:text-[#7c3aed] transition-colors">ホーム</Link>
        <span>/</span>
        {service && (
          <>
            <Link href={`/service/${service.slug}/`} className="hover:text-[#7c3aed] transition-colors">{service.title}</Link>
            <span>/</span>
          </>
        )}
        <span className="text-gray-500 truncate">{article.title}</span>
      </nav>

      {/* Category + Date */}
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${catColor}`}>
          {catLabel}
        </span>
        <span className="text-xs text-gray-600">{article.publishedAt}</span>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">
        {article.title}
      </h1>
      <p className="text-sm text-gray-400 mb-6 leading-relaxed">{article.excerpt}</p>

      <AdBanner size="full" />

      {/* Table of contents */}
      <div className="bg-[#12121e] border border-[#252535] rounded-lg p-4 mb-8">
        <h2 className="font-bold text-sm text-white mb-2">目次</h2>
        <ol className="space-y-1">
          {article.sections.map((sec, i) => (
            <li key={i}>
              <a href={`#section-${i}`} className="text-xs text-gray-400 hover:text-[#7c3aed] transition-colors">
                {i + 1}. {sec.heading}
              </a>
            </li>
          ))}
        </ol>
      </div>

      {/* Article content */}
      <div className="article-content">
        {article.sections.map((sec, i) => (
          <div key={i}>
            <h2 id={`section-${i}`}>{sec.heading}</h2>
            <div dangerouslySetInnerHTML={{ __html: sec.content }} />

            {i === 0 && <AdBanner size="medium" />}
            {i === 1 && service && <ServiceProductCard service={service} />}
            {i === 2 && <AdBanner size="compact" />}
          </div>
        ))}
      </div>

      {/* Affiliate widget */}
      {service && <AffiliateWidget service={service} />}

      <AdBanner size="full" />

      {/* Tags */}
      <div className="flex flex-wrap gap-2 my-6">
        {article.tags.map(tag => (
          <span key={tag} className="text-xs px-2.5 py-1 bg-[#1a1a28] text-gray-500 rounded-full border border-[#252535]">
            #{tag}
          </span>
        ))}
      </div>

      {/* Comments */}
      <CommentSection articleSlug={article.slug} />

      {/* Related articles */}
      {related.length > 0 && (
        <div className="mt-10">
          <h2 className="font-black text-lg text-white mb-4 flex items-center gap-2">
            <span className="text-[#7c3aed]">●</span> 関連記事
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map(a => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
