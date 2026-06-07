# 株式会社幸洋 LP

## 結論

GitHub Pagesで公開しやすい、HTML/CSS/JavaScriptのみの1ページ完結型LPです。フォーム送信処理は実装せず、CTAは `info@koyo-jpn.biz` 宛てのメール作成リンクへ遷移します。

## 前提

- 主要CTAは、件名と本文テンプレート付きの `mailto:info@koyo-jpn.biz` に設定しています。
- メールアプリが開かない環境向けに、メールアドレス表示とコピー導線を追加しています。
- メールは `info@koyo-jpn.biz` を表示しています。
- 住所は表示していません。
- パートナー会社として、日本冠亜物流株式会社 トップアジアジャパン、AST INTERNATIONAL LOGITSITICS を表示しています。
- 輸送可否、通関可否、船社受託可否を断定する表現は入れていません。
- プライバシーポリシーは `privacy.html` として作成しています。

## 実装方針

- 外部ライブラリ、外部画像、CDNに依存しない静的構成です。
- ヒーローの物流診断ダッシュボード、カード、チェックリスト、タイムライン、FAQはHTML/CSSで構成しています。
- 問い合わせ先は `script.js` の `CONTACT_CONFIG.email`、件名は `CONTACT_CONFIG.subject`、本文は `CONTACT_CONFIG.body` で管理しています。

## ファイル構成

```text
site/
  index.html
  privacy.html
  styles.css
  script.js
  README.md
```

## 実行方法

ローカル確認:

```bash
python3 -m http.server 4173 --directory site
```

ブラウザで以下を開きます。

```text
http://localhost:4173
```

## GitHub Pages公開方法

1. GitHubリポジトリへ `site/` 配下のファイルを配置します。
2. GitHubの `Settings > Pages` を開きます。
3. 公開元を対象ブランチとフォルダに設定します。
4. 独自ドメインを使う場合は、DNS設定とGitHub Pages側のドメイン設定を確認します。

## 検証方法

- PC、タブレット、スマホ幅で表示崩れがないか確認する。
- ハンバーガーメニューが開閉できるか確認する。
- FAQが開閉できるか確認する。
- すべての主要CTAが `info@koyo-jpn.biz` 宛てのメール作成リンクへ遷移するか確認する。
- メールアドレスコピー導線が動作するか確認する。
- フッターから `privacy.html` に移動できるか確認する。
- `title`、`description`、OGP、Organization構造化データが入っているか確認する。

## 公開前チェック

- メールリンクの件名・本文テンプレートが実務に合っているか確認する。
- パートナー会社名の正式表記を公開前に確認する。
- プライバシーポリシーの内容を公開前に確認する。
- 現行サイトを上書きする場合は、事前にバックアップと戻し手順を残す。
