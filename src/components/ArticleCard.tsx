import Link from 'next/link';
import { Article, CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/types';
import { getServiceBySlug } from '@/data/services';

export default function ArticleCard({ article }: { article: Article }) {
  const service = getServiceBySlug(article.serviceSlug);
  const catLabel = CATEGORY_LABELS[article.category];
  const catColor = CATEGORY_COLORS[article.category];

  return (
    <Link href={`/article/${article.slug}/`} className="vod-card block group">
      {/* Color bar */}
      <div className="h-1" style={{ background: service?.color || '#7c3aed' }} />

      <div className="p-4">
        {/* Category + Service */}
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${catColor}`}>
            {catLabel}
          </span>
          {service && (
            <span className="text-[10px] text-gray-500">{service.title}</span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-bold text-sm text-white group-hover:text-[#7c3aed] transition-colors line-clamp-2 mb-2 leading-snug">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
          {article.excerpt}
        </p>

        {/* Tags + Date */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1 flex-wrap">
            {article.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[9px] px-1.5 py-0.5 bg-[#1a1a28] text-gray-500 rounded">
                {tag}
              </span>
            ))}
          </div>
          <span className="text-[10px] text-gray-600">{article.publishedAt}</span>
        </div>
      </div>
    </Link>
  );
}
