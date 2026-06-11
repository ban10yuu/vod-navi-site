import Link from 'next/link';
import { getPaginatedArticles, getAllTags, getAllArticles } from '@/lib/articles';
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

  // 料金順にソート（安い順）
  const sortedServices = [...serviceList].sort((a, b) => {
    const priceA = a.monthlyPrice || 0;
    const priceB = b.monthlyPrice || 0;
    return priceA - priceB;
  });

  return (
    <>
      {/* Hero — シネマティック・シアター */}
      <section className="theater-hero py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <p className="font-display text-xs md:text-sm font-semibold tracking-[0.35em] text-amber-400/90 uppercase mb-4">
            Streaming Guide 2026
          </p>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
            動画配信サービス
            <span className="text-amber-400 drop-shadow-[0_0_18px_rgba(245,185,65,0.45)]">20社</span>
            の料金比較
          </h1>
          <p className="text-sm md:text-base text-slate-400 max-w-xl leading-relaxed">
            月額料金・無料体験・作品ジャンルを一覧比較。あなたに合ったVODが見つかります。
          </p>
          <div className="mt-6 h-px w-40 bg-gradient-to-r from-amber-400/80 to-transparent" />
        </div>
      </section>

      {/* === 主役: 料金比較テーブル === */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="font-bold text-base text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-4 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,185,65,0.6)]" />
          月額料金で比較する
        </h2>
        <div className="overflow-x-auto md:overflow-visible -mx-4 px-4">
          <table className="vod-table w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-amber-400/30">
                <th className="text-left py-2.5 pr-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">サービス</th>
                <th className="text-right py-2.5 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">月額料金</th>
                <th className="text-center py-2.5 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">無料体験</th>
                <th className="text-left py-2.5 pl-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:table-cell">ジャンル</th>
                <th className="py-2.5 pl-3 hidden md:table-cell"></th>
              </tr>
            </thead>
            <tbody>
              {sortedServices.map((s, i) => (
                <tr key={s.slug} className={`border-b border-white/[0.06] hover:bg-amber-400/[0.06] transition-colors ${i < 3 ? 'bg-amber-400/[0.04]' : ''}`}>
                  <td className="py-3 pr-4">
                    <Link href={`/service/${s.slug}/`} className="flex items-center gap-2.5 group">
                      <ServiceIcon slug={s.slug} size="xs" />
                      <span className="font-semibold text-slate-100 group-hover:text-amber-300 transition-colors whitespace-nowrap">
                        {s.title}
                      </span>
                    </Link>
                  </td>
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    {s.monthlyPrice > 0 ? (
                      <span className="font-display font-bold text-lg text-amber-300 tabular-nums">
                        {s.monthlyPrice.toLocaleString()}
                        <span className="font-sans text-xs font-normal text-slate-500 ml-0.5">円/月</span>
                      </span>
                    ) : (
                      <span className="font-bold text-emerald-400">無料</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    {s.freeTrialDays > 0 ? (
                      <span className="text-sm font-semibold text-amber-300/90">{s.freeTrialDays}日間</span>
                    ) : (
                      <span className="text-xs text-slate-600">-</span>
                    )}
                  </td>
                  <td className="py-3 pl-3 hidden sm:table-cell">
                    <span className="text-xs text-slate-400 line-clamp-1">
                      {s.genre.slice(0, 3).join(' / ')}
                    </span>
                  </td>
                  <td className="py-3 pl-3 hidden md:table-cell">
                    <Link
                      href={`/service/${s.slug}/`}
                      className="text-xs text-amber-400 hover:text-amber-200 font-semibold whitespace-nowrap transition-colors"
                    >
                      詳しく見る
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4">
        <GoogleAd />
      </div>

      {/* キャンペーン（あれば） */}
      {campaigns.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 mt-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-base text-white flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,185,65,0.6)]" />
              開催中のキャンペーン
            </h2>
            <Link href="/campaigns/" className="text-xs text-amber-400 hover:text-amber-200 font-medium transition-colors">
              すべて見る
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {campaigns.map(c => (
              <CampaignBanner key={c.slug} campaign={c} />
            ))}
          </div>
        </section>
      )}

      {/* カテゴリ — コンパクトなチップ */}
      <section className="max-w-5xl mx-auto px-4 mt-10">
        <h2 className="font-bold text-base text-white mb-3 flex items-center gap-2">
          <span className="w-1 h-4 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,185,65,0.6)]" />
          目的から探す
        </h2>
        <div className="flex flex-wrap gap-2">
          {categories.map(([key, label]) => (
            <Link
              key={key}
              href={`/category/${key}/`}
              className={`text-sm font-semibold px-4 py-2 rounded-lg border transition-all hover:-translate-y-0.5 ${CATEGORY_COLORS[key]}`}
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* メインコンテンツ + サイドバー */}
      <section className="max-w-5xl mx-auto px-4 mt-10 pb-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            {/* 注目記事（大きめに3つ） */}
            {heroArticles.length > 0 && (
              <div className="mb-8">
                <h2 className="font-bold text-base text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,185,65,0.6)]" />
                  注目の記事
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {heroArticles.map(a => (
                    <ArticleCard key={a.slug} article={a} />
                  ))}
                </div>
              </div>
            )}

            <div className="max-w-5xl mx-auto">
              <GoogleAd />
            </div>

            {/* 最新記事 */}
            <h2 className="font-bold text-base text-white mb-4 mt-6 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,185,65,0.6)]" />
              最新記事
            </h2>
            {gridArticles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {gridArticles.map(a => (
                    <ArticleCard key={a.slug} article={a} />
                  ))}
                </div>
                <div className="my-6">
                  <GoogleAd />
                </div>
                <Pagination currentPage={1} totalPages={totalPages} />
                <p className="text-center text-xs text-slate-500 mt-2">
                  全{totalArticles}件
                </p>
              </>
            ) : (
              <div className="text-center py-12 text-slate-500">
                <p className="font-semibold text-slate-400">記事を準備中です</p>
                <p className="text-sm mt-1">毎日新しい記事が公開されます。</p>
              </div>
            )}
          </div>

          <div className="lg:w-64 flex-shrink-0">
            <Sidebar />
          </div>
        </div>
      </section>
    </>
  );
}
