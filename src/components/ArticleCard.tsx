import Link from 'next/link';
import { Article, CATEGORY_LABELS } from '@/lib/types';
import { getServiceBySlug } from '@/data/services';
import ServiceIcon from '@/components/ServiceIcon';

export default function ArticleCard({ article }: { article: Article }) {
  const service = getServiceBySlug(article.serviceSlug);
  const catLabel = CATEGORY_LABELS[article.category];

  return (
    <div className="group bg-white rounded-lg border border-gray-200 hover:border-purple-200 transition-colors overflow-hidden">
      <div className="p-4">
        {/* Service + Category */}
        <div className="flex items-center gap-2 mb-2">
          {service && (
            <Link href={`/service/${service.slug}/`} className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-purple-600 transition-colors">
              <ServiceIcon slug={service.slug} size="xs" />
              {service.title}
            </Link>
          )}
          <span className="text-[10px] text-slate-300">{catLabel}</span>
        </div>

        {/* Title */}
        <Link href={`/article/${article.slug}/`} className="block">
          <h3 className="font-bold text-sm text-slate-900 group-hover:text-purple-600 transition-colors line-clamp-2 leading-snug mb-1.5">
            {article.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <Link href={`/article/${article.slug}/`} className="block">
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        </Link>

        {/* Date */}
        <div className="mt-2">
          <span className="text-[10px] text-slate-300">{article.publishedAt}</span>
        </div>
      </div>
    </div>
  );
}
