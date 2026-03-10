# Lessons Learned

## 2026-03-10: 収益サイト構築時のSEO必須要件

**問題**: 収益目的のサイトを構築した際、SEO対策が不完全だった（sitemap.xml未生成、metadataBase未設定、keywords未設定、canonical URL未設定、Google Search Console verification未設定）。

**ルール**: 「収益目的のサイト」を構築する場合、以下を**デフォルトで**全て含めること：

### SEO必須チェックリスト
- [ ] metadataBase（OG URL生成の基盤）
- [ ] robots メタデータ（GoogleBot指示、max-image-preview等）
- [ ] keywords メタタグ（ターゲットキーワード30-40個）
- [ ] canonical URL（layout + 各動的ページ）
- [ ] sitemap.ts（全ページ自動生成、ビルド時更新）
- [ ] robots.txt（sitemap参照付き）
- [ ] Google Search Console verification
- [ ] 各動的ページの generateMetadata に alternates.canonical 設定
- [ ] JSON-LD 構造化データ（Article, BreadcrumbList等）

### アフィリエイト必須チェックリスト
- [ ] ASP登録（A8.net, バリューコマース, もしもアフィリエイト等）
- [ ] アフィリエイトリンク実装（tracking ID付き）
- [ ] アフィリエイト開示文言
- [ ] nofollow設定

### 広告必須チェックリスト
- [ ] Google AdSense設定
- [ ] Google Analytics (GA4)設定

**教訓**: matome-site-builder スキルにもこのチェックリストを組み込むこと。サイト構築 = SEO完備がデフォルト。
