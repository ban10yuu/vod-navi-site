import Link from 'next/link';
import { getPaginatedArticles, getAllTags } from '@/lib/articles';
import { serviceList } from '@/data/services';
import { getActiveCampaigns } from '@/data/campaigns';
import { CATEGORY_LABELS, CATEGORY_COLORS, ServiceCategory } from '@/lib/types';
import ArticleCard from '@/components/ArticleCard';
import AdBanner from '@/components/AdBanner';
import GoogleAd from '@/components/GoogleAd';
import Sidebar from '@/components/Sidebar';
import CampaignBanner from '@/components/CampaignBanner';
import Pagination from '@/components/Pagination';
import ServiceIcon from '@/components/ServiceIcon';

export default function Home() {
  const { articles, totalPages, totalArticles } = getPaginatedArticles(1);
  const heroArticles = articles.slice(0, 3);
  const gridArticles = articles.slice(3);
  const campaigns = getActiveCampaigns().slice(0, 4);
  const categories = Object.entries(CATEGORY_LABELS) as [ServiceCategory, string][];
  const popularTags = getAllTags().slice(0, 20);

  return (
    <>
      {/* Hero section */}
      <section className="relative bg-gray-50 py-12 md:py-16 overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
              <span className="text-purple-600">動画配信サービス</span>比較・おすすめランキング 2026
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
              U-NEXT・Netflix・Amazon Prime Video・Disney+・Hulu・DMM TVなどVODサービス20社を徹底比較。料金・無料体験・おすすめ作品・キャンペーン情報を毎日更新。あなたにぴったりの動画配信サービスが見つかるナビゲーションサイト。
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

      {/* Ad after hero */}
      <div className="max-w-6xl mx-auto px-4 my-6">
        <GoogleAd />
      </div>

      {/* Service tags bar */}
      <section className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {serviceList.map(s => (
              <Link
                key={s.slug}
                href={`/service/${s.slug}/`}
                className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-slate-600 hover:text-purple-600 hover:border-purple-300 hover:bg-purple-50 transition-colors flex-shrink-0 flex items-center gap-1.5"
              >
                <ServiceIcon color={s.color} title={s.title} size="xs" />
                {s.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All services comparison grid */}
      <section className="max-w-6xl mx-auto px-4 mt-8">
        <h2 className="font-black text-lg text-slate-900 mb-4 flex items-center gap-2">
          <span className="text-purple-600">●</span> VODサービス20社を比較
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {serviceList.map(s => (
            <Link
              key={s.slug}
              href={`/service/${s.slug}/`}
              className="bg-white rounded-xl border border-gray-200 p-3 hover:border-purple-200 transition-colors group text-center"
            >
              <ServiceIcon slug={s.slug} size="sm" />
              <p className="text-xs font-bold text-slate-900 group-hover:text-purple-600 transition-colors mt-1.5 truncate">
                {s.title}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {s.monthlyPrice > 0 ? `月額${s.monthlyPrice.toLocaleString()}円` : '無料'}
              </p>
              {s.freeTrialDays > 0 && (
                <span className="inline-block text-[9px] bg-purple-50 text-purple-600 font-semibold mt-1 px-1.5 py-0.5 rounded">
                  {s.freeTrialDays}日無料
                </span>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* Campaigns */}
      {campaigns.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 mt-8">
          <div className="bg-purple-50/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-black text-lg text-slate-900 flex items-center gap-2">
                <span className="text-purple-600">●</span> キャンペーン情報
              </h2>
              <Link href="/campaigns/" className="text-xs text-purple-600 hover:text-purple-700 transition-colors">
                すべて見る →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {campaigns.map(c => (
                <CampaignBanner key={c.slug} campaign={c} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ad after campaigns */}
      <div className="max-w-6xl mx-auto px-4 mt-6">
        <GoogleAd />
      </div>

      {/* Category section */}
      <section className="max-w-6xl mx-auto px-4 mt-8">
        <h2 className="font-black text-lg text-slate-900 mb-4 flex items-center gap-2">
          <span className="text-cyan-500">●</span> カテゴリから探す
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {categories.map(([key, label]) => (
            <Link
              key={key}
              href={`/category/${key}/`}
              className={`rounded-xl border p-3 text-center transition-colors ${CATEGORY_COLORS[key]}`}
            >
              <p className="text-sm font-bold">{label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular tags */}
      {popularTags.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 mt-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-black text-lg text-slate-900 flex items-center gap-2">
              <span className="text-amber-500">●</span> 人気タグ
            </h2>
            <Link href="/tags/" className="text-xs text-purple-600 hover:text-purple-700 transition-colors">
              すべてのタグ →
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularTags.map(t => (
              <Link
                key={t.slug}
                href={`/tag/${t.slug}/`}
                className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-slate-600 hover:text-purple-600 hover:border-purple-300 hover:bg-purple-50 transition-colors"
              >
                #{t.tag} ({t.count})
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Main content + Sidebar */}
      <section className="max-w-6xl mx-auto px-4 mt-10 pb-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Articles grid */}
          <div className="flex-1">
            <h2 className="font-black text-lg text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-purple-600">●</span> 最新記事
            </h2>
            {gridArticles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {gridArticles.map((a, i) => (
                    <ArticleCard key={a.slug} article={a} />
                  ))}
                </div>
                <AdBanner size="full" />
                <div className="my-6">
                  <GoogleAd />
                </div>
                <Pagination currentPage={1} totalPages={totalPages} />
                <p className="text-center text-xs text-slate-400 mt-3">
                  全{totalArticles}件の記事
                </p>
              </>
            ) : (
              <div className="text-center py-16 text-slate-400">
                <p className="text-5xl mb-4">🎬</p>
                <p className="font-bold text-slate-600">記事を準備中です</p>
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
