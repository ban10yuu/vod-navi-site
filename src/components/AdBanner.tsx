'use client';

import { generalAffiliates } from '@/data/affiliates';

type Size = 'full' | 'medium' | 'compact';

export default function AdBanner({ size = 'full' }: { size?: Size }) {
  const ad = generalAffiliates[Math.floor(Math.random() * generalAffiliates.length)];

  if (size === 'compact') {
    return (
      <div className="my-4 text-center">
        <a
          href={ad.url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="inline-block text-xs text-gray-500 hover:text-[#7c3aed] transition-colors border border-[#252535] rounded-lg px-4 py-2 hover:border-[#7c3aed]/30"
        >
          PR: {ad.label}
        </a>
      </div>
    );
  }

  if (size === 'medium') {
    return (
      <div className="my-6 bg-[#12121e] border border-[#252535] rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[9px] text-gray-600 block mb-1">PR</span>
            <p className="text-sm font-bold text-white">{ad.label}</p>
          </div>
          <a
            href={ad.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-xs font-bold text-white bg-[#7c3aed] hover:bg-[#6d28d9] px-4 py-2 rounded-lg transition-colors flex-shrink-0"
          >
            詳しく見る
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 bg-gradient-to-r from-[#7c3aed]/10 to-[#06b6d4]/10 border border-[#252535] rounded-lg p-5">
      <span className="text-[9px] text-gray-600 block mb-2">PR</span>
      <p className="text-base font-black text-white mb-1">{ad.label}</p>
      {ad.badge && (
        <span className="campaign-badge mb-3 inline-block">{ad.badge}</span>
      )}
      <p className="text-xs text-gray-500 mb-3">無料体験でお試しできます。いつでも解約OK。</p>
      <a
        href={ad.url}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="inline-block text-sm font-bold text-white bg-[#7c3aed] hover:bg-[#6d28d9] px-6 py-2.5 rounded-lg transition-colors"
      >
        無料で始める →
      </a>
    </div>
  );
}
