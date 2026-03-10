'use client';

import { useState, useEffect } from 'react';

interface Comment {
  id: string;
  name: string;
  text: string;
  date: string;
}

export default function CommentSection({ articleSlug }: { articleSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const storageKey = `vod-comments-${articleSlug}`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setComments(JSON.parse(saved));
  }, [storageKey]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      name: name.trim() || '匿名',
      text: text.trim(),
      date: new Date().toLocaleDateString('ja-JP'),
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setText('');
  };

  return (
    <div className="mt-10 bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h3 className="font-black text-base text-slate-900 mb-4">コメント</h3>

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="名前（任意）"
          className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-slate-900 placeholder-slate-400 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="コメントを書く..."
          rows={3}
          className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-slate-900 placeholder-slate-400 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
        />
        <button
          type="submit"
          className="text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg transition-colors"
        >
          投稿する
        </button>
      </form>

      {comments.length > 0 ? (
        <div className="space-y-3">
          {comments.map(c => (
            <div key={c.id} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-purple-600">{c.name}</span>
                <span className="text-[10px] text-slate-400">{c.date}</span>
              </div>
              <p className="text-sm text-slate-600">{c.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-400 text-center py-4">まだコメントはありません</p>
      )}
    </div>
  );
}
