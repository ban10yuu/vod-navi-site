'use client';

import { useState } from 'react';
import Link from 'next/link';
import { serviceList } from '@/data/services';
import { searchArticles } from '@/lib/articles';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [serviceDropdown, setServiceDropdown] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  const results = query.length >= 2 ? searchArticles(query).slice(0, 5) : [];

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a14]/95 backdrop-blur border-b border-[#252535]">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl">🎬</span>
          <span className="font-black text-lg text-white group-hover:text-[#7c3aed] transition-colors">
            動画配信ナビ
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">ホーム</Link>

          {/* Services dropdown */}
          <div className="relative">
            <button
              onClick={() => setServiceDropdown(!serviceDropdown)}
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
            >
              サービス一覧
              <svg className={`w-3.5 h-3.5 transition-transform ${serviceDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {serviceDropdown && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-[#1a1a28] border border-[#252535] rounded-lg shadow-xl shadow-black/40 py-2 max-h-80 overflow-y-auto">
                {serviceList.map(s => (
                  <Link
                    key={s.slug}
                    href={`/service/${s.slug}/`}
                    className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-[#252535] transition-colors"
                    onClick={() => setServiceDropdown(false)}
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/campaigns/" className="text-gray-400 hover:text-white transition-colors">キャンペーン</Link>

          {/* Search */}
          <div className="relative">
            <button onClick={() => setSearchOpen(!searchOpen)} className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            {searchOpen && (
              <div className="absolute top-full right-0 mt-2 w-72">
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="記事を検索..."
                  className="w-full bg-[#1a1a28] border border-[#252535] rounded-lg px-4 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#7c3aed]"
                  autoFocus
                />
                {results.length > 0 && (
                  <div className="mt-1 bg-[#1a1a28] border border-[#252535] rounded-lg shadow-xl shadow-black/40 py-1">
                    {results.map(a => (
                      <Link
                        key={a.slug}
                        href={`/article/${a.slug}/`}
                        className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-[#252535] transition-colors truncate"
                        onClick={() => { setSearchOpen(false); setQuery(''); }}
                      >
                        {a.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-400 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#12121e] border-t border-[#252535] py-4 px-4">
          <Link href="/" className="block py-2 text-gray-400 hover:text-white" onClick={() => setMenuOpen(false)}>ホーム</Link>
          <Link href="/campaigns/" className="block py-2 text-gray-400 hover:text-white" onClick={() => setMenuOpen(false)}>キャンペーン</Link>
          <div className="mt-2 border-t border-[#252535] pt-2">
            <p className="text-xs text-gray-600 mb-2">サービス一覧</p>
            {serviceList.map(s => (
              <Link
                key={s.slug}
                href={`/service/${s.slug}/`}
                className="block py-1.5 text-sm text-gray-400 hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                {s.title}
              </Link>
            ))}
          </div>
          <div className="mt-3">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="記事を検索..."
              className="w-full bg-[#1a1a28] border border-[#252535] rounded-lg px-4 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#7c3aed]"
            />
          </div>
        </div>
      )}
    </header>
  );
}
