import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CATEGORY_LABELS, ServiceCategory } from '@/lib/types';
import { getArticlesByCategory } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';
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
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const label = CATEGORY_LABELS[slug as ServiceCategory];
  if (!label) notFound();

  const articles = getArticlesByCategory(slug);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <nav className="text-xs text-gray-600 mb-6 flex items-center gap-1">
        <Link href="/" className="hover:text-[#7c3aed] transition-colors">ホーム</Link>
        <span>/</span>
        <span className="text-gray-500">{label}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-2xl font-black text-white mb-6">{label}の記事一覧</h1>

          {articles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {articles.map(a => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-600">
              <p className="text-4xl mb-3">📝</p>
              <p className="font-bold">記事を準備中です</p>
            </div>
          )}
        </div>

        <div className="lg:w-72 flex-shrink-0">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
