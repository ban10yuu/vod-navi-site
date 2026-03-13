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
      {/* Hero — シンプルに要点だけ */}
      <section className="bg-white border-b border-gray-200 py-8 md:py-10">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
            動画配信サービス<span className="text-purple-600">20社</span>の料金比較
          </h1>
          <p className="text-sm text-slate-500 max-w-xl leading-relaxed">
            月額料金・無料体験・作品ジャンルを一覧比較。あなたに合ったVODが見つかります。
          </p>
        </div>
      </section>

      {/* === 主役: 料金比較テーブル === */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="font-bold text-base text-slate-900 mb-4">
          月額料金で比較する
        </h2>
        <div className="overflow-x-auto -mx-4 px-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-purple-200">
                <th className="text-left py-2.5 pr-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">サービス</th>
                <th className="text-right py-2.5 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">月額料金</th>
                <th className="text-center py-2.5 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">無料体験</th>
                <th className="text-left py-2.5 pl-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">ジャンル</th>
                <th className="py-2.5 pl-3 hidden md:table-cell"></th>
              </tr>
            </thead>
            <tbody>
              {sortedServices.map((s, i) => (
                <tr key={s.slug} className={`border-b border-gray-100 hover:bg-purple-50/30 transition-colors ${i < 3 ? 'bg-purple-50/20' : ''}`}>
                  <td className="py-3 pr-4">
                    <Link href={`/service/${s.slug}/`} className="flex items-center gap-2.5 group">
                      <ServiceIcon slug={s.slug} size="xs" />
                      <span className="font-semibold text-slate-800 group-hover:text-purple-600 transition-colors whitespace-nowrap">
                        {s.title}
                      </span>
                    </Link>
                  </td>
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    {s.monthlyPrice > 0 ? (
                      <span className="font-black text-lg text-slate-900 tabular-nums">
                        {s.monthlyPrice.toLocaleString()}
                        <span className="text-xs font-normal text-slate-400 ml-0.5">円/月</span>
                      </span>
                    ) : (
                      <span className="font-bold text-emerald-600">無料</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    {s.freeTrialDays > 0 ? (
                      <span className="text-sm font-semibold text-purple-600">{s.freeTrialDays}日間</span>
                    ) : (
                      <span className="text-xs text-slate-300">-</span>
                    )}
                  </td>
                  <td className="py-3 pl-3 hidden sm:table-cell">
                    <span className="text-xs text-slate-500 line-clamp-1">
                      {s.genre.slice(0, 3).join(' / ')}
                    </span>
                  </td>
                  <td className="py-3 pl-3 hidden md:table-cell">
                    <Link
                      href={`/service/${s.slug}/`}
                      className="text-xs text-purple-600 hover:text-purple-800 font-semibold whitespace-nowrap"
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
            <h2 className="font-bold text-base text-slate-900">開催中のキャンペーン</h2>
            <Link href="/campaigns/" className="text-xs text-purple-600 hover:text-purple-700 font-medium">
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
        <h2 className="font-bold text-base text-slate-900 mb-3">目的から探す</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map(([key, label]) => (
            <Link
              key={key}
              href={`/category/${key}/`}
              className={`text-sm font-semibold px-4 py-2 rounded-lg border transition-colors ${CATEGORY_COLORS[key]}`}
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
                <h2 className="font-bold text-base text-slate-900 mb-4">注目の記事</h2>
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
            <h2 className="font-bold text-base text-slate-900 mb-4 mt-6">最新記事</h2>
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
                <p className="text-center text-xs text-slate-400 mt-2">
                  全{totalArticles}件
                </p>
              </>
            ) : (
              <div className="text-center py-12 text-slate-400">
                <p className="font-semibold text-slate-500">記事を準備中です</p>
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
