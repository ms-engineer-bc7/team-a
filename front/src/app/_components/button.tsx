"use client";
// QuoteButton.tsx (修正版)
import { useState } from 'react';

// データを渡すためのコールバック関数
interface QuoteButtonProps {
  emotion: string; 
  onQuoteFetch: (data: {quote: string, author: string, comment: string}) => void; 
}

export const QuoteButton: React.FC<QuoteButtonProps> = ({ emotion, onQuoteFetch }) => {
  const [error, setError] = useState<string>('');
  const emotionMap = {
    '🥹': 1,
    '😢': 2,
    '😭': 3,
  };

  const fetchQuote = async () => {
    try {
      const emotionLevel = emotionMap[emotion];
      const response = await fetch(`http://localhost:5000/quotes?emotion=${emotionLevel}`);
      if (!response.ok) {
        throw new Error('名言の取得に失敗しました');
      }
      const data = await response.json();
      console.log(data);//取得出来ているか確認
      // emotion_id が emotionLevel と一致する名言の配列を作る
    const matchingQuotes = data.filter(q => q.emotion_id === emotionLevel);
    // 一致する名言があれば、その中からランダムに一つを選ぶ
    if (matchingQuotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * matchingQuotes.length);
      const randomQuote = matchingQuotes[randomIndex];
      onQuoteFetch(randomQuote); // ランダムに選んだ名言データを親コンポーネントに渡す
    } else {
      throw new Error('一致する名言が見つかりませんでした');
    }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('予期せぬエラーが発生しました');
      }
    }
  };

  return (
    <div>
      <button onClick={fetchQuote} style={{ fontSize: '3em' }}>{emotion}</button>
      {error && <p>Error: {error}</p>}
    </div>
  );
};



