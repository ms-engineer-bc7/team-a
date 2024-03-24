"use client";
import { useRouter } from 'next/navigation'; // 追加
import React, { useState, useEffect} from 'react';
import { NextPage } from 'next';
import { createQuote, getQuotes, deleteQuote } from '../_components/fetch';
import { log } from '../_utils/logger';
import { EMOTION_MAP } from '../_utils/constants';
// 必要なFirebaseの認証機能をインポートします
import { auth } from '../../../firebase'; // team-a\front\firebase.tsに格納

//Quote オブジェクトの型を定義
interface Quote {
  id: number;
  quote: string;
  author: string;
  comment?: string;  // commentはオプショナル（存在しない場合もある）とする場合
  emotion_id: number;
}

const emotionMap: { [key: string]: number } = {
  '🥹': 1,
  '😢': 2,
  '😭': 3,
};

const AdminEditQuote: NextPage = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  const [emotionId, setEmotionId] = useState<number | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]); // quotes 状態変数の型を Quote[] に設定
  const [selectedQuoteId, setSelectedQuoteId] = useState<number | null>(null);
  const router = useRouter();

  const fetchQuotes = async () => {
    try {
      const data = await getQuotes();
      log('Quotes fetched:', data); // ログ出力
      setQuotes(data);
    } catch (error) {
      log('Error fetching quotes:', error); // エラーログ出力
    }
  };


  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleEmotionClick = (emotion: string) => {
    setEmotionId(EMOTION_MAP[emotion]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (emotionId === null) {
        alert('感情を選択してください');
        return;
      }
    try {
      const newQuote = { quote, author, comment, emotion_id: emotionId };
      await createQuote(newQuote);
      alert('新しい名言を追加しました');
      // フォームをリセット
      setQuote('');
      setAuthor('');
      setComment('');
      setEmotionId(null);
      // 名言リストを再取得
      fetchQuotes();
    } catch (error) {
      alert('名言の追加に失敗しました');
    }
  };

  const handleDelete = async (id: number, resourceType: string) => {
    // ユーザーに確認を求める
    const isConfirmed = window.confirm('本当に削除しますか？');
    if (isConfirmed) {
      // 確認が取れた場合のみ削除を実行
      try {
        await deleteQuote(id, resourceType);
        log('Quote deleted:', id); // 削除した名言のIDをログ出力
        fetchQuotes(); // 削除後の名言リストを再取得
      } catch (error) {
        log('Error deleting quote:', error); // エラーをログ出力
      }
    }
    // ユーザーがキャンセルを選択した場合、ここには到達しない
  };

  // ログアウト処理
  const handleLogout = async () => {
    try {
      await auth.signOut();
      alert('ログアウトしました');
      router.push('/login'); // ログアウト後、ログインページにリダイレクト
    } catch (error) {
      console.error('ログアウトに失敗しました:', error);
      alert('ログアウトに失敗しました');
    }
  };

  return (
    <div>
      <h1>管理画面</h1>
      <form onSubmit={handleSubmit}>
        {/* フォームの内容 */}
      </form>
      {/* 既存の名言リストと編集フォーム */}
      {quotes.map((quote: any, index: number) => (
          <div key={index}>
          <p>{quote.quote}</p>
          <button onClick={() => setSelectedQuoteId(quote.id)}>編集</button>
          <button onClick={() => handleDelete(quote.id, 'encourage')}>エンカレッジメント削除</button>
          <button onClick={() => handleDelete(quote.id, 'positive')}>ポジティブ削除</button>
       {/* 削除ボタン */}
        </div>
      ))}
      {/* "管理画面へ戻る"ボタンを追加 */}
      <button onClick={() => router.push('/admin')}>管理画面へ戻る</button>
      {/* "ログアウト"ボタンを追加 */}
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
};

export default AdminEditQuote;
