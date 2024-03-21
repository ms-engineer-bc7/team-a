"use client";
import React, { useState } from 'react';
import { NextPage } from 'next';
import { createQuote } from '../components/fetch';

const emotionMap = {
    '🥹': 1,
    '😢': 2,
    '😭': 3,
  };

const Admin: NextPage = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  const [emotionId, setEmotionId] = useState(0);


  const handleEmotionClick = (emotion: string) => {
    setEmotionId(emotionMap[emotion]);
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
      setEmotionId(0);
    } catch (error) {
      alert('名言の追加に失敗しました');
    }
  };

  return (
    <div>
      <h1>管理画面</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="button" onClick={() => handleEmotionClick('🥹')}>🥹</button>
        <button type="button" onClick={() => handleEmotionClick('😢')}>😢</button>
        <button type="button" onClick={() => handleEmotionClick('😭')}>😭</button>
        <div>選択した感情: {emotionId !== null ? Object.keys(emotionMap).find(key => emotionMap[key] === emotionId) : '未選択'}</div>
        <button type="submit">追加</button>
      </form>
    </div>
  );
};

export default Admin;
