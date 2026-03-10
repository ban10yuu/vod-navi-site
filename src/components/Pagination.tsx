import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string; // default: '/page'
}

export default function Pagination({ currentPage, totalPages, basePath = '/page' }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getHref = (page: number) => (page === 1 ? '/' : `${basePath}/${page}/`);

  // Show at most 7 page numbers with ellipsis
  const pages: (number | '...')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push('...');
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  return (
    <nav className="flex items-center justify-center gap-1.5 mt-10" aria-label="ページナビゲーション">
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={getHref(currentPage - 1)}
          className="px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-gray-200 rounded-lg hover:bg-purple-50 hover:text-purple-600 hover:border-purple-300 transition-colors"
        >
          ← 前へ
        </Link>
      ) : (
        <span className="px-3 py-2 text-sm font-medium text-slate-300 bg-gray-50 border border-gray-100 rounded-lg cursor-not-allowed">
          ← 前へ
        </span>
      )}

      {/* Page numbers */}
      {pages.map((page, i) =>
        page === '...' ? (
          <span key={`ellipsis-${i}`} className="px-2 py-2 text-sm text-slate-400">
            ...
          </span>
        ) : page === currentPage ? (
          <span
            key={page}
            className="px-3.5 py-2 text-sm font-bold text-white bg-purple-600 rounded-lg shadow-sm"
          >
            {page}
          </span>
        ) : (
          <Link
            key={page}
            href={getHref(page)}
            className="px-3.5 py-2 text-sm font-medium text-slate-600 bg-white border border-gray-200 rounded-lg hover:bg-purple-50 hover:text-purple-600 hover:border-purple-300 transition-colors"
          >
            {page}
          </Link>
        )
      )}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={getHref(currentPage + 1)}
          className="px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-gray-200 rounded-lg hover:bg-purple-50 hover:text-purple-600 hover:border-purple-300 transition-colors"
        >
          次へ →
        </Link>
      ) : (
        <span className="px-3 py-2 text-sm font-medium text-slate-300 bg-gray-50 border border-gray-100 rounded-lg cursor-not-allowed">
          次へ →
        </span>
      )}
    </nav>
  );
}
