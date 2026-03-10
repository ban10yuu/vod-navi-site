import { Campaign } from '@/lib/types';
import { getServiceBySlug } from '@/data/services';

export default function CampaignBanner({ campaign }: { campaign: Campaign }) {
  const service = getServiceBySlug(campaign.serviceSlug);

  return (
    <a
      href={campaign.url}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="block vod-card group"
    >
      <div className="h-1" style={{ background: service?.color || '#7c3aed' }} />
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          {campaign.badge && <span className="campaign-badge">{campaign.badge}</span>}
          <span className="text-[11px] text-gray-500">{service?.title}</span>
        </div>
        <h3 className="font-bold text-sm text-white group-hover:text-[#7c3aed] transition-colors mb-1">
          {campaign.title}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2">{campaign.description}</p>
        <div className="mt-3 text-xs font-bold text-[#7c3aed] group-hover:text-[#06b6d4] transition-colors">
          詳しく見る →
        </div>
      </div>
    </a>
  );
}
