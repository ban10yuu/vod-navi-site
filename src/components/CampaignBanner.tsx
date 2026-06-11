import { Campaign } from '@/lib/types';
import { getServiceBySlug } from '@/data/services';

export default function CampaignBanner({ campaign }: { campaign: Campaign }) {
  const service = getServiceBySlug(campaign.serviceSlug);

  return (
    <a
      href={campaign.url}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="block group poster-card"
    >
      <div className="flex">
        {/* Left accent border */}
        <div className="w-[3px] shrink-0" style={{ background: service?.color || '#f5b941' }} />

        <div className="p-4 flex-1">
          <div className="flex items-center gap-2 mb-2">
            {campaign.badge && <span className="campaign-badge">{campaign.badge}</span>}
            <span className="text-[11px] text-slate-400">{service?.title}</span>
          </div>
          <h3 className="font-bold text-sm text-slate-100 group-hover:text-amber-300 transition-colors mb-1">
            {campaign.title}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2">{campaign.description}</p>
          <div className="mt-3 text-xs font-bold text-amber-400 group-hover:text-amber-200 transition-colors">
            詳しく見る →
          </div>
        </div>
      </div>
    </a>
  );
}
