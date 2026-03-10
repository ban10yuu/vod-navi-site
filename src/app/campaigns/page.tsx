import { Metadata } from 'next';
import Link from 'next/link';
import { getActiveCampaigns } from '@/data/campaigns';
import { getServiceBySlug } from '@/data/services';
import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'キャンペーン情報一覧',
  description: '動画配信サービスの最新キャンペーン・割引・無料体験情報をまとめています。',
  alternates: { canonical: 'https://vod-navi-site.vercel.app/campaigns/' },
};

export default function CampaignsPage() {
  const campaigns = getActiveCampaigns();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <nav className="text-xs text-gray-600 mb-6 flex items-center gap-1">
        <Link href="/" className="hover:text-[#7c3aed] transition-colors">ホーム</Link>
        <span>/</span>
        <span className="text-gray-500">キャンペーン情報</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-2xl font-black text-white mb-2">キャンペーン情報一覧</h1>
          <p className="text-sm text-gray-500 mb-6">各動画配信サービスの最新キャンペーン・割引・無料体験情報をまとめています。</p>

          <div className="space-y-4">
            {campaigns.map(c => {
              const service = getServiceBySlug(c.serviceSlug);
              return (
                <a
                  key={c.slug}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="block vod-card group"
                >
                  <div className="flex">
                    {/* Color sidebar */}
                    <div className="w-1.5 flex-shrink-0" style={{ backgroundColor: service?.color || '#7c3aed' }} />

                    <div className="p-5 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {c.badge && <span className="campaign-badge">{c.badge}</span>}
                        <span className="text-xs text-gray-500">{service?.title}</span>
                      </div>
                      <h2 className="font-bold text-base text-white group-hover:text-[#7c3aed] transition-colors mb-2">
                        {c.title}
                      </h2>
                      <p className="text-sm text-gray-500 leading-relaxed">{c.description}</p>

                      {service && (
                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-600">
                          {service.monthlyPrice > 0 && <span>月額{service.monthlyPrice.toLocaleString()}円</span>}
                          {service.freeTrialDays > 0 && <span>{service.freeTrialDays}日間無料</span>}
                        </div>
                      )}

                      <div className="mt-3 text-xs font-bold text-[#7c3aed] group-hover:text-[#06b6d4] transition-colors">
                        キャンペーンを確認する →
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        <div className="lg:w-72 flex-shrink-0">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
