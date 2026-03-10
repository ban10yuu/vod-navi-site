import Link from 'next/link';
import { serviceList } from '@/data/services';
import { CATEGORY_LABELS, ServiceCategory } from '@/lib/types';

export default function Footer() {
  const categories = Object.entries(CATEGORY_LABELS) as [ServiceCategory, string][];

  return (
    <footer className="bg-[#08080f] border-t border-[#252535] mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🎬</span>
              <span className="font-black text-lg text-white">動画配信ナビ</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              動画配信サービスの比較・レビュー・キャンペーン情報をお届け。あなたにぴったりのVODが見つかるナビゲーションサイトです。
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-white text-sm mb-3">サービス一覧</h3>
            <div className="grid grid-cols-2 gap-1">
              {serviceList.slice(0, 10).map(s => (
                <Link key={s.slug} href={`/service/${s.slug}/`} className="text-xs text-gray-500 hover:text-[#7c3aed] transition-colors py-0.5">
                  {s.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-white text-sm mb-3">カテゴリ</h3>
            <div className="flex flex-col gap-1">
              {categories.map(([key, label]) => (
                <Link key={key} href={`/category/${key}/`} className="text-xs text-gray-500 hover:text-[#7c3aed] transition-colors py-0.5">
                  {label}
                </Link>
              ))}
              <Link href="/campaigns/" className="text-xs text-gray-500 hover:text-[#06b6d4] transition-colors py-0.5">
                キャンペーン情報
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1a1a28] mt-8 pt-6 text-center">
          <p className="text-xs text-gray-600">
            &copy; 2026 動画配信ナビ. 当サイトはアフィリエイトプログラムに参加しています。
          </p>
        </div>
      </div>
    </footer>
  );
}
