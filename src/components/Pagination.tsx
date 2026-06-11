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

  const linkClass =
    'px-3 py-2 text-sm font-medium text-slate-300 bg-[#141c2b] border border-white/10 rounded-lg hover:text-amber-300 hover:border-amber-400/40 hover:bg-amber-400/[0.07] transition-colors';
  const numClass =
    'px-3.5 py-2 text-sm font-medium text-slate-300 bg-[#141c2b] border border-white/10 rounded-lg hover:text-amber-300 hover:border-amber-400/40 hover:bg-amber-400/[0.07] transition-colors';
  const disabledClass =
    'px-3 py-2 text-sm font-medium text-slate-600 bg-white/[0.03] border border-white/[0.06] rounded-lg cursor-not-allowed';

  return (
    <nav className="flex items-center justify-center gap-1.5 mt-10" aria-label="ページナビゲーション">
      {/* Previous */}
      {currentPage > 1 ? (
        <Link href={getHref(currentPage - 1)} className={linkClass}>
          ← 前へ
        </Link>
      ) : (
        <span className={disabledClass}>← 前へ</span>
      )}

      {/* Page numbers */}
      {pages.map((page, i) =>
        page === '...' ? (
          <span key={`ellipsis-${i}`} className="px-2 py-2 text-sm text-slate-500">
            ...
          </span>
        ) : page === currentPage ? (
          <span
            key={page}
            className="px-3.5 py-2 text-sm font-bold text-[#1c1305] bg-gradient-to-br from-amber-300 to-amber-500 rounded-lg shadow-[0_0_14px_rgba(245,185,65,0.4)]"
          >
            {page}
          </span>
        ) : (
          <Link key={page} href={getHref(page)} className={numClass}>
            {page}
          </Link>
        )
      )}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link href={getHref(currentPage + 1)} className={linkClass}>
          次へ →
        </Link>
      ) : (
        <span className={disabledClass}>次へ →</span>
      )}
    </nav>
  );
}
