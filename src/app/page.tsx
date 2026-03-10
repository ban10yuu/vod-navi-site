import Link from 'next/link';
import { getAllArticles } from '@/lib/articles';
import { serviceList } from '@/data/services';
import { getActiveCampaigns } from '@/data/campaigns';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import CampaignBanner from '@/components/CampaignBanner';

export default function Home() {
  const articles = getAllArticles();
  const heroArticles = articles.slice(0, 3);
  const gridArticles = articles.slice(3);
  const campaigns = getActiveCampaigns().slice(0, 4);

  return (
    <>
      {/* Hero section */}
      <section className="relative bg-gradient-to-b from-[#12121e] to-[#0a0a14] py-12 md:py-16 overflow-hidden">
        <div className="cinema-lines" />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
              <span className="text-[#7c3aed]">動画配信</span>ナビ
            </h1>
            <p className="text-sm text-gray-500 max-w-lg mx-auto">
              VODサービス20社を徹底比較。料金・無料体験・おすすめ作品・キャンペーン情報を毎日更新。
            </p>
          </div>

          {/* Hero articles */}
          {heroArticles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {heroArticles.map(a => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Service tags bar */}
      <section className="border-b border-[#252535] bg-[#0a0a14]">
        <div className="max-w-6xl mx-auto px-4 py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {serviceList.map(s => (
              <Link
                key={s.slug}
                href={`/service/${s.slug}/`}
                className="text-xs px-3 py-1.5 rounded-full border border-[#252535] text-gray-400 hover:text-white hover:border-[#7c3aed]/40 transition-colors flex-shrink-0"
              >
                {s.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Campaigns */}
      {campaigns.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-lg text-white flex items-center gap-2">
              <span className="text-[#06b6d4]">●</span> キャンペーン情報
            </h2>
            <Link href="/campaigns/" className="text-xs text-[#7c3aed] hover:text-[#06b6d4] transition-colors">
              すべて見る →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {campaigns.map(c => (
              <CampaignBanner key={c.slug} campaign={c} />
            ))}
          </div>
        </section>
      )}

      {/* Main content + Sidebar */}
      <section className="max-w-6xl mx-auto px-4 mt-10 pb-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Articles grid */}
          <div className="flex-1">
            <h2 className="font-black text-lg text-white mb-4 flex items-center gap-2">
              <span className="text-[#7c3aed]">●</span> 最新記事
            </h2>
            {gridArticles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {gridArticles.map(a => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-600">
                <p className="text-5xl mb-4">🎬</p>
                <p className="font-bold">記事を準備中です</p>
                <p className="text-sm mt-2">毎日新しい記事が公開されます。お楽しみに！</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-72 flex-shrink-0">
            <Sidebar />
          </div>
        </div>
      </section>
    </>
  );
}
