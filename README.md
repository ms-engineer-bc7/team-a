# チーム開発 Team-A
## 名言アプリ

## サービス内容
- その感情にあった心に届く名言をお届けするアプリ

## 作成理由
- BCで辛い時や行き詰った時元気がない時など、心に響くような言葉が励ましになる
- ただ会話をするのではなくその時選択した気分によって、適切な名言を返し、
- 元気が出るような励ましてくれるアプリを作成したかったため

## 言語選定
- Python
- LLMを使用予定での言語選択
- 今回はLLMは実装できていない

## 構築環境

- フロント
  - Next.js app router
  - 多言語、新しいフレームワーク、ORMにチャレンジしているため
  - 今回は使用が慣れているNext.jsを選定

- バックエンド
  - 言語            : Python
  - フレームワーク   : Flask
  - ORM             : pgAdmin
  - DB　　　　　　　 : PostgreSQL
  - Djangoを学習しながらで開発を進められる時間もなさそうだったため
  - Stack OverflowでPythonの中でも技術トレンドの順位でも上位の
  - フレームワークのFlaskを選択
  - ORMはPostgreSQL用の触ったことがないpgAdminにチャレンジ
  - サーバーとORMは新しいものに触れるため、DBは使用したことがある
  - PostgreSQLを選定

- 認証・認可
  - Firebase  管理者が入れる編集画面に遷移する際に使用
  - メールアドレスのサインアップ・ログイン
  - Googleアカウント認証もいれた

## タスク管理、共有事項等
- Notion (https://www.notion.so/450b8cca1d3d4f37bf29797f9c9eceb9?v=d9c8f92e00e24701a7e684aac1195cee) 
- カンバン形式で分担と作業中が可視化できるようにした
- 分担した部分はやっていない方がわかるように
- Notionに習得知識・手順をまとめて共有


================================================================================


# API設計書

## 概要
- 名言の取得、追加、変更、削除を行う。

## リソース一覧
- emotion（感情🥹😢😭）
- positive（前向き）
- encourage（励まし）

## 操作概要
- GET    : 登録済名言の取得
- POST   : 新規名言の追加
- PUT    : 名言の内容変更
- DELETE : 名言の削除

## エンドポイント一覧
- `/quote`（全名言）
- `/quote/positive/{id}`（positive名言）
- `/quote/encourage/{id}`（encourage名言）
  
 ## 遷移先一覧 
- `/login`（ログイン・サインアップ画面）
- `/admin`（管理者・編集画面　ここでGET・POST実装）
- `/control`（編集画面　ここで各名言毎GET・PUT・DELETE実装）

## HTTPメソッドとパスパラメータ
- GET 　 　　すべての名言を取得
- GET {id} 　指定されたIDの名言を取得
- POST 　　  新しい名言を作成・追加
- PUT {id} 　指定されたIDの名言を更新
- DELETE{id} 指定されたIDの名言を削除

## ステータスコード
- 200 : リクエスト成功
- 201 : 登録成功、リソースが作成される
- 400 : リクエストが不正
- 500 : ネットワークエラー

## リクエスト・レスポンス
### GET:名言取得
- **リクエスト**: なし
- - パスパラメータ: `/quote`
- **レスポンス**:
  ```json
  {
    "id": "1",
    "table_name": "encourages",
    "quote": "ありがとう",
    "author": "言った人",
    "comment": "その人の生い立ちや成果など",
    "emotion_id": "1"
  }
  ```
---
- ### GET:特定の名言取得
- **リクエスト**:
  - パスパラメータ: ``/quote/encourages　or　positives/{id}`
- **レスポンス**:
  ```json
  {
    "id": "5",
    "table_name": "positives",
    "quote": "ポジティブな名言",
    "author": "言った人",
    "comment": "その人の生い立ちや成果など",
    "emotion_id": "3"
  }
  ```
---
- ### POST:名言作成
- **リクエスト**:
  ```json
  {
    "table_name": "encourages",
    "quote": "励ます名言",
    "author": "言った人",
    "comment": "その人の生い立ちや成果など",
    "emotion_id": "2"
  }
  ```
- **レスポンス**:
  ```json
  {
    "id": "10",
    "table_name": "encourages",
    "quote": "励ます名言",
    "author": "言った人",
    "comment": "その人の生い立ちや成果など",
    "emotion_id": "2"
  }
  ```

---
- ### 名言更新
- **リクエスト**:
  - パスパラメータ: ``/quote/encourages　or　positives/{id}`
  ```json
  {
    "id": "10",
    "table_name": "encourages",
    "quote": "励ます名言",
    "author": "言った人",
    "comment": "その人の生い立ちや成果など",
    "emotion_id": "2"
  }
   ```
- **レスポンス**:
  ```json
  {
    "id": "10",
    "table_name": "encourages",
    "quote": "励ます名言",
    "author": "言った人",
    "comment": "その人の生い立ちや成果など",
    "emotion_id": "3"
  }
  ```

---
- ### 名言削除
- **リクエスト**:
  - パスパラメータ: ``/quote/encourages　or　positives/{id}`
- **レスポンス**:Got a DELETE request