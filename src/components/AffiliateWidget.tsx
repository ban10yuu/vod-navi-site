import { ServiceInfo } from '@/lib/types';
import { getAffiliateLinks, MOSHIMO_IMPRESSION_URL } from '@/data/affiliates';
import { getCampaignsByService } from '@/data/campaigns';
import ServiceIcon from '@/components/ServiceIcon';

export default function AffiliateWidget({ service }: { service: ServiceInfo }) {
  const links = getAffiliateLinks(service);
  const campaigns = getCampaignsByService(service.slug);

  return (
    <div className="bg-gradient-to-r from-purple-50 to-cyan-50 rounded-xl border border-gray-200 p-5 md:p-6 my-8">
      <div className="flex items-start gap-4 mb-4">
        <ServiceIcon slug={service.slug} size="lg" />
        <div>
          <h3 className="text-base font-black text-purple-600">
            {service.title}を始めるなら
          </h3>
          <p className="text-xs text-slate-600">
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
            <div key={c.slug} className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-1">
                {c.badge && (
                  <span className="text-[9px] font-bold bg-amber-50 text-amber-600 border border-amber-200 px-1.5 py-0.5 rounded">
                    {c.badge}
                  </span>
                )}
                <span className="text-xs font-bold text-slate-900">{c.title}</span>
              </div>
              <p className="text-[11px] text-slate-600">{c.description}</p>
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
            className="block w-full text-center font-bold text-sm text-white py-3 rounded-lg transition-all hover:brightness-110 hover:scale-[1.02] shadow-md"
            style={{
              backgroundColor: service.color,
              boxShadow: `0 3px 10px ${service.color}30`,
            }}
          >
            {link.badge ? `${link.label}` : `${service.title}公式サイトへ`}
            <svg className="inline w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        ))}
      </div>

      <p className="text-[10px] text-slate-400 mt-4 text-center">
        ※ 当サイトはアフィリエイトプログラムに参加しています
      </p>

      {/* もしもアフィリエイト インプレッショントラッキング */}
      {links.some(l => l.moshimo) && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={MOSHIMO_IMPRESSION_URL} width={1} height={1} style={{ border: 'none' }} alt="" loading="lazy" />
      )}
    </div>
  );
}
