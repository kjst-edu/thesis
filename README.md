# Quarto (Pandoc) で卒業論文を書く人のためのテンプレート

[Quarto](https://quarto.org/) を用いて卒業論文（日本語）を執筆する人のためのテンプレートです。
Markdown 形式で記述して、Python や R のコードとその結果を埋め込んだ文書を生成することができます。


## インストール

Windows/Mac でターミナルを立ち上げる。

## Quarto のインストール

Windows の場合

```
winget install -e --id Posit.Quarto
```

Mac (homebrew)

```
brew install quarto
```

##　LaTeX のインストール

ターミナルで `tlmgr` を実行してみる。うまくいけば texlive がインストールされていると思われる（たぶん何もやらなくていい）。

```
tlmgr
```

コマンドが見つからないのようなエラーが出た場合は Quarto 推奨の TinyTeX をインストールする。


```
quarto install tinytex
```

このままでは日本語文書を生成できない。原ノ味フォントをインストールする。少しだけ難しいのでスクリプトを使う。
（もしまだであれば）このテンプレートのフォルダを作業ディレクトリにしてターミナルを開く。

```
quarto run etc/install-haranoaji.ts
```

## サンプルPDF の生成

このサンプルは Python のコードが含まれている。依存関係は uv で管理しているのでインストールする（省略）。

（uv はインストールできたものとして）以下のコードを実行（一度だけ）

```
uv sync
```

次のコマンドを実行するとPDF（とHTML）の文書が生成される。(`_output` フォルダに入っているはず)

```
uv run quarto render
```


## 書く

基本設定は `_quarto.yml` を変更してください。本文は `thesis.qmd` に書いていく。

レイアウトの調整は Quarto/Padoc/LaTeX の知識が必要になる。頑張って調整したい人は `asset` フォルダの中を見る。


## 参考文献

`referencec.bib` にサンプルの書誌情報を入れている。Zoteroなどの文献管理ソフトを使って BibLaTeX 形式で出力したものを使うとよい（BibTeX形式ではないので注意）。


