import Link from 'next/link';
import { Article, CATEGORY_LABELS } from '@/lib/types';
import { getServiceBySlug } from '@/data/services';
import ServiceIcon from '@/components/ServiceIcon';

export default function ArticleCard({ article }: { article: Article }) {
  const service = getServiceBySlug(article.serviceSlug);
  const catLabel = CATEGORY_LABELS[article.category];

  return (
    <div className="group poster-card">
      {/* Marquee accent line */}
      <div className="h-[2px] bg-gradient-to-r from-amber-400/0 via-amber-400/50 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="p-4">
        {/* Service + Category */}
        <div className="flex items-center gap-2 mb-2">
          {service && (
            <Link href={`/service/${service.slug}/`} className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-amber-300 transition-colors">
              <ServiceIcon slug={service.slug} size="xs" />
              {service.title}
            </Link>
          )}
          <span className="text-[10px] text-slate-500">{catLabel}</span>
        </div>

        {/* Title */}
        <Link href={`/article/${article.slug}/`} className="block">
          <h3 className="font-bold text-sm text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug mb-1.5">
            {article.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <Link href={`/article/${article.slug}/`} className="block">
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        </Link>

        {/* Date */}
        <div className="mt-2">
          <span className="text-[10px] text-slate-500">{article.publishedAt}</span>
        </div>
      </div>
    </div>
  );
}
