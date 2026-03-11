import Link from 'next/link';
import { getPopularArticles, getAllTags } from '@/lib/articles';
import { serviceList } from '@/data/services';
import { getActiveCampaigns } from '@/data/campaigns';
import { getServiceBySlug } from '@/data/services';
import { CATEGORY_LABELS, CATEGORY_COLORS, ServiceCategory } from '@/lib/types';
import { MOSHIMO_IMPRESSION_URL } from '@/data/affiliates';
import AdBanner from './AdBanner';
import GoogleAd from '@/components/GoogleAd';
import ServiceIcon from '@/components/ServiceIcon';

export default function Sidebar() {
  const popular = getPopularArticles(10);
  const campaigns = getActiveCampaigns().slice(0, 3);
  const categories = Object.entries(CATEGORY_LABELS) as [ServiceCategory, string][];
  const popularTags = getAllTags().slice(0, 12);

  return (
    <aside className="space-y-6">
      {/* Ad */}
      <AdBanner size="medium" />

      {/* Active campaigns */}
      {campaigns.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
            <span className="text-amber-500">●</span> キャンペーン情報
          </h3>
          <div className="space-y-2">
            {campaigns.map(c => {
              const svc = getServiceBySlug(c.serviceSlug);
              return (
                <a
                  key={c.slug}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="block p-2.5 rounded-lg hover:bg-gray-50 transition-colors border-l-3"
                  style={{ borderLeftColor: svc?.color ?? '#9333ea' }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {svc && <ServiceIcon slug={svc.slug} size="xs" />}
                    {c.badge && (
                      <span className="text-[9px] font-bold bg-amber-50 text-amber-600 border border-amber-200 px-1.5 py-0.5 rounded">
                        {c.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 font-bold">{c.title}</p>
                </a>
              );
            })}
          </div>
          <Link href="/campaigns/" className="block text-center text-xs text-purple-600 hover:text-purple-800 mt-3 font-semibold transition-colors">
            すべてのキャンペーンを見る →
          </Link>
        </div>
      )}

      {/* Ad between campaigns and popular articles */}
      <GoogleAd format="rectangle" />

      {/* Popular articles ranking (10 articles) */}
      {popular.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
            <span className="text-purple-600">●</span> 人気記事ランキング
          </h3>
          <div className="space-y-2">
            {popular.map((article, i) => (
              <Link
                key={article.slug}
                href={`/article/${article.slug}/`}
                className="flex items-start gap-2.5 group py-1.5"
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black shrink-0 ${
                    i === 0
                      ? 'bg-amber-400 text-white shadow-sm'
                      : i === 1
                        ? 'bg-gray-300 text-white shadow-sm'
                        : i === 2
                          ? 'bg-amber-600 text-white shadow-sm'
                          : 'bg-gray-100 text-slate-400'
                  }`}
                >
                  {i + 1}
                </span>
                <span className="text-xs text-slate-600 group-hover:text-purple-600 transition-colors leading-snug line-clamp-2">
                  {article.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Ad after popular articles */}
      <GoogleAd format="rectangle" />

      {/* Category links */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
          <span className="text-green-500">●</span> カテゴリ
        </h3>
        <div className="space-y-1.5">
          {categories.map(([key, label]) => (
            <Link
              key={key}
              href={`/category/${key}/`}
              className={`block text-xs font-bold px-3 py-1.5 rounded-lg border hover:opacity-80 transition-opacity ${CATEGORY_COLORS[key]}`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Popular tags */}
      {popularTags.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
            <span className="text-amber-500">●</span> 人気タグ
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {popularTags.map(t => (
              <Link
                key={t.slug}
                href={`/tag/${t.slug}/`}
                className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-slate-500 hover:text-purple-600 hover:bg-purple-50 transition-colors"
              >
                #{t.tag}
              </Link>
            ))}
          </div>
          <Link href="/tags/" className="block text-center text-xs text-purple-600 hover:text-purple-800 mt-3 font-semibold transition-colors">
            すべてのタグを見る →
          </Link>
        </div>
      )}

      {/* All services */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
          <span className="text-cyan-500">●</span> サービス一覧
        </h3>
        <div className="space-y-1">
          {serviceList.map(s => (
            <Link
              key={s.slug}
              href={`/service/${s.slug}/`}
              className="flex items-center gap-2.5 py-1.5 group"
            >
              <ServiceIcon slug={s.slug} size="xs" />
              <span className="text-xs text-slate-600 group-hover:text-purple-600 transition-colors font-medium">{s.title}</span>
              {s.freeTrialDays > 0 && (
                <span className="text-[9px] bg-purple-50 text-purple-600 font-semibold ml-auto px-1.5 py-0.5 rounded">
                  {s.freeTrialDays}日無料
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Ad at bottom of sidebar */}
      <GoogleAd format="rectangle" />

      {/* もしもアフィリエイト インプレッショントラッキング（全ページ共通） */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={MOSHIMO_IMPRESSION_URL} width={1} height={1} style={{ border: 'none' }} alt="" loading="lazy" />
    </aside>
  );
}
