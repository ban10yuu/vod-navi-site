import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <p className="text-6xl mb-4">🎬</p>
      <h1 className="text-3xl font-black text-slate-900 mb-3">404</h1>
      <p className="text-slate-400 mb-6">お探しのページは見つかりませんでした。</p>
      <Link
        href="/"
        className="inline-block text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg transition-colors"
      >
        ホームに戻る
      </Link>
    </div>
  );
}
