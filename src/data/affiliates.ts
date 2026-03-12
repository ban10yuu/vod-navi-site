import { ServiceInfo, AffiliateLink } from '@/lib/types';

// もしもアフィリエイト設定
export const MOSHIMO_A_ID = '5417189';

// A8.net a8mat codes (承認済みプログラム)
const A8_AMEBA_MANGA = '4AZCG7+ATYY0I+4RKY+60H7L';

function a8Link(a8mat: string): string {
  return `https://px.a8.net/svt/ejp?a8mat=${a8mat}`;
}

export function getMoshimoRakutenUrl(targetUrl: string): string {
  return `https://af.moshimo.com/af/c/click?a_id=${MOSHIMO_A_ID}&p_id=54&pc_id=54&pl_id=616&url=${encodeURIComponent(targetUrl)}`;
}

export const MOSHIMO_IMPRESSION_URL = `https://i.moshimo.com/af/i/impression?a_id=${MOSHIMO_A_ID}&p_id=54&pc_id=54&pl_id=616`;

export function getAffiliateLinks(service: ServiceInfo): AffiliateLink[] {
  const links: AffiliateLink[] = [];

  switch (service.slug) {
    case 'u-next':
      links.push({
        service: 'u-next',
        label: 'U-NEXT 31日間無料トライアル',
        url: service.officialUrl,
        badge: '31日間無料',
      });
      break;
    case 'netflix':
      links.push({
        service: 'netflix',
        label: 'Netflix 公式サイト',
        url: service.officialUrl,
        badge: '広告付き790円〜',
      });
      break;
    case 'amazon-prime-video':
      links.push({
        service: 'amazon-prime-video',
        label: 'Amazon Prime Video 30日間無料体験',
        url: service.officialUrl,
        badge: '30日間無料',
      });
      break;
    case 'dmm-tv':
      links.push({
        service: 'dmm-tv',
        label: 'DMM TV 30日間無料トライアル',
        url: service.officialUrl,
        badge: '30日間無料',
      });
      break;
    case 'd-anime-store':
      links.push({
        service: 'd-anime-store',
        label: 'dアニメストア 31日間無料',
        url: service.officialUrl,
        badge: '31日間無料',
      });
      break;
    case 'hulu':
      links.push({
        service: 'hulu',
        label: 'Hulu 公式サイト',
        url: service.officialUrl,
      });
      break;
    case 'disney-plus':
      links.push({
        service: 'disney-plus',
        label: 'Disney+ 公式サイト',
        url: service.officialUrl,
        badge: '年額プランがお得',
      });
      break;
    case 'abema':
      links.push({
        service: 'abema',
        label: 'ABEMAプレミアム 14日間無料',
        url: service.officialUrl,
        badge: '14日間無料',
      });
      break;
    case 'fod-premium':
      links.push({
        service: 'fod-premium',
        label: 'FOD Premium 公式サイト',
        url: service.officialUrl,
      });
      break;
    case 'lemino':
      links.push({
        service: 'lemino',
        label: 'Lemino 31日間無料トライアル',
        url: service.officialUrl,
        badge: '31日間無料',
      });
      break;
    case 'rakuten-tv':
      links.push({
        service: 'rakuten-tv',
        label: 'Rakuten TV 公式サイト',
        url: getMoshimoRakutenUrl(service.officialUrl),
        badge: 'ポイント還元',
        moshimo: true,
      });
      break;
    default:
      links.push({
        service: service.slug,
        label: `${service.title} 公式サイト`,
        url: service.officialUrl,
      });
  }

  return links;
}

export const generalAffiliates = [
  {
    service: 'u-next',
    label: 'U-NEXT｜31日間無料で見放題',
    url: 'https://video.unext.jp/',
    badge: '人気No.1',
  },
  {
    service: 'amazon-prime-video',
    label: 'Prime Video｜月額600円',
    url: 'https://www.amazon.co.jp/gp/video/offers/',
    badge: 'コスパ最強',
  },
  {
    service: 'dmm-tv',
    label: 'DMM TV｜アニメ見るならココ',
    url: 'https://tv.dmm.com/',
    badge: 'アニメ特化',
  },
  {
    service: 'rakuten-tv',
    label: 'Rakuten TV｜楽天ポイントで視聴',
    url: getMoshimoRakutenUrl('https://tv.rakuten.co.jp/'),
    badge: 'ポイント還元',
    moshimo: true,
  },
  {
    service: 'ameba-manga',
    label: 'Amebaマンガ｜100冊40%OFF',
    url: a8Link(A8_AMEBA_MANGA),
    badge: '原作も読む',
  },
  {
    service: 'rakuten-books',
    label: '楽天ブックス｜ポイント還元',
    url: getMoshimoRakutenUrl('https://books.rakuten.co.jp/'),
    badge: 'ポイント還元',
    moshimo: true,
  },
];
