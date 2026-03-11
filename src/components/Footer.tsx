import Link from 'next/link';
import { serviceList } from '@/data/services';
import { CATEGORY_LABELS, ServiceCategory } from '@/lib/types';
import { getAllTags } from '@/lib/articles';
import ServiceIcon from '@/components/ServiceIcon';

export default function Footer() {
  const categories = Object.entries(CATEGORY_LABELS) as [ServiceCategory, string][];
  const popularTags = getAllTags().slice(0, 15);

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🎬</span>
              <span className="font-black text-lg text-slate-900">動画配信ナビ</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              動画配信サービス（VOD）20社の料金・無料体験・おすすめ作品・キャンペーン情報を徹底比較。U-NEXT・Netflix・Amazon Prime Video・Disney+・Hulu・DMM TVなど主要サービスの評判・口コミ・コスパを検証し、あなたにぴったりのVODが見つかるナビゲーションサイトです。
            </p>
          </div>

          {/* All Services (20) */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-3">全サービス一覧</h3>
            <div className="grid grid-cols-2 gap-1">
              {serviceList.map(s => (
                <Link key={s.slug} href={`/service/${s.slug}/`} className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-purple-600 transition-colors py-0.5">
                  <ServiceIcon slug={s.slug} size="xs" />
                  {s.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Categories + Links */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-3">カテゴリ</h3>
            <div className="flex flex-col gap-1">
              {categories.map(([key, label]) => (
                <Link key={key} href={`/category/${key}/`} className="text-xs text-slate-600 hover:text-purple-600 transition-colors py-0.5">
                  {label}
                </Link>
              ))}
              <Link href="/campaigns/" className="text-xs text-slate-600 hover:text-purple-600 transition-colors py-0.5">
                キャンペーン情報
              </Link>
              <Link href="/tags/" className="text-xs text-slate-600 hover:text-purple-600 transition-colors py-0.5">
                タグ一覧
              </Link>
            </div>

            <h3 className="font-bold text-slate-900 text-sm mt-4 mb-2">目的別おすすめ</h3>
            <div className="flex flex-col gap-1">
              <Link href="/tag/%E6%96%99%E9%87%91/" className="text-xs text-slate-600 hover:text-purple-600 transition-colors py-0.5">
                料金で比較する
              </Link>
              <Link href="/tag/%E7%84%A1%E6%96%99%E4%BD%93%E9%A8%93/" className="text-xs text-slate-600 hover:text-purple-600 transition-colors py-0.5">
                無料体験から始める
              </Link>
              <Link href="/tag/%E3%82%B3%E3%82%B9%E3%83%91/" className="text-xs text-slate-600 hover:text-purple-600 transition-colors py-0.5">
                コスパで選ぶ
              </Link>
              <Link href="/tag/%E3%81%8A%E3%81%99%E3%81%99%E3%82%81/" className="text-xs text-slate-600 hover:text-purple-600 transition-colors py-0.5">
                おすすめ作品
              </Link>
            </div>
          </div>

          {/* Popular tags */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-3">人気タグ</h3>
            <div className="flex flex-wrap gap-1.5">
              {popularTags.map(t => (
                <Link
                  key={t.slug}
                  href={`/tag/${t.slug}/`}
                  className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-slate-500 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                >
                  #{t.tag}
                </Link>
              ))}
            </div>
            <Link href="/tags/" className="block text-xs text-purple-600 hover:text-purple-700 mt-2 font-semibold transition-colors">
              すべてのタグを見る →
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6">
          <p className="text-center text-xs text-slate-400 leading-relaxed">
            &copy; 2026 動画配信ナビ. 当サイトはアフィリエイトプログラムに参加しています。
            <br />
            掲載情報は記事執筆時点のものです。最新情報は各サービスの公式サイトでご確認ください。
          </p>
        </div>
      </div>
    </footer>
  );
}
