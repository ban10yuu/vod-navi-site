# VOD動画配信ナビ — 構築チェックリスト

## Phase 0: 計画策定
- [x] サービスリスト（20サービス）決定
- [x] カテゴリ体系決定（review, comparison, recommend, howto, cost）
- [x] カラーパレット決定（#7c3aed / #06b6d4）
- [x] アフィリエイト戦略決定
- [x] キャンペーン機能の設計

## Phase 1: プロジェクトスキャフォールド
- [x] create-next-app
- [x] @vercel/analytics インストール
- [x] next.config.ts 設定（output: export）

## Phase 2: 型定義とデータ構造
- [ ] src/lib/types.ts（ServiceInfo, Article, Campaign, AffiliateLink等）
- [ ] カテゴリ定数（CATEGORY_LABELS, CATEGORY_COLORS）

## Phase 3: データファイル作成
- [ ] src/data/services.ts（20サービスのマスターリスト）
- [ ] src/data/affiliates.ts（アフィリエイトリンク生成）
- [ ] src/data/campaigns.ts（キャンペーンデータ）
- [ ] src/lib/articles.ts（記事集約 + 日付フィルタ）

## Phase 4: グローバルCSS
- [ ] src/app/globals.css（ダークテーマ + VODスタイル）

## Phase 5: コンポーネント作成
- [ ] Header.tsx
- [ ] Footer.tsx
- [ ] ArticleCard.tsx
- [ ] AdBanner.tsx
- [ ] AffiliateWidget.tsx（VODサービス登録CTA）
- [ ] ServiceProductCard.tsx（サービス紹介カード）
- [ ] CampaignBanner.tsx（キャンペーン表示）
- [ ] Sidebar.tsx
- [ ] CommentSection.tsx

## Phase 6: ページ作成
- [ ] layout.tsx
- [ ] page.tsx（ホーム）
- [ ] article/[slug]/page.tsx（記事ページ）
- [ ] service/[slug]/page.tsx（サービス個別ページ）
- [ ] category/[slug]/page.tsx（カテゴリ一覧）
- [ ] campaigns/page.tsx（キャンペーン一覧）
- [ ] not-found.tsx

## Phase 7: 静的ファイル
- [ ] robots.txt
- [ ] sitemap.xml
- [ ] ads.txt

## Phase 8: コンテンツ生成
- [ ] 20サービス × 5記事 = 100記事（サブエージェント並列）
- [ ] キャンペーンデータ作成
- [ ] 日付分散（1日5記事ペース）

## Phase 9: 品質チェック
- [ ] ビルドテスト
- [ ] slug重複チェック
- [ ] 日付分布チェック
- [ ] 記事数確認

## Phase 10: Git + デプロイ
- [ ] git init + commit
- [ ] GitHub リポジトリ作成 + push
- [ ] Vercel デプロイ
- [ ] デプロイフック + crontab 設定

## Phase 11: SEO + 収益化
- [ ] OGP / Twitter Card
- [ ] JSON-LD 構造化データ
- [ ] AdSense設定
