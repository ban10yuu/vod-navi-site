export default function AuthorBox() {
  return (
    <div className="border border-purple-800/30 rounded-lg p-6 bg-gray-900/50 my-8">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-white font-bold text-xl">配</div>
        <div>
          <p className="font-bold text-lg text-white">動画配信ナビ編集部</p>
          <p className="text-sm text-gray-400">全20社のVODサービスを実際に契約・検証</p>
        </div>
      </div>
      <p className="text-sm text-gray-300 leading-relaxed">
        U-NEXT、Netflix、Amazonプライムビデオなど主要20社の動画配信サービスを全て実際に契約し、料金・作品数・画質・使いやすさを徹底比較。最新のキャンペーン情報もリアルタイムで更新しています。
      </p>
    </div>
  );
}
