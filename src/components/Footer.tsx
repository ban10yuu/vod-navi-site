import Link from 'next/link';
import { serviceList } from '@/data/services';
import { CATEGORY_LABELS, ServiceCategory } from '@/lib/types';
import ServiceIcon from '@/components/ServiceIcon';

export default function Footer() {
  const categories = Object.entries(CATEGORY_LABELS) as [ServiceCategory, string][];

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <span className="font-black text-base text-slate-900">動画配信ナビ</span>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              VOD20社の料金・無料体験・作品を徹底比較。あなたにぴったりの動画配信サービスが見つかるサイトです。
            </p>
          </div>

          {/* サービス一覧 */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-2">サービス一覧</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
              {serviceList.map(s => (
                <Link key={s.slug} href={`/service/${s.slug}/`} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-purple-600 transition-colors py-0.5">
                  <ServiceIcon slug={s.slug} size="xs" />
                  {s.title}
                </Link>
              ))}
            </div>
          </div>

          {/* カテゴリ + サイト情報 */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-2">カテゴリ</h3>
            <div className="flex flex-col gap-0.5">
              {categories.map(([key, label]) => (
                <Link key={key} href={`/category/${key}/`} className="text-xs text-slate-500 hover:text-purple-600 transition-colors py-0.5">
                  {label}
                </Link>
              ))}
              <Link href="/campaigns/" className="text-xs text-slate-500 hover:text-purple-600 transition-colors py-0.5">
                キャンペーン情報
              </Link>
            </div>
          </div>
        </div>

        {/* 関連サイト */}
        <div className="border-t border-gray-200 mt-8 pt-5">
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
            <a href="https://manga-matome-site.vercel.app" target="_blank" rel="noopener" className="hover:text-purple-600 transition-colors">マンガ考察ラボ</a>
            <a href="https://anime-review-site.vercel.app" target="_blank" rel="noopener" className="hover:text-purple-600 transition-colors">Anime Review Lab</a>
            <a href="https://ai-tools-site-dusky.vercel.app" target="_blank" rel="noopener" className="hover:text-purple-600 transition-colors">AIツールラボ</a>
            <a href="https://fukusen-lab.vercel.app" target="_blank" rel="noopener" className="hover:text-purple-600 transition-colors">伏線回収ラボ</a>
            <a href="https://joseikin-navi-site.vercel.app" target="_blank" rel="noopener" className="hover:text-purple-600 transition-colors">助成金ナビ</a>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-5 pt-5">
          <div className="flex items-center justify-center gap-3 mb-2 text-xs">
            <Link href="/privacy/" className="text-slate-400 hover:text-purple-600 transition-colors">プライバシーポリシー</Link>
            <span className="text-slate-300">|</span>
            <Link href="/contact/" className="text-slate-400 hover:text-purple-600 transition-colors">お問い合わせ</Link>
          </div>
          <p className="text-center text-[11px] text-slate-400 leading-relaxed">
            &copy; 2026 動画配信ナビ. アフィリエイトプログラムに参加しています。掲載情報は執筆時点のものです。
          </p>
        </div>
      </div>
    </footer>
  );
}
