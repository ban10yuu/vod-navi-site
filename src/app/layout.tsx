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
  description: '動画配信サービス20社を徹底比較。料金・無料体験・おすすめ作品・キャンペーン情報を毎日更新。あなたにぴったりのVODが見つかるナビゲーションサイト。',
  keywords: [
    'VOD 比較',
    '動画配信サービス 比較',
    '動画配信サービス おすすめ',
    'VOD おすすめ',
    'サブスク 動画',
    'U-NEXT 評判',
    'U-NEXT 料金',
    'Netflix 料金',
    'Netflix おすすめ',
    'Amazon Prime Video 評判',
    'DMM TV 評判',
    'Hulu 評判',
    'Disney+ 料金',
    'ABEMA プレミアム',
    'dアニメストア 評判',
    'FOD Premium',
    'Lemino 評判',
    'DAZN 料金',
    'WOWOW オンデマンド',
    '動画配信 無料体験',
    'VOD 無料トライアル',
    '動画配信 キャンペーン',
    '動画配信サービス 料金比較',
    'サブスク 動画 安い',
    '映画 サブスク',
    'アニメ サブスク',
    'ドラマ サブスク',
    '動画配信 レビュー',
    'VOD ランキング',
    '動画配信サービス 選び方',
    'ストリーミング おすすめ',
    '見放題 動画',
    '動画配信 2026',
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta name="google-adsense-account" content="ca-pub-1611624572831066" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-V11MKY0X3F" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-V11MKY0X3F');`,
          }}
        />
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
