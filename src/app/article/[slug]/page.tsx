import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllSlugs, getArticleBySlug, getRelatedArticles, getArticlesByCategory, getArticlesByService } from '@/lib/articles';
import { getServiceBySlug, serviceList } from '@/data/services';
import { CATEGORY_LABELS, CATEGORY_COLORS, ServiceCategory } from '@/lib/types';
import ArticleCard from '@/components/ArticleCard';
import AdBanner from '@/components/AdBanner';
import GoogleAd from '@/components/GoogleAd';
import AffiliateWidget from '@/components/AffiliateWidget';
import ServiceProductCard from '@/components/ServiceProductCard';
import CommentSection from '@/components/CommentSection';
import AuthorBox from '@/components/AuthorBox';
import ShareButtons from '@/components/ShareButtons';
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd, buildFaqFromSections } from '@/components/JsonLd';

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  const service = getServiceBySlug(article.serviceSlug);
  const catLabel = CATEGORY_LABELS[article.category];
  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.tags,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      section: catLabel,
      tags: article.tags,
      siteName: '動画配信ナビ',
      locale: 'ja_JP',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
    },
    alternates: { canonical: `https://vod-navi-site.vercel.app/article/${slug}/` },
    other: {
      ...(service && { 'article:service': service.title }),
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const BASE_URL = 'https://vod-navi-site.vercel.app';
  const service = getServiceBySlug(article.serviceSlug);
  const related = getRelatedArticles(article, 4);
  const catLabel = CATEGORY_LABELS[article.category];
  const catColor = CATEGORY_COLORS[article.category];
  const categories = Object.entries(CATEGORY_LABELS) as [ServiceCategory, string][];
  const faqs = buildFaqFromSections(article.sections);

  // Get recommended articles from same category but different service
  const categoryArticles = getArticlesByCategory(article.category)
    .filter(a => a.slug !== article.slug && a.serviceSlug !== article.serviceSlug)
    .slice(0, 4);

  // Get more articles from the same service
  const sameServiceArticles = getArticlesByService(article.serviceSlug)
    .filter(a => a.slug !== article.slug)
    .slice(0, 4);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Structured Data: Article + Breadcrumb + FAQ */}
      <ArticleJsonLd article={article} serviceTitle={service?.title} />
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', url: `${BASE_URL}/` },
          ...(service ? [{ name: service.title, url: `${BASE_URL}/service/${service.slug}/` }] : []),
          { name: catLabel, url: `${BASE_URL}/category/${article.category}/` },
          { name: article.title },
        ]}
      />
      <FaqJsonLd faqs={faqs} />

      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 mb-4 flex items-center gap-1 flex-wrap">
        <Link href="/" className="hover:text-purple-600 transition-colors">ホーム</Link>
        <span>/</span>
        {service && (
          <>
            <Link href={`/service/${service.slug}/`} className="hover:text-purple-600 transition-colors">{service.title}</Link>
            <span>/</span>
          </>
        )}
        <Link href={`/category/${article.category}/`} className="hover:text-purple-600 transition-colors">{catLabel}</Link>
        <span>/</span>
        <span className="text-slate-400 truncate">{article.title}</span>
      </nav>

      {/* Category + Date */}
      <div className="flex items-center gap-2 mb-3">
        <Link href={`/category/${article.category}/`} className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${catColor} hover:opacity-80 transition-opacity`}>
          {catLabel}
        </Link>
        <span className="text-xs text-slate-400">{article.publishedAt}</span>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 leading-tight">
        {article.title}
      </h1>
      <p className="text-sm text-slate-600 mb-6 leading-relaxed">{article.excerpt}</p>

      {/* Ad after excerpt */}
      <div className="my-6">
        <GoogleAd />
      </div>

      <AdBanner size="full" />

      {/* Table of contents */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-8">
        <h2 className="font-bold text-sm text-slate-900 mb-2">目次</h2>
        <ol className="space-y-1">
          {article.sections.map((sec, i) => (
            <li key={i}>
              <a href={`#section-${i}`} className="text-xs text-slate-500 hover:text-purple-600 transition-colors">
                {i + 1}. {sec.heading}
              </a>
            </li>
          ))}
        </ol>
      </div>

      {/* Ad after TOC */}
      <div className="my-6">
        <GoogleAd />
      </div>

      {/* Article content */}
      <div className="article-content">
        {article.sections.map((sec, i) => (
          <div key={i}>
            <h2 id={`section-${i}`}>{sec.heading}</h2>
            <div dangerouslySetInnerHTML={{ __html: sec.content }} />

            {i === 0 && <><AdBanner size="medium" /><div className="my-6"><GoogleAd /></div></>}
            {i === 1 && service && <ServiceProductCard service={service} />}
            {i === 2 && <><AdBanner size="compact" /><div className="my-6"><GoogleAd /></div></>}
          </div>
        ))}
      </div>

      {/* Ad after article content */}
      <div className="my-6">
        <GoogleAd />
      </div>

      {/* Affiliate widget */}
      {service && <AffiliateWidget service={service} />}

      <AdBanner size="full" />

      {/* Tags (clickable links) */}
      <div className="flex flex-wrap gap-2 my-6">
        {article.tags.map(tag => (
          <Link
            key={tag}
            href={`/tag/${encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'))}/`}
            className="text-xs px-2.5 py-1 bg-gray-100 text-slate-500 rounded-full hover:bg-purple-50 hover:text-purple-600 transition-colors"
          >
            #{tag}
          </Link>
        ))}
      </div>

      {/* Author box (E-E-A-T) */}
      <AuthorBox />

      {/* SNS Share buttons */}
      <ShareButtons title={article.title} />

      {/* Category navigation */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 my-6">
        <h3 className="font-bold text-sm text-slate-900 mb-2">カテゴリから探す</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map(([key, label]) => (
            <Link
              key={key}
              href={`/category/${key}/`}
              className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition-opacity hover:opacity-80 ${
                key === article.category ? CATEGORY_COLORS[key] + ' ring-1 ring-offset-1' : CATEGORY_COLORS[key]
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Ad after tags */}
      <div className="my-6">
        <GoogleAd />
      </div>

      {/* Comments */}
      <CommentSection articleSlug={article.slug} />

      {/* Ad after comments */}
      <div className="my-6">
        <GoogleAd />
      </div>

      {/* Same service articles */}
      {sameServiceArticles.length > 0 && service && (
        <div className="mt-10">
          <h2 className="font-black text-lg text-slate-900 mb-4 flex items-center gap-2">
            <span className="text-purple-600">●</span> {service.title}の他の記事
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sameServiceArticles.map(a => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
          <div className="text-center mt-4">
            <Link href={`/service/${service.slug}/`} className="text-xs text-purple-600 hover:text-purple-700 font-semibold transition-colors">
              {service.title}の記事をすべて見る →
            </Link>
          </div>
        </div>
      )}

      {/* Related articles */}
      {related.length > 0 && (
        <div className="mt-10">
          <h2 className="font-black text-lg text-slate-900 mb-4 flex items-center gap-2">
            <span className="text-purple-600">●</span> 関連記事
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map(a => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      )}

      {/* Recommended from same category */}
      {categoryArticles.length > 0 && (
        <div className="mt-10">
          <h2 className="font-black text-lg text-slate-900 mb-4 flex items-center gap-2">
            <span className="text-cyan-500">●</span> 「{catLabel}」の他の記事
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categoryArticles.map(a => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
          <div className="text-center mt-4">
            <Link href={`/category/${article.category}/`} className="text-xs text-purple-600 hover:text-purple-700 font-semibold transition-colors">
              {catLabel}の記事をすべて見る →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
