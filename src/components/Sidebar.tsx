import Link from 'next/link';
import { getPopularArticles } from '@/lib/articles';
import { getActiveCampaigns } from '@/data/campaigns';
import { getServiceBySlug } from '@/data/services';
import { MOSHIMO_IMPRESSION_URL } from '@/data/affiliates';
import AdBanner from './AdBanner';
import GoogleAd from '@/components/GoogleAd';
import ServiceIcon from '@/components/ServiceIcon';

export default function Sidebar() {
  const popular = getPopularArticles(8);
  const campaigns = getActiveCampaigns().slice(0, 3);

  return (
    <aside className="space-y-5">
      <AdBanner size="medium" />

      {/* キャンペーン（最大3件） */}
      {campaigns.length > 0 && (
        <div className="bg-[#121826] rounded-xl border border-white/[0.07] p-4">
          <h3 className="font-bold text-sm text-white mb-3 flex items-center gap-2">
            <span className="w-1 h-3.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,185,65,0.6)]" />
            キャンペーン
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
                  className="block p-2 rounded-lg hover:bg-amber-400/[0.07] transition-colors"
                >
                  <div className="flex items-center gap-2 mb-0.5">
                    {svc && <ServiceIcon slug={svc.slug} size="xs" />}
                    <span className="text-[10px] text-slate-500">{svc?.title}</span>
                  </div>
                  <p className="text-xs text-slate-200 font-semibold line-clamp-2">{c.title}</p>
                </a>
              );
            })}
          </div>
        </div>
      )}

      <GoogleAd format="rectangle" />

      {/* 人気記事 */}
      {popular.length > 0 && (
        <div className="bg-[#121826] rounded-xl border border-white/[0.07] p-4">
          <h3 className="font-bold text-sm text-white mb-3 flex items-center gap-2">
            <span className="w-1 h-3.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,185,65,0.6)]" />
            人気記事
          </h3>
          <div className="space-y-1.5">
            {popular.map((article, i) => (
              <Link
                key={article.slug}
                href={`/article/${article.slug}/`}
                className="flex items-start gap-2 group py-1"
              >
                <span
                  className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold shrink-0 ${
                    i < 3
                      ? 'bg-gradient-to-br from-amber-300 to-amber-500 text-[#1c1305] shadow-[0_0_8px_rgba(245,185,65,0.4)]'
                      : 'bg-white/[0.07] text-slate-400'
                  }`}
                >
                  {i + 1}
                </span>
                <span className="text-xs text-slate-300 group-hover:text-amber-300 transition-colors leading-snug line-clamp-2">
                  {article.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <GoogleAd format="rectangle" />

      {/* もしもアフィリエイト インプレッショントラッキング */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={MOSHIMO_IMPRESSION_URL} width={1} height={1} style={{ border: 'none' }} alt="" loading="lazy" />
    </aside>
  );
}
