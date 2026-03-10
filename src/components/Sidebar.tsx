import Link from 'next/link';
import { getPopularArticles } from '@/lib/articles';
import { serviceList } from '@/data/services';
import { getActiveCampaigns } from '@/data/campaigns';
import { getServiceBySlug } from '@/data/services';
import AdBanner from './AdBanner';
import GoogleAd from '@/components/GoogleAd';
import ServiceIcon from '@/components/ServiceIcon';

export default function Sidebar() {
  const popular = getPopularArticles(8);
  const campaigns = getActiveCampaigns().slice(0, 3);

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

      {/* Popular articles ranking */}
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
    </aside>
  );
}
