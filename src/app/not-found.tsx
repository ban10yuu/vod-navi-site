import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <p className="text-6xl mb-4 drop-shadow-[0_0_20px_rgba(245,185,65,0.4)]">🎬</p>
      <h1 className="font-display text-5xl font-bold text-white mb-3 tracking-wider">404</h1>
      <p className="text-slate-400 mb-6">お探しのページは見つかりませんでした。</p>
      <Link href="/" className="btn-gold text-sm px-6 py-3">
        ホームに戻る
      </Link>
    </div>
  );
}
