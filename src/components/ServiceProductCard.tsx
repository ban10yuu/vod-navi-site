import { ServiceInfo } from '@/lib/types';
import { getCampaignsByService } from '@/data/campaigns';

export default function ServiceProductCard({ service }: { service: ServiceInfo }) {
  const campaigns = getCampaignsByService(service.slug);

  return (
    <div className="my-10 bg-[#12121e] border-2 border-[#252535] rounded-lg overflow-hidden">
      {/* Header with service color */}
      <div className="border-b border-[#252535] px-4 py-3 flex items-center gap-2" style={{ borderLeftColor: service.color, borderLeftWidth: '4px' }}>
        <h3 className="font-black text-white text-base">{service.title}</h3>
        <span className="text-xs text-gray-500">
          {service.type === 'free' ? '無料' : service.type === 'freemium' ? 'フリーミアム' : 'サブスクリプション'}
        </span>
      </div>

      <div className="p-5">
        {/* Price & trial */}
        <div className="flex items-end gap-3 mb-4">
          {service.monthlyPrice > 0 ? (
            <div className="price-tag">
              <span className="yen">月額 </span>
              {service.monthlyPrice.toLocaleString()}
              <span className="yen">円</span>
              <span className="period">（税込）</span>
            </div>
          ) : (
            <div className="price-tag">
              無料
            </div>
          )}
          {service.freeTrialDays > 0 && (
            <span className="campaign-badge mb-1">{service.freeTrialDays}日間無料</span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 mb-4 leading-relaxed">{service.description}</p>

        {/* Genre tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {service.genre.map(g => (
            <span key={g} className="text-[11px] px-2 py-0.5 bg-[#1a1a28] text-gray-400 rounded-full border border-[#252535]">
              {g}
            </span>
          ))}
        </div>

        {/* Campaign info */}
        {campaigns.length > 0 && (
          <div className="mb-5 space-y-2">
            {campaigns.slice(0, 2).map(c => (
              <div key={c.slug} className="bg-[#0a0a14] rounded-lg p-3 border border-[#252535]">
                <div className="flex items-center gap-2 mb-1">
                  {c.badge && <span className="campaign-badge">{c.badge}</span>}
                  <span className="text-xs font-bold text-white">{c.title}</span>
                </div>
                <p className="text-[11px] text-gray-500">{c.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* CTA button */}
        <a
          href={service.officialUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="block w-full text-center font-bold text-sm text-white py-3.5 rounded-lg transition-all hover:brightness-110 hover:scale-[1.02]"
          style={{
            backgroundColor: service.color,
            boxShadow: `0 3px 12px ${service.color}40`,
          }}
        >
          {service.freeTrialDays > 0 ? `${service.freeTrialDays}日間無料で試す` : `${service.title}公式サイトへ`}
          <svg className="inline w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      <p className="text-[9px] text-gray-600 text-center pb-3">
        ※ 当サイトはアフィリエイトプログラムに参加しています
      </p>
    </div>
  );
}
