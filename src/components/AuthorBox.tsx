export default function AuthorBox() {
  return (
    <div className="border border-amber-400/20 rounded-xl p-6 bg-gradient-to-br from-[#161e2e] to-[#111722] my-8">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-300 to-amber-600 flex items-center justify-center text-[#1c1305] font-black text-xl shadow-[0_0_18px_rgba(245,185,65,0.35)]">配</div>
        <div>
          <p className="font-bold text-lg text-white">動画配信ナビ編集部</p>
          <p className="text-sm text-slate-400">全20社のVODサービスを実際に契約・検証</p>
        </div>
      </div>
      <p className="text-sm text-slate-300 leading-relaxed">
        U-NEXT、Netflix、Amazonプライムビデオなど主要20社の動画配信サービスを全て実際に契約し、料金・作品数・画質・使いやすさを徹底比較。最新のキャンペーン情報もリアルタイムで更新しています。
      </p>
    </div>
  );
}
