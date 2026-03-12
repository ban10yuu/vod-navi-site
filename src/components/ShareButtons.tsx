'use client';

import { useState } from 'react';

interface ShareButtonsProps {
  title?: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const text = title || (typeof document !== 'undefined' ? document.title : '');
    const encoded = encodeURIComponent(url);
    const encodedText = encodeURIComponent(text);

    let shareUrl = '';
    switch (platform) {
      case 'x':
        shareUrl = `https://x.com/intent/tweet?url=${encoded}&text=${encodedText}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encoded}`;
        break;
      case 'line':
        shareUrl = `https://social-plugins.line.me/lineit/share?url=${encoded}&text=${encodedText}`;
        break;
    }
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
    }
  };

  const handleCopy = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = url;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silent fail
    }
  };

  return (
    <div className="flex items-center gap-3 my-6">
      <span className="text-sm font-bold text-slate-600">共有:</span>

      {/* X (Twitter) */}
      <button
        onClick={() => handleShare('x')}
        aria-label="Xでシェア"
        className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:opacity-80 transition-opacity"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>

      {/* Facebook */}
      <button
        onClick={() => handleShare('facebook')}
        aria-label="Facebookでシェア"
        className="w-10 h-10 rounded-full text-white flex items-center justify-center hover:opacity-80 transition-opacity"
        style={{ backgroundColor: '#1877f2' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 1.09.044 1.613.115v3.146c-.427-.044-.72-.065-.95-.065-1.35 0-1.872.513-1.872 1.846v2.516h3.332l-.468 3.668h-2.864v8.312C19.396 23.108 24 18.104 24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.628 3.874 10.35 9.101 11.691z" />
        </svg>
      </button>

      {/* LINE */}
      <button
        onClick={() => handleShare('line')}
        aria-label="LINEでシェア"
        className="w-10 h-10 rounded-full text-white flex items-center justify-center hover:opacity-80 transition-opacity"
        style={{ backgroundColor: '#06c755' }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.365 9.864c.58 0 1.05.47 1.05 1.05s-.47 1.05-1.05 1.05h-2.1v1.32h2.1c.58 0 1.05.47 1.05 1.05s-.47 1.05-1.05 1.05h-3.15c-.58 0-1.05-.47-1.05-1.05v-5.46c0-.58.47-1.05 1.05-1.05h3.15c.58 0 1.05.47 1.05 1.05s-.47 1.05-1.05 1.05h-2.1v.89h2.1zm-5.25 3.42c0 .42-.25.8-.63.97-.13.06-.26.08-.4.08-.23 0-.46-.08-.64-.25l-2.95-3.2v2.4c0 .58-.47 1.05-1.05 1.05s-1.05-.47-1.05-1.05v-5.46c0-.42.25-.8.63-.97.38-.18.83-.1 1.13.2l2.87 3.11V7.83c0-.58.47-1.05 1.05-1.05s1.05.47 1.05 1.05v5.46zm-7.35.53c-.58 0-1.05-.47-1.05-1.05v-5.46c0-.58.47-1.05 1.05-1.05s1.05.47 1.05 1.05v5.46c0 .58-.47 1.05-1.05 1.05zm-3.15 0h-2.1c-.58 0-1.05-.47-1.05-1.05v-5.46c0-.58.47-1.05 1.05-1.05s1.05.47 1.05 1.05v4.41h1.05c.58 0 1.05.47 1.05 1.05s-.47 1.05-1.05 1.05zM24 10.32C24 4.625 18.627 0 12 0S0 4.625 0 10.32c0 5.104 4.526 9.378 10.638 10.187.414.089.977.273 1.12.626.127.32.083.82.04 1.143l-.18 1.08c-.055.327-.255 1.278 1.12.697 1.374-.58 7.42-4.37 10.124-7.48C24.316 15.063 24 12.776 24 10.32z" />
        </svg>
      </button>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        aria-label="リンクをコピー"
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
          copied
            ? 'bg-green-500 text-white'
            : 'bg-gray-100 text-slate-500 hover:bg-purple-100 hover:text-purple-600'
        }`}
      >
        {copied ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        )}
      </button>
    </div>
  );
}
