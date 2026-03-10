import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { serviceList, getServiceBySlug } from '@/data/services';
import { getArticlesByService } from '@/lib/articles';
import { getCampaignsByService } from '@/data/campaigns';
import { CATEGORY_LABELS, ServiceCategory } from '@/lib/types';
import ArticleCard from '@/components/ArticleCard';
import GoogleAd from '@/components/GoogleAd';
import ServiceProductCard from '@/components/ServiceProductCard';
import CampaignBanner from '@/components/CampaignBanner';
import Sidebar from '@/components/Sidebar';
import ServiceIcon from '@/components/ServiceIcon';

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
    alternates: { canonical: `https://vod-navi-site.vercel.app/service/${slug}/` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const articles = getArticlesByService(slug);
  const campaigns = getCampaignsByService(slug);
  const categories = Object.entries(CATEGORY_LABELS) as [ServiceCategory, string][];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: service.title,
        description: service.description,
        category: '動画配信サービス',
        offers: {
          '@type': 'Offer',
          price: service.monthlyPrice,
          priceCurrency: 'JPY',
          availability: 'https://schema.org/InStock',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://vod-navi-site.vercel.app/' },
          { '@type': 'ListItem', position: 2, name: service.title },
        ],
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 mb-6 flex items-center gap-1">
        <Link href="/" className="hover:text-purple-600 transition-colors">ホーム</Link>
        <span>/</span>
        <span className="text-slate-400">{service.title}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {/* Service header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-4 h-12 rounded-lg" style={{ backgroundColor: service.color }} />
              <ServiceIcon color={service.color} title={service.title} size="md" />
              <h1 className="text-2xl md:text-3xl font-black text-slate-900">{service.title}</h1>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{service.description}</p>

            {/* Quick info */}
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="bg-gray-50 rounded-xl px-4 py-2">
                <span className="text-[10px] text-slate-400 block">月額</span>
                <span className="text-lg font-black text-purple-600">
                  {service.monthlyPrice > 0 ? `${service.monthlyPrice.toLocaleString()}円` : '無料'}
                </span>
              </div>
              {service.freeTrialDays > 0 && (
                <div className="bg-gray-50 rounded-xl px-4 py-2">
                  <span className="text-[10px] text-slate-400 block">無料体験</span>
                  <span className="text-lg font-black text-purple-600">{service.freeTrialDays}日間</span>
                </div>
              )}
              <div className="bg-gray-50 rounded-xl px-4 py-2">
                <span className="text-[10px] text-slate-400 block">ジャンル</span>
                <span className="text-sm text-slate-600">{service.genre.join('・')}</span>
              </div>
            </div>
          </div>

          {/* Ad after service header */}
          <div className="my-6">
            <GoogleAd />
          </div>

          {/* Campaigns */}
          {campaigns.length > 0 && (
            <div className="mb-8">
              <h2 className="font-black text-lg text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-purple-600">●</span> キャンペーン情報
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {campaigns.map(c => (
                  <CampaignBanner key={c.slug} campaign={c} />
                ))}
              </div>
            </div>
          )}

          {/* Ad after campaigns */}
          <div className="my-6">
            <GoogleAd />
          </div>

          <ServiceProductCard service={service} />

          {/* Ad after ServiceProductCard */}
          <div className="my-6">
            <GoogleAd />
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 flex-wrap mb-4 mt-8">
            {categories.map(([key, label]) => {
              const count = articles.filter(a => a.category === key).length;
              if (count === 0) return null;
              return (
                <span key={key} className="text-xs px-3 py-1 rounded-full border border-gray-200 text-slate-500 bg-gray-50">
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
            <div className="text-center py-12 text-slate-400">
              <p className="text-4xl mb-3">📝</p>
              <p className="font-bold text-slate-600">記事を準備中です</p>
            </div>
          )}

          {/* Ad after articles */}
          <div className="my-6">
            <GoogleAd />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-72 flex-shrink-0">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
