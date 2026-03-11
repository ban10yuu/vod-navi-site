import { Article, Section, ServiceInfo } from '@/lib/types';

const BASE_URL = 'https://vod-navi-site.vercel.app';
const PUBLISHER = {
  '@type': 'Organization' as const,
  name: '動画配信ナビ',
  url: BASE_URL,
};

export function ArticleJsonLd({
  article,
  serviceTitle,
}: {
  article: Article;
  serviceTitle?: string;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: PUBLISHER,
    publisher: PUBLISHER,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/article/${article.slug}/`,
    },
    keywords: article.tags.join(', '),
    ...(serviceTitle && { about: { '@type': 'Thing', name: serviceTitle } }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url?: string }[];
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.url && { item: item.url }),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function FaqJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  if (faqs.length === 0) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ServicePageJsonLd({ service }: { service: ServiceInfo }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${service.title}の評判・レビュー・キャンペーン`,
    description: service.description,
    url: `${BASE_URL}/service/${service.slug}/`,
    isPartOf: { '@type': 'WebSite', name: '動画配信ナビ', url: BASE_URL },
    about: {
      '@type': 'Product',
      name: service.title,
      description: service.description,
      category: '動画配信サービス',
      offers: {
        '@type': 'Offer',
        price: service.monthlyPrice,
        priceCurrency: 'JPY',
        availability: 'https://schema.org/InStock',
        ...(service.freeTrialDays > 0 && {
          description: `${service.freeTrialDays}日間無料体験あり`,
        }),
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function TagPageJsonLd({ tag, articleCount }: { tag: string; articleCount: number }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `「${tag}」に関する記事一覧`,
    description: `動画配信サービスの「${tag}」に関する記事を${articleCount}件まとめています。`,
    url: `${BASE_URL}/tag/${encodeTag(tag)}/`,
    isPartOf: { '@type': 'WebSite', name: '動画配信ナビ', url: BASE_URL },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/**
 * Build FAQ items from article sections.
 * Converts headings that contain question-like patterns into Q&A pairs.
 */
export function buildFaqFromSections(sections: Section[]): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];

  for (const sec of sections) {
    const heading = sec.heading;
    // Match headings that look like questions or common FAQ patterns
    const isQuestion =
      heading.includes('？') ||
      heading.includes('?') ||
      heading.includes('とは') ||
      heading.includes('おすすめ') ||
      heading.includes('メリット') ||
      heading.includes('デメリット') ||
      heading.includes('選び方') ||
      heading.includes('比較') ||
      heading.includes('料金') ||
      heading.includes('無料') ||
      heading.includes('登録') ||
      heading.includes('解約') ||
      heading.includes('評判') ||
      heading.includes('向いている');

    if (isQuestion) {
      // Strip HTML tags from content and take first ~200 chars as answer
      const plainText = sec.content
        .replace(/<[^>]+>/g, '')
        .replace(/\s+/g, ' ')
        .trim();
      const answer = plainText.length > 300 ? plainText.slice(0, 297) + '...' : plainText;

      // Convert heading to question format if not already
      let question = heading;
      if (!heading.includes('？') && !heading.includes('?')) {
        question = heading + 'とは？';
      }

      faqs.push({ question, answer });
    }
  }

  return faqs.slice(0, 5); // Limit to 5 FAQs
}

/** Encode tag for URL use (slug-safe) */
export function encodeTag(tag: string): string {
  return encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'));
}

/** Decode tag from URL slug */
export function decodeTag(slug: string): string {
  return decodeURIComponent(slug);
}
