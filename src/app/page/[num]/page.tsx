import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPaginatedArticles, ARTICLES_PER_PAGE, getAllArticles } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';
import AdBanner from '@/components/AdBanner';
import GoogleAd from '@/components/GoogleAd';
import Sidebar from '@/components/Sidebar';
import Pagination from '@/components/Pagination';

export const dynamicParams = false;

export async function generateStaticParams() {
  const total = getAllArticles().length;
  const totalPages = Math.ceil(total / ARTICLES_PER_PAGE);
  // Page 1 is handled by the home page (/), so start from 2
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    num: String(i + 2),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ num: string }> }): Promise<Metadata> {
  const { num } = await params;
  const page = parseInt(num, 10);
  return {
    title: `記事一覧 (${page}ページ目)`,
    description: `動画配信サービスに関する記事一覧の${page}ページ目です。`,
    alternates: { canonical: `https://vod-navi-site.vercel.app/page/${page}/` },
  };
}

export default async function PaginatedPage({ params }: { params: Promise<{ num: string }> }) {
  const { num } = await params;
  const page = parseInt(num, 10);

  if (isNaN(page) || page < 2) notFound();

  const { articles, totalPages, totalArticles } = getPaginatedArticles(page);

  if (page > totalPages || articles.length === 0) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 mb-6 flex items-center gap-1">
        <Link href="/" className="hover:text-purple-600 transition-colors">ホーム</Link>
        <span>/</span>
        <span className="text-slate-400">記事一覧 ({page}ページ目)</span>
      </nav>

      {/* Ad after breadcrumb */}
      <div className="mb-6">
        <GoogleAd />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h1 className="font-black text-lg text-slate-900 mb-4 flex items-center gap-2">
            <span className="text-purple-600">●</span> 最新記事
            <span className="text-sm font-normal text-slate-400 ml-2">{page} / {totalPages} ページ</span>
          </h1>

          <AdBanner size="medium" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {articles.map((a, i) => (
              <>
                <ArticleCard key={a.slug} article={a} />
                {/* 5記事ごとに広告を挿入（グリッド2列なので偶数位置で） */}
                {i === 4 && <div key="ad-mid" className="sm:col-span-2"><AdBanner size="full" /><div className="mt-4"><GoogleAd /></div></div>}
              </>
            ))}
          </div>

          <AdBanner size="full" />
          <div className="my-6">
            <GoogleAd />
          </div>

          <Pagination currentPage={page} totalPages={totalPages} />
          <p className="text-center text-xs text-slate-400 mt-3">
            全{totalArticles}件の記事
          </p>
        </div>

        <div className="lg:w-72 flex-shrink-0">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
