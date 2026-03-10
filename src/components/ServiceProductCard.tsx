import { ServiceInfo } from '@/lib/types';
import { getCampaignsByService } from '@/data/campaigns';
import ServiceIcon from '@/components/ServiceIcon';

export default function ServiceProductCard({ service }: { service: ServiceInfo }) {
  const campaigns = getCampaignsByService(service.slug);

  return (
    <div className="my-10 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden" style={{ borderLeftWidth: '4px', borderLeftColor: service.color }}>
      {/* Header with service color */}
      <div className="border-b border-gray-200 px-5 py-3 flex items-center gap-3">
        <ServiceIcon slug={service.slug} size="sm" />
        <h3 className="font-black text-slate-900 text-base">{service.title}</h3>
        <span className="text-xs bg-gray-100 text-slate-600 px-2 py-0.5 rounded-full">
          {service.type === 'free' ? '無料' : service.type === 'freemium' ? 'フリーミアム' : 'サブスクリプション'}
        </span>
      </div>

      <div className="p-5">
        {/* Price & trial */}
        <div className="flex items-end gap-3 mb-4">
          {service.monthlyPrice > 0 ? (
            <div className="text-2xl font-black text-purple-600">
              <span className="text-sm font-bold text-slate-600">月額 </span>
              {service.monthlyPrice.toLocaleString()}
              <span className="text-sm font-bold text-slate-600">円</span>
              <span className="text-xs font-normal text-slate-400 ml-1">（税込）</span>
            </div>
          ) : (
            <div className="text-2xl font-black text-purple-600">
              無料
            </div>
          )}
          {service.freeTrialDays > 0 && (
            <span className="text-xs font-bold bg-purple-50 text-purple-600 border border-purple-200 px-2 py-1 rounded-lg mb-1">
              {service.freeTrialDays}日間無料
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 mb-4 leading-relaxed">{service.description}</p>

        {/* Genre tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {service.genre.map(g => (
            <span key={g} className="text-[11px] px-2.5 py-1 bg-gray-100 text-slate-600 rounded-full font-medium">
              {g}
            </span>
          ))}
        </div>

        {/* Campaign info */}
        {campaigns.length > 0 && (
          <div className="mb-5 space-y-2">
            {campaigns.slice(0, 2).map(c => (
              <div key={c.slug} className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                <div className="flex items-center gap-2 mb-1">
                  {c.badge && (
                    <span className="text-[9px] font-bold bg-amber-100 text-amber-700 border border-amber-300 px-1.5 py-0.5 rounded">
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

        {/* CTA button */}
        <a
          href={service.officialUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="block w-full text-center font-bold text-sm text-white py-3.5 rounded-lg transition-all hover:brightness-110 hover:scale-[1.02] shadow-md"
          style={{
            backgroundColor: service.color,
            boxShadow: `0 4px 14px ${service.color}30`,
          }}
        >
          {service.freeTrialDays > 0 ? `${service.freeTrialDays}日間無料で試す` : `${service.title}公式サイトへ`}
          <svg className="inline w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      <p className="text-[9px] text-slate-400 text-center pb-3">
        ※ 当サイトはアフィリエイトプログラムに参加しています
      </p>
    </div>
  );
}
