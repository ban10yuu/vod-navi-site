import { ServiceInfo } from '@/lib/types';
import { getAffiliateLinks } from '@/data/affiliates';
import { getCampaignsByService } from '@/data/campaigns';

export default function AffiliateWidget({ service }: { service: ServiceInfo }) {
  const links = getAffiliateLinks(service);
  const campaigns = getCampaignsByService(service.slug);

  return (
    <div className="vod-card !border-[#7c3aed]/40 p-5 md:p-6 my-8">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 text-2xl" style={{ backgroundColor: service.color + '20' }}>
          🎬
        </div>
        <div>
          <h3 className="text-base font-black text-[#7c3aed]">
            {service.title}を始めるなら
          </h3>
          <p className="text-xs text-gray-500">
            {service.freeTrialDays > 0
              ? `${service.freeTrialDays}日間無料でお試しできます`
              : '今すぐ登録して視聴開始'}
          </p>
        </div>
      </div>

      {/* Active campaigns */}
      {campaigns.length > 0 && (
        <div className="mb-4 space-y-2">
          {campaigns.map(c => (
            <div key={c.slug} className="bg-[#1a1a28] rounded-lg p-3 border border-[#252535]">
              <div className="flex items-center gap-2 mb-1">
                {c.badge && <span className="campaign-badge">{c.badge}</span>}
                <span className="text-xs font-bold text-white">{c.title}</span>
              </div>
              <p className="text-[11px] text-gray-500">{c.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Affiliate links */}
      <div className="space-y-2">
        {links.map(link => (
          <a
            key={link.service}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="block w-full text-center font-bold text-sm text-white py-3 rounded-lg transition-all hover:brightness-110 hover:scale-[1.02]"
            style={{
              backgroundColor: service.color,
              boxShadow: `0 2px 8px ${service.color}40`,
            }}
          >
            {link.badge ? `${link.label}` : `${service.title}公式サイトへ`}
            <svg className="inline w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        ))}
      </div>

      <p className="text-[10px] text-gray-600 mt-4 text-center">
        ※ 当サイトはアフィリエイトプログラムに参加しています
      </p>
    </div>
  );
}
