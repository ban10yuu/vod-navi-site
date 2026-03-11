import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CATEGORY_LABELS, CATEGORY_COLORS, ServiceCategory } from '@/lib/types';
import { getArticlesByCategory } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';
import GoogleAd from '@/components/GoogleAd';
import Sidebar from '@/components/Sidebar';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

const BASE_URL = 'https://vod-navi-site.vercel.app';
const categories = Object.keys(CATEGORY_LABELS) as ServiceCategory[];

export async function generateStaticParams() {
  return categories.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const label = CATEGORY_LABELS[slug as ServiceCategory];
  if (!label) return {};
  const articles = getArticlesByCategory(slug);
  return {
    title: `${label}の記事一覧（${articles.length}件）｜動画配信サービス`,
    description: `動画配信サービスの${label}に関する記事を${articles.length}件まとめています。U-NEXT・Netflix・Amazon Prime Videoなど主要VODの${label}情報をチェック。`,
    openGraph: {
      title: `${label}の記事一覧`,
      description: `動画配信サービスの${label}に関する記事を${articles.length}件まとめています。`,
      type: 'website',
      siteName: '動画配信ナビ',
      locale: 'ja_JP',
    },
    alternates: { canonical: `${BASE_URL}/category/${slug}/` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const label = CATEGORY_LABELS[slug as ServiceCategory];
  if (!label) notFound();

  const articles = getArticlesByCategory(slug);
  const allCategories = Object.entries(CATEGORY_LABELS) as [ServiceCategory, string][];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', url: `${BASE_URL}/` },
          { name: label },
        ]}
      />

      <nav className="text-xs text-slate-500 mb-6 flex items-center gap-1">
        <Link href="/" className="hover:text-purple-600 transition-colors">ホーム</Link>
        <span>/</span>
        <span className="text-slate-400">{label}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-2xl font-black text-slate-900 mb-2">{label}の記事一覧</h1>
          <p className="text-sm text-slate-500 mb-4">
            動画配信サービスの{label}に関する記事が{articles.length}件あります。
          </p>

          {/* Category navigation */}
          <div className="flex flex-wrap gap-2 mb-6">
            {allCategories.map(([key, catLabel]) => (
              <Link
                key={key}
                href={`/category/${key}/`}
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition-opacity hover:opacity-80 ${
                  key === slug ? CATEGORY_COLORS[key] + ' ring-1 ring-offset-1' : CATEGORY_COLORS[key]
                }`}
              >
                {catLabel}
              </Link>
            ))}
          </div>

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
              <p className="text-4xl mb-3">📝</p>
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
