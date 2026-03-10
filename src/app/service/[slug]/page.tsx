import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { serviceList, getServiceBySlug } from '@/data/services';
import { getArticlesByService } from '@/lib/articles';
import { getCampaignsByService } from '@/data/campaigns';
import { CATEGORY_LABELS, ServiceCategory } from '@/lib/types';
import ArticleCard from '@/components/ArticleCard';
import ServiceProductCard from '@/components/ServiceProductCard';
import CampaignBanner from '@/components/CampaignBanner';
import Sidebar from '@/components/Sidebar';

export async function generateStaticParams() {
  return serviceList.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.title}の評判・レビュー・キャンペーン`,
    description: service.description,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const articles = getArticlesByService(slug);
  const campaigns = getCampaignsByService(slug);
  const categories = Object.entries(CATEGORY_LABELS) as [ServiceCategory, string][];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-600 mb-6 flex items-center gap-1">
        <Link href="/" className="hover:text-[#7c3aed] transition-colors">ホーム</Link>
        <span>/</span>
        <span className="text-gray-500">{service.title}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {/* Service header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-10 rounded" style={{ backgroundColor: service.color }} />
              <h1 className="text-2xl md:text-3xl font-black text-white">{service.title}</h1>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{service.description}</p>

            {/* Quick info */}
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="bg-[#12121e] border border-[#252535] rounded-lg px-4 py-2">
                <span className="text-[10px] text-gray-600 block">月額</span>
                <span className="text-lg font-black text-[#06b6d4]">
                  {service.monthlyPrice > 0 ? `${service.monthlyPrice.toLocaleString()}円` : '無料'}
                </span>
              </div>
              {service.freeTrialDays > 0 && (
                <div className="bg-[#12121e] border border-[#252535] rounded-lg px-4 py-2">
                  <span className="text-[10px] text-gray-600 block">無料体験</span>
                  <span className="text-lg font-black text-[#7c3aed]">{service.freeTrialDays}日間</span>
                </div>
              )}
              <div className="bg-[#12121e] border border-[#252535] rounded-lg px-4 py-2">
                <span className="text-[10px] text-gray-600 block">ジャンル</span>
                <span className="text-sm text-gray-300">{service.genre.join('・')}</span>
              </div>
            </div>
          </div>

          {/* Campaigns */}
          {campaigns.length > 0 && (
            <div className="mb-8">
              <h2 className="font-black text-lg text-white mb-4 flex items-center gap-2">
                <span className="text-[#06b6d4]">●</span> キャンペーン情報
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {campaigns.map(c => (
                  <CampaignBanner key={c.slug} campaign={c} />
                ))}
              </div>
            </div>
          )}

          <ServiceProductCard service={service} />

          {/* Category tabs */}
          <div className="flex gap-2 flex-wrap mb-4 mt-8">
            {categories.map(([key, label]) => {
              const count = articles.filter(a => a.category === key).length;
              if (count === 0) return null;
              return (
                <span key={key} className="text-xs px-3 py-1 rounded-full border border-[#252535] text-gray-400">
                  {label} ({count})
                </span>
              );
            })}
          </div>

          {/* Articles */}
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {articles.map(a => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-600">
              <p className="text-4xl mb-3">📝</p>
              <p className="font-bold">記事を準備中です</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:w-72 flex-shrink-0">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
