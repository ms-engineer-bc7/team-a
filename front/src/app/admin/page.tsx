"use client";
import React, { useState, useEffect} from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { createQuote, getQuotes, } from '../_components/fetch';
import { log } from '../_utils/logger';
import { EMOTION_MAP } from '../_utils/constants';


const AdminQuotes: NextPage = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  const [emotionId, setEmotionId] = useState(0);
  const [quotes, setQuotes] = useState([]);
  // 初期状態を変更してオブジェクトを扱えるようにする
  const [selectedQuoteId, setSelectedQuoteId] = useState<{ tableName: string, id: number } | null>(null);
  const [table, setTable] = useState('encourage');  // 初期状態は 'encourage'
  const router = useRouter();

  useEffect(() => {
    const fetchQuotes = async () => {
      const data = await getQuotes();
      setQuotes(data);
      log('Quotes fetched:', data); // フェッチしたデータをログ出力
    };

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
      const newQuote = { table, quote, author, comment, emotion_id: emotionId };
      await createQuote(newQuote);
      log('New quote added:', newQuote); // 新しい名言を追加したことをログ出力
      alert('新しい名言を追加しました');
      // フォームをリセット
      setTable('encourage');
      setQuote('');
      setAuthor('');
      setComment('');
      setEmotionId(0);
    } catch (error) {
      log('Error adding quote:', error); // エラーをログ出力
      alert('名言の追加に失敗しました');
    }
  };

  const handleEditClick = (id: number) => {
    setSelectedQuoteId(id);
    // 編集ページへの遷移
    router.push(`/control/${id}`);
    log('Quote selected for editing:', id); // 編集する名言のIDをログ出力
  };


  return (
    <div>
      <h1>管理画面</h1>
      <form onSubmit={handleSubmit}>
      <select value={table} onChange={(e) => setTable(e.target.value)}>
        <option value="encourage">Encourage</option>
        <option value="positive">Positive</option>
      </select>
        <input
          type="text"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="名言"
          required
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="著者"
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="コメント"
        />
        <button type="button" onClick={() => handleEmotionClick('🥹')} style={{ fontSize: '25px' }}>🥹</button>
        <button type="button" onClick={() => handleEmotionClick('😢')} style={{ fontSize: '25px' }}>😢</button>
        <button type="button" onClick={() => handleEmotionClick('😭')} style={{ fontSize: '25px' }}>😭</button>
        <div style={{ fontSize: '2em' }}>{emotionId !== null ? Object.keys(EMOTION_MAP).find(key => EMOTION_MAP[key] === emotionId) : '未選択'}</div>
        <button type="submit">追加</button>
      </form>
      {/* 既存の名言リストと編集フォーム */}
      <button onClick={() => router.push('/control')}>編集画面へ</button>
      {/* "管理画面へ戻る"ボタンを追加 */}
      <button onClick={() => router.push('/')}>TOPへ戻る</button>
      {/* 名言のIDひとつずつに遷移する実装↓　未完成 */}
      {quotes.map((item) => (
        <div key={`${item.table_name}-${item.id}`}>
          <p>{(item).quote}</p>
          <button onClick={() => handleEditClick(`${item.table_name}-${item.id}`)}>編集</button>
        </div>
      ))}
    </div>
  );
};

export default AdminQuotes;
