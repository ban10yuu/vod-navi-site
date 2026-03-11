import Link from 'next/link';
import { Article, CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/types';
import { getServiceBySlug } from '@/data/services';
import ServiceIcon from '@/components/ServiceIcon';

export default function ArticleCard({ article }: { article: Article }) {
  const service = getServiceBySlug(article.serviceSlug);
  const catLabel = CATEGORY_LABELS[article.category];
  const catColor = CATEGORY_COLORS[article.category];

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
      {/* Color bar */}
      <div className="h-1" style={{ background: service?.color || '#7c3aed' }} />

      <div className="p-4">
        {/* Category + Service */}
        <div className="flex items-center gap-2 mb-2">
          <Link
            href={`/category/${article.category}/`}
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border hover:opacity-80 transition-opacity ${catColor}`}
          >
            {catLabel}
          </Link>
          {service && (
            <Link href={`/service/${service.slug}/`} className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-purple-600 transition-colors">
              <ServiceIcon slug={service.slug} size="xs" />
              {service.title}
            </Link>
          )}
        </div>

        {/* Title */}
        <Link href={`/article/${article.slug}/`} className="block">
          <h3 className="font-bold text-sm text-slate-900 group-hover:text-purple-600 transition-colors line-clamp-2 mb-2 leading-snug">
            {article.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <Link href={`/article/${article.slug}/`} className="block">
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
            {article.excerpt}
          </p>
        </Link>

        {/* Tags + Date */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1 flex-wrap">
            {article.tags.slice(0, 3).map(tag => (
              <Link
                key={tag}
                href={`/tag/${encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'))}/`}
                className="text-[9px] px-1.5 py-0.5 bg-gray-100 text-slate-500 rounded hover:bg-purple-50 hover:text-purple-600 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
          <span className="text-[10px] text-slate-400">{article.publishedAt}</span>
        </div>
      </div>
    </div>
  );
}
