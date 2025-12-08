# Portfolio Site

ミニマルでモダンなポートフォリオサイトです。

## 特徴

- **ミニマルデザイン**: シンプルで洗練されたライトテーマ
- **レスポンシブ対応**: モバイル・タブレット・デスクトップに最適化
- **スムーズアニメーション**: スクロールに連動した自然なアニメーション
- **軽量**: 外部ライブラリ不要、HTML/CSS/JSのみで構成

## ファイル構成

```
portfolio/
├── index.html              # メインページ
├── style.css               # スタイルシート
├── script.js               # JavaScript
├── images/                 # 画像フォルダ
│
├── work-hope.html          # 作品詳細：未来学園HOPE
├── work-freeschool.html    # 作品詳細：フリースクール
├── work-roulette.html      # 作品詳細：抽選ルーレット
├── work-reading.html       # 作品詳細：読書通帳
├── work-today.html         # 作品詳細：今日なにする？
│
├── _template-work.html     # テンプレート：詳細ページ
├── _template-card.html     # テンプレート：カード
└── README.md               # このファイル
```

## 作品を追加する方法（3ステップ）

### Step 1: 詳細ページを作成

1. `_template-work.html` をコピー
2. `work-新しい作品名.html` にリネーム
3. 【】の部分を書き換え

### Step 2: トップページにカードを追加

1. `_template-card.html` を開く
2. 「ここからコピー」〜「ここまでコピー」をコピー
3. `index.html` の `<div class="works-grid">` 内に貼り付け
4. 【】の部分を書き換え

### Step 3: 画像を追加（任意）

1. `images/` フォルダに画像を配置
2. HTMLの `work-image-placeholder` を `<img>` に置き換え

```html
<!-- 変更前 -->
<div class="work-image-placeholder">
  <span>作品名</span>
</div>

<!-- 変更後 -->
<img src="images/work-新しい作品名.png" alt="作品名" class="work-img">
```

## キャプチャ画像の追加

### トップページ（index.html）
```html
<img src="images/work-xxx.png" alt="作品名" class="work-img">
```

### 詳細ページ（work-xxx.html）
```html
<img src="images/work-xxx-detail.png" alt="作品名" class="work-detail-img">
```

**推奨サイズ**: 横1200px程度、16:10 or 16:9 の比率

## Coming Soon を公開済みに変更

```html
<!-- 変更前 -->
<span class="work-coming-soon">Coming Soon</span>

<!-- 変更後 -->
<a href="https://apps.apple.com/..." class="work-link" target="_blank">App Store</a>
```

## カラーテーマの変更

`style.css` の `:root` セクションでCSS変数を変更：

```css
:root {
  --color-accent: #06b6d4;  /* アクセントカラー（シアン）*/
  --color-bg: #fafafa;      /* 背景色 */
}
```

## ローカルでの確認方法

```bash
# Python 3
python -m http.server 8000

# ブラウザで開く
open http://localhost:8000
```

## デプロイ方法

### GitHub Pages

1. GitHubにリポジトリを作成
2. ファイルをプッシュ
3. Settings → Pages → Branch を `main` に設定

### Vercel / Netlify

1. GitHubリポジトリを連携
2. 自動でデプロイされます

## ライセンス

MIT License - 自由にカスタマイズしてご利用ください。
