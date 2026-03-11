import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description:
    '動画配信ナビのプライバシーポリシー。個人情報の取り扱い、Google Analytics、Google AdSense、Cookie、アフィリエイトプログラムに関する方針をご確認いただけます。',
  alternates: { canonical: 'https://vod-navi-site.vercel.app/privacy/' },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <nav className="text-xs text-slate-500 mb-6 flex items-center gap-1">
        <Link href="/" className="hover:text-purple-600 transition-colors">ホーム</Link>
        <span>/</span>
        <span className="text-slate-400">プライバシーポリシー</span>
      </nav>

      <h1 className="text-2xl font-black text-slate-900 mb-8">
        プライバシーポリシー
      </h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-8 text-[0.95rem] leading-relaxed text-slate-700">
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3 pl-3 border-l-4 border-purple-600">
            個人情報の取り扱いについて
          </h2>
          <p>
            動画配信ナビ（以下「当サイト」）は、お客様の個人情報の重要性を認識し、適切に保護することをお約束します。
            当サイトでは、お問い合わせフォームやメールでご連絡いただいた場合に限り、お名前やメールアドレス等の個人情報を取得することがあります。
            取得した個人情報は、お問い合わせへの回答にのみ使用し、ご本人の同意なく第三者に提供することはありません（法令に基づく場合を除く）。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3 pl-3 border-l-4 border-purple-600">
            Google Analyticsの利用について
          </h2>
          <p>
            当サイトでは、アクセス解析のためにGoogle LLCが提供するGoogle Analyticsを利用しています。
            Google AnalyticsはCookieを使用してお客様の情報を収集しますが、個人を特定する情報は含まれません。
            データの収集・処理の仕組みについては、
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:underline"
            >
              Googleのポリシーと規約
            </a>
            をご覧ください。
          </p>
          <p className="mt-2">
            Google Analyticsによるデータ収集を無効にしたい場合は、
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:underline"
            >
              Google Analyticsオプトアウトアドオン
            </a>
            をご利用ください。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3 pl-3 border-l-4 border-purple-600">
            Google AdSenseおよびCookieについて
          </h2>
          <p>
            当サイトでは、Google LLCが提供するGoogle AdSenseを利用して広告を配信しています。
            Google AdSenseはCookie（DoubleClick Cookieを含む）を使用して、お客様の過去のアクセス情報に基づいた広告を表示することがあります。
          </p>
          <p className="mt-2">
            パーソナライズ広告を無効にするには、
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:underline"
            >
              Googleの広告設定
            </a>
            から設定を変更できます。また、
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:underline"
            >
              aboutads.info
            </a>
            からサードパーティのCookieを無効にすることも可能です。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3 pl-3 border-l-4 border-purple-600">
            アフィリエイトプログラムについて
          </h2>
          <p>
            当サイトは、各種アフィリエイトプログラムに参加しています。
            当サイト内のリンクを経由して商品・サービスを購入された場合、当サイトが紹介報酬を受け取ることがあります。
            これによりお客様が支払う金額が変わることはありません。
            当サイトでは、読者にとって有益と判断した商品・サービスのみを紹介しています。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3 pl-3 border-l-4 border-purple-600">
            免責事項
          </h2>
          <p>
            当サイトに掲載されている情報は、可能な限り正確な情報を提供するよう努めていますが、
            正確性や安全性を保証するものではありません。
            当サイトの情報を利用したことによる損害等について、一切の責任を負いかねます。
            各動画配信サービスの最新情報・料金・配信内容については、各サービスの公式サイトをご確認ください。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3 pl-3 border-l-4 border-purple-600">
            プライバシーポリシーの変更
          </h2>
          <p>
            当サイトは、必要に応じて本ポリシーの内容を変更することがあります。
            変更後のポリシーは、当ページに掲載した時点で効力を生じるものとします。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-3 pl-3 border-l-4 border-purple-600">
            お問い合わせ
          </h2>
          <p>
            本ポリシーに関するお問い合わせは、
            <Link href="/contact/" className="text-purple-600 hover:underline">
              お問い合わせページ
            </Link>
            よりご連絡ください。
          </p>
        </section>

        <p className="text-sm text-slate-400 pt-4 border-t border-gray-200">
          制定日: 2026年3月11日
        </p>
      </div>
    </div>
  );
}
