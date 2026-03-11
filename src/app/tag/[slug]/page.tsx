import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllTagSlugs, getArticlesByTag, getTagDisplayName } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';
import GoogleAd from '@/components/GoogleAd';
import Sidebar from '@/components/Sidebar';
import { BreadcrumbJsonLd, TagPageJsonLd } from '@/components/JsonLd';

const BASE_URL = 'https://vod-navi-site.vercel.app';

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllTagSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tagName = getTagDisplayName(slug);
  if (!tagName) return {};
  const articles = getArticlesByTag(slug);
  return {
    title: `「${tagName}」に関する記事一覧（${articles.length}件）`,
    description: `動画配信サービスの「${tagName}」に関する記事を${articles.length}件まとめています。${tagName}の評判・料金・おすすめ情報をチェック。`,
    openGraph: {
      title: `「${tagName}」に関する記事一覧`,
      description: `動画配信サービスの「${tagName}」に関する記事を${articles.length}件まとめています。`,
      type: 'website',
    },
    alternates: { canonical: `${BASE_URL}/tag/${slug}/` },
  };
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tagName = getTagDisplayName(slug);
  if (!tagName) notFound();

  const articles = getArticlesByTag(slug);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', url: `${BASE_URL}/` },
          { name: 'タグ一覧', url: `${BASE_URL}/tags/` },
          { name: tagName },
        ]}
      />
      <TagPageJsonLd tag={tagName} articleCount={articles.length} />

      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 mb-6 flex items-center gap-1">
        <Link href="/" className="hover:text-purple-600 transition-colors">ホーム</Link>
        <span>/</span>
        <Link href="/tags/" className="hover:text-purple-600 transition-colors">タグ一覧</Link>
        <span>/</span>
        <span className="text-slate-400">{tagName}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-2xl font-black text-slate-900 mb-2">
            <span className="text-purple-600">#</span>{tagName}
          </h1>
          <p className="text-sm text-slate-500 mb-6">
            「{tagName}」に関する記事が{articles.length}件あります。
          </p>

          {/* Ad after heading */}
          <div className="mb-6">
            <GoogleAd />
          </div>

          {articles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {articles.map(a => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">
              <p className="font-bold text-slate-600">記事を準備中です</p>
            </div>
          )}

          {/* Ad after articles */}
          <div className="my-6">
            <GoogleAd />
          </div>
        </div>

        <div className="lg:w-72 flex-shrink-0">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
