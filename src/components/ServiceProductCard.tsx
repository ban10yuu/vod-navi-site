import { ServiceInfo } from '@/lib/types';
import { getCampaignsByService } from '@/data/campaigns';
import { getMoshimoRakutenUrl, MOSHIMO_IMPRESSION_URL } from '@/data/affiliates';
import ServiceIcon from '@/components/ServiceIcon';

export default function ServiceProductCard({ service }: { service: ServiceInfo }) {
  const campaigns = getCampaignsByService(service.slug);
  const isMoshimo = service.slug === 'rakuten-tv';
  const ctaUrl = isMoshimo ? getMoshimoRakutenUrl(service.officialUrl) : service.officialUrl;

  return (
    <div className="my-10 poster-card" style={{ borderLeftWidth: '4px', borderLeftColor: service.color }}>
      {/* Header with service color */}
      <div className="border-b border-white/[0.07] px-5 py-3 flex items-center gap-3 bg-white/[0.02]">
        <ServiceIcon slug={service.slug} size="sm" />
        <h3 className="font-black text-white text-base">{service.title}</h3>
        <span className="text-xs bg-white/[0.07] text-slate-300 px-2 py-0.5 rounded-full">
          {service.type === 'free' ? '無料' : service.type === 'freemium' ? 'フリーミアム' : 'サブスクリプション'}
        </span>
      </div>

      <div className="p-5">
        {/* Price & trial */}
        <div className="flex items-end gap-3 mb-4">
          {service.monthlyPrice > 0 ? (
            <div className="text-2xl font-black text-amber-300">
              <span className="text-sm font-bold text-slate-400">月額 </span>
              <span className="font-display tabular-nums">{service.monthlyPrice.toLocaleString()}</span>
              <span className="text-sm font-bold text-slate-400">円</span>
              <span className="text-xs font-normal text-slate-500 ml-1">（税込）</span>
            </div>
          ) : (
            <div className="text-2xl font-black text-amber-300">
              無料
            </div>
          )}
          {service.freeTrialDays > 0 && (
            <span className="text-xs font-bold bg-amber-400/10 text-amber-300 border border-amber-400/30 px-2 py-1 rounded-lg mb-1">
              {service.freeTrialDays}日間無料
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-slate-300 mb-4 leading-relaxed">{service.description}</p>

        {/* Genre tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {service.genre.map(g => (
            <span key={g} className="text-[11px] px-2.5 py-1 bg-white/[0.06] text-slate-300 rounded-full font-medium">
              {g}
            </span>
          ))}
        </div>

        {/* Campaign info */}
        {campaigns.length > 0 && (
          <div className="mb-5 space-y-2">
            {campaigns.slice(0, 2).map(c => (
              <div key={c.slug} className="bg-amber-400/[0.07] rounded-lg p-3 border border-amber-400/25">
                <div className="flex items-center gap-2 mb-1">
                  {c.badge && (
                    <span className="text-[9px] font-bold bg-amber-400/15 text-amber-300 border border-amber-400/40 px-1.5 py-0.5 rounded">
                      {c.badge}
                    </span>
                  )}
                  <span className="text-xs font-bold text-slate-100">{c.title}</span>
                </div>
                <p className="text-[11px] text-slate-400">{c.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* CTA button */}
        <a
          href={ctaUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="btn-gold w-full text-sm py-3.5"
        >
          {service.freeTrialDays > 0 ? `${service.freeTrialDays}日間無料で試す` : `${service.title}公式サイトへ`}
          <svg className="inline w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </a>
        {/* もしもアフィリエイト インプレッショントラッキング */}
        {isMoshimo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={MOSHIMO_IMPRESSION_URL} width={1} height={1} style={{ border: 'none' }} alt="" loading="lazy" />
        )}
      </div>

      <p className="text-[9px] text-slate-500 text-center pb-3">
        ※ 当サイトはアフィリエイトプログラムに参加しています
      </p>
    </div>
  );
}
