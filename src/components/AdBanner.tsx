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
          className="inline-block text-xs text-slate-400 hover:text-purple-600 transition-colors border border-gray-200 border-dashed rounded-lg px-4 py-2 hover:border-purple-300"
        >
          PR: {ad.label}
        </a>
      </div>
    );
  }

  if (size === 'medium') {
    return (
      <div className="my-6 bg-gray-50 rounded-xl border border-gray-200 border-dashed p-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[9px] text-slate-400 block mb-1">PR</span>
            <p className="text-sm font-bold text-slate-900">{ad.label}</p>
          </div>
          <a
            href={ad.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors flex-shrink-0"
          >
            詳しく見る
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 bg-gray-50 rounded-xl border border-gray-200 border-dashed p-5">
      <span className="text-[9px] text-slate-400 block mb-2">PR</span>
      <p className="text-base font-black text-slate-900 mb-1">{ad.label}</p>
      {ad.badge && (
        <span className="text-[9px] font-bold bg-amber-50 text-amber-600 border border-amber-200 px-1.5 py-0.5 rounded mb-3 inline-block">
          {ad.badge}
        </span>
      )}
      <p className="text-xs text-slate-400 mb-3">無料体験でお試しできます。いつでも解約OK。</p>
      <a
        href={ad.url}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="inline-block text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 px-6 py-2.5 rounded-lg transition-colors"
      >
        無料で始める →
      </a>
    </div>
  );
}
