'use client';

import { generalAffiliates, MOSHIMO_IMPRESSION_URL } from '@/data/affiliates';

type Size = 'full' | 'medium' | 'compact';

export default function AdBanner({ size = 'full' }: { size?: Size }) {
  const ad = generalAffiliates[Math.floor(Math.random() * generalAffiliates.length)];
  const hasMoshimo = 'moshimo' in ad && ad.moshimo;

  if (size === 'compact') {
    return (
      <div className="my-4 text-center">
        <a
          href={ad.url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="inline-block text-xs text-slate-400 hover:text-amber-300 transition-colors border border-white/10 border-dashed rounded-lg px-4 py-2 hover:border-amber-400/40"
        >
          PR: {ad.label}
        </a>
        {hasMoshimo && <img src={MOSHIMO_IMPRESSION_URL} width={1} height={1} style={{ border: 'none' }} alt="" loading="lazy" />}
      </div>
    );
  }

  if (size === 'medium') {
    return (
      <div className="my-6 bg-[#121826] rounded-xl border border-white/10 border-dashed p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="text-[9px] text-slate-500 block mb-1">PR</span>
            <p className="text-sm font-bold text-slate-100">{ad.label}</p>
          </div>
          <a
            href={ad.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="btn-gold text-xs px-4 py-2 flex-shrink-0"
          >
            詳しく見る
          </a>
        </div>
        {hasMoshimo && <img src={MOSHIMO_IMPRESSION_URL} width={1} height={1} style={{ border: 'none' }} alt="" loading="lazy" />}
      </div>
    );
  }

  return (
    <div className="my-8 bg-[#121826] rounded-xl border border-white/10 border-dashed p-5">
      <span className="text-[9px] text-slate-500 block mb-2">PR</span>
      <p className="text-base font-black text-white mb-1">{ad.label}</p>
      {ad.badge && (
        <span className="text-[9px] font-bold bg-amber-400/10 text-amber-300 border border-amber-400/30 px-1.5 py-0.5 rounded mb-3 inline-block">
          {ad.badge}
        </span>
      )}
      <p className="text-xs text-slate-400 mb-3">無料体験でお試しできます。いつでも解約OK。</p>
      <a
        href={ad.url}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="btn-gold text-sm px-6 py-2.5"
      >
        無料で始める →
      </a>
      {hasMoshimo && <img src={MOSHIMO_IMPRESSION_URL} width={1} height={1} style={{ border: 'none' }} alt="" loading="lazy" />}
    </div>
  );
}
