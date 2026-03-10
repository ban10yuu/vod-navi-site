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
    <div className="mt-10 bg-[#12121e] border border-[#252535] rounded-lg p-5">
      <h3 className="font-black text-base text-white mb-4">コメント</h3>

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="名前（任意）"
          className="w-full bg-[#0a0a14] border border-[#252535] rounded-lg px-4 py-2 text-sm text-white placeholder-gray-600 mb-2 focus:outline-none focus:border-[#7c3aed]"
        />
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="コメントを書く..."
          rows={3}
          className="w-full bg-[#0a0a14] border border-[#252535] rounded-lg px-4 py-2 text-sm text-white placeholder-gray-600 mb-2 focus:outline-none focus:border-[#7c3aed] resize-none"
        />
        <button
          type="submit"
          className="text-sm font-bold text-white bg-[#7c3aed] hover:bg-[#6d28d9] px-5 py-2 rounded-lg transition-colors"
        >
          投稿する
        </button>
      </form>

      {comments.length > 0 ? (
        <div className="space-y-3">
          {comments.map(c => (
            <div key={c.id} className="bg-[#0a0a14] rounded-lg p-3 border border-[#252535]">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-[#7c3aed]">{c.name}</span>
                <span className="text-[10px] text-gray-600">{c.date}</span>
              </div>
              <p className="text-sm text-gray-400">{c.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-600 text-center py-4">まだコメントはありません</p>
      )}
    </div>
  );
}
