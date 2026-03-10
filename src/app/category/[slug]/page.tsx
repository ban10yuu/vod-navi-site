import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CATEGORY_LABELS, ServiceCategory } from '@/lib/types';
import { getArticlesByCategory } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';
import GoogleAd from '@/components/GoogleAd';
import Sidebar from '@/components/Sidebar';

const categories = Object.keys(CATEGORY_LABELS) as ServiceCategory[];

export async function generateStaticParams() {
  return categories.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const label = CATEGORY_LABELS[slug as ServiceCategory];
  if (!label) return {};
  return {
    title: `${label}の記事一覧`,
    description: `動画配信サービスの${label}に関する記事をまとめています。`,
    alternates: { canonical: `https://vod-navi-site.vercel.app/category/${slug}/` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const label = CATEGORY_LABELS[slug as ServiceCategory];
  if (!label) notFound();

  const articles = getArticlesByCategory(slug);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <nav className="text-xs text-slate-500 mb-6 flex items-center gap-1">
        <Link href="/" className="hover:text-purple-600 transition-colors">ホーム</Link>
        <span>/</span>
        <span className="text-slate-400">{label}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-2xl font-black text-slate-900 mb-6">{label}の記事一覧</h1>

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
