import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vod-navi-site.vercel.app'),
  title: {
    default: '動画配信ナビ｜VODサービス比較・レビュー・キャンペーン情報',
    template: '%s｜動画配信ナビ',
  },
  description: '動画配信サービス（VOD）20社を徹底比較！料金・無料体験・おすすめ作品・解約方法・キャンペーン情報を毎日更新。U-NEXT・Netflix・Amazon Prime Video・Disney+・Hulu・DMM TVなど主要サービスの評判・口コミ・コスパを検証。あなたにぴったりのVODが見つかるナビゲーションサイト。',
  keywords: [
    // ── Generic VOD keywords ──
    'VOD 比較', 'VOD おすすめ', 'VOD ランキング', 'VOD 比較 2026', 'VOD 選び方',
    '動画配信サービス 比較', '動画配信サービス おすすめ', '動画配信サービス ランキング',
    '動画配信サービス 選び方', '動画配信サービス 料金比較', '動画配信サービス 安い',
    '動画配信 無料体験', '動画配信 無料', '動画配信 おすすめ 2026', '動画配信 レビュー',
    '動画配信 キャンペーン', '動画配信 2026',
    'サブスク 動画', 'サブスク 動画 安い', 'サブスク 動画 おすすめ',
    '映画 サブスク', '映画 サブスク おすすめ', '映画 見放題',
    'アニメ サブスク', 'アニメ 見放題', 'アニメ 動画配信 おすすめ',
    'ドラマ サブスク', 'ドラマ 見放題', '韓国ドラマ サブスク',
    '見放題 動画', 'ストリーミング おすすめ', 'ストリーミング 比較',
    'VOD 無料トライアル', 'VOD コスパ', 'VOD 家族向け',
    // ── U-NEXT ──
    'U-NEXT 評判', 'U-NEXT 料金', 'U-NEXT 無料体験', 'U-NEXT おすすめ', 'U-NEXT 解約',
    'U-NEXT 口コミ', 'U-NEXT ポイント', 'U-NEXT ファミリーアカウント',
    // ── Netflix ──
    'Netflix 料金', 'Netflix おすすめ', 'Netflix 評判', 'Netflix 解約', 'Netflix 無料',
    // ── Amazon Prime Video ──
    'Amazon Prime Video 評判', 'Amazon Prime Video 料金', 'Amazonプライム 動画 おすすめ',
    // ── DMM TV ──
    'DMM TV 評判', 'DMM TV 料金', 'DMM TV アニメ', 'DMM TV 無料体験',
    // ── dアニメストア ──
    'dアニメストア 評判', 'dアニメストア 料金', 'dアニメストア おすすめ',
    // ── Hulu ──
    'Hulu 評判', 'Hulu 料金', 'Hulu おすすめ', 'Hulu 解約',
    // ── Disney+ ──
    'Disney+ 料金', 'Disney+ 評判', 'Disney+ おすすめ', 'ディズニープラス 料金',
    // ── ABEMA ──
    'ABEMA プレミアム', 'ABEMA 評判', 'ABEMA 無料', 'ABEMA 料金',
    // ── Others ──
    'FOD Premium 評判', 'Lemino 評判', 'Lemino 料金', 'TELASA 評判',
    'DAZN 料金', 'DAZN 評判', 'DAZN サッカー',
    'WOWOW オンデマンド', 'WOWOW 料金',
    'Crunchyroll 評判', 'Apple TV+ 評判', 'Rakuten TV 評判',
    'TVer 評判', 'TVer おすすめ', 'バンダイチャンネル 評判',
    'YouTube Premium 評判', 'Spotify 動画',
    // ── Intent keywords ──
    '動画配信 コスパ 最強', '動画配信 一人暮らし', '動画配信 学生 おすすめ',
    '動画配信 家族 おすすめ', '動画配信 スポーツ',
    'VOD 乗り換え', 'VOD 複数契約', 'VOD 解約方法',
    '映画 定額 おすすめ', 'アニメ 定額 見放題',
  ],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: '動画配信ナビ',
    title: '動画配信ナビ｜VODサービス比較・レビュー・キャンペーン情報',
    description: '動画配信サービス20社を徹底比較。料金・無料体験・おすすめ作品・キャンペーン情報を毎日更新。',
    url: 'https://vod-navi-site.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: '動画配信ナビ',
    description: '動画配信サービス20社を徹底比較。あなたにぴったりのVODが見つかるナビサイト。',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://vod-navi-site.vercel.app',
  },
  verification: {
    google: 'QNT_EwkmJ039_aVzqr1sKc_hySyn-ZpgLZDtAgxtsNo',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta name="google-adsense-account" content="ca-pub-1611624572831066" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1611624572831066"
          crossOrigin="anonymous"
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-V11MKY0X3F" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-V11MKY0X3F');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: '動画配信ナビ',
              url: 'https://vod-navi-site.vercel.app',
              description: '動画配信サービス（VOD）20社を徹底比較！料金・無料体験・おすすめ作品・キャンペーン情報を毎日更新。',
              publisher: {
                '@type': 'Organization',
                name: '動画配信ナビ編集部',
                url: 'https://vod-navi-site.vercel.app',
              },
              inLanguage: 'ja',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://vod-navi-site.vercel.app/?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${notoSansJP.className} antialiased min-h-screen flex flex-col bg-white text-slate-900`}>
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
