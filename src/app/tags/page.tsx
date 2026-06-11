import { Metadata } from 'next';
import Link from 'next/link';
import { getAllTags } from '@/lib/articles';
import GoogleAd from '@/components/GoogleAd';
import Sidebar from '@/components/Sidebar';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

const BASE_URL = 'https://vod-navi-site.vercel.app';

export const metadata: Metadata = {
  title: 'タグ一覧｜動画配信ナビ',
  description: '動画配信ナビで使用されている全タグの一覧です。U-NEXT、Netflix、Amazon Prime Videoなどサービス別、レビュー・料金・比較などカテゴリ別に記事を探せます。',
  alternates: { canonical: `${BASE_URL}/tags/` },
};

export default function TagsPage() {
  const tags = getAllTags();

  // Group tags by size for visual hierarchy
  const largeTags = tags.filter(t => t.count >= 10);
  const mediumTags = tags.filter(t => t.count >= 4 && t.count < 10);
  const smallTags = tags.filter(t => t.count < 4);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', url: `${BASE_URL}/` },
          { name: 'タグ一覧' },
        ]}
      />

      {/* Breadcrumb */}
      <nav className="text-xs text-slate-400 mb-6 flex items-center gap-1">
        <Link href="/" className="hover:text-amber-300 transition-colors">ホーム</Link>
        <span>/</span>
        <span className="text-slate-500">タグ一覧</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-2xl font-black text-white mb-2">タグ一覧</h1>
          <p className="text-sm text-slate-400 mb-6">
            全{tags.length}個のタグから記事を探せます。
          </p>

          {/* Ad after heading */}
          <div className="mb-6">
            <GoogleAd />
          </div>

          {/* Popular tags */}
          {largeTags.length > 0 && (
            <div className="mb-8">
              <h2 className="font-black text-lg text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">●</span> 人気タグ
              </h2>
              <div className="flex flex-wrap gap-2">
                {largeTags.map(t => (
                  <Link
                    key={t.slug}
                    href={`/tag/${t.slug}/`}
                    className="text-sm font-bold px-4 py-2 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/25 hover:bg-amber-400/15 transition-colors"
                  >
                    #{t.tag}
                    <span className="ml-1.5 text-xs text-amber-400/70">({t.count})</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Medium tags */}
          {mediumTags.length > 0 && (
            <div className="mb-8">
              <h2 className="font-black text-lg text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">●</span> よく使われるタグ
              </h2>
              <div className="flex flex-wrap gap-2">
                {mediumTags.map(t => (
                  <Link
                    key={t.slug}
                    href={`/tag/${t.slug}/`}
                    className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/[0.04] text-slate-300 border border-white/10 hover:text-amber-300 hover:border-amber-400/30 hover:bg-amber-400/10 transition-colors"
                  >
                    #{t.tag}
                    <span className="ml-1 text-slate-500">({t.count})</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Ad mid */}
          <div className="my-6">
            <GoogleAd />
          </div>

          {/* Small tags */}
          {smallTags.length > 0 && (
            <div className="mb-8">
              <h2 className="font-black text-lg text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">●</span> その他のタグ
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {smallTags.map(t => (
                  <Link
                    key={t.slug}
                    href={`/tag/${t.slug}/`}
                    className="text-[11px] px-2 py-1 rounded bg-white/[0.06] text-slate-400 hover:text-amber-300 hover:bg-amber-400/10 transition-colors"
                  >
                    #{t.tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Ad after tags */}
          <div className="my-6">
            <GoogleAd />
          </div>
        </div>

        <div className="lg:w-72 flex-shrink-0">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
