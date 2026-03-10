import Link from 'next/link';
import { getPopularArticles } from '@/lib/articles';
import { serviceList } from '@/data/services';
import { getActiveCampaigns } from '@/data/campaigns';
import AdBanner from './AdBanner';

export default function Sidebar() {
  const popular = getPopularArticles(8);
  const campaigns = getActiveCampaigns().slice(0, 3);

  return (
    <aside className="space-y-6">
      {/* Ad */}
      <AdBanner size="medium" />

      {/* Active campaigns */}
      {campaigns.length > 0 && (
        <div className="bg-[#12121e] border border-[#252535] rounded-lg p-4">
          <h3 className="font-black text-sm text-white mb-3 flex items-center gap-2">
            <span className="text-[#06b6d4]">●</span> キャンペーン情報
          </h3>
          <div className="space-y-2">
            {campaigns.map(c => (
              <a
                key={c.slug}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="block p-2 rounded-lg hover:bg-[#1a1a28] transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  {c.badge && <span className="campaign-badge text-[8px]">{c.badge}</span>}
                </div>
                <p className="text-xs text-gray-400 font-bold">{c.title}</p>
              </a>
            ))}
          </div>
          <Link href="/campaigns/" className="block text-center text-xs text-[#7c3aed] hover:text-[#06b6d4] mt-3 transition-colors">
            すべてのキャンペーンを見る →
          </Link>
        </div>
      )}

      {/* Popular articles ranking */}
      {popular.length > 0 && (
        <div className="bg-[#12121e] border border-[#252535] rounded-lg p-4">
          <h3 className="font-black text-sm text-white mb-3 flex items-center gap-2">
            <span className="text-[#7c3aed]">●</span> 人気記事ランキング
          </h3>
          <div className="space-y-2">
            {popular.map((article, i) => (
              <Link
                key={article.slug}
                href={`/article/${article.slug}/`}
                className="flex items-start gap-2.5 group py-1"
              >
                <span className={`rank-badge ${i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : 'rank-other'}`}>
                  {i + 1}
                </span>
                <span className="text-xs text-gray-400 group-hover:text-white transition-colors leading-snug line-clamp-2">
                  {article.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* All services */}
      <div className="bg-[#12121e] border border-[#252535] rounded-lg p-4">
        <h3 className="font-black text-sm text-white mb-3 flex items-center gap-2">
          <span className="text-[#06b6d4]">●</span> サービス一覧
        </h3>
        <div className="space-y-1">
          {serviceList.map(s => (
            <Link
              key={s.slug}
              href={`/service/${s.slug}/`}
              className="flex items-center gap-2 py-1 group"
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
              <span className="text-xs text-gray-400 group-hover:text-white transition-colors">{s.title}</span>
              {s.freeTrialDays > 0 && (
                <span className="text-[9px] text-[#06b6d4] ml-auto">{s.freeTrialDays}日無料</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
