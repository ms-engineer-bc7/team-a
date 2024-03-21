"use client";
// QuoteButton.tsx (修正版)
import { useState } from 'react';

interface QuoteButtonProps {
  emotionLevel: number;
  onQuoteFetch: (data: {quote: string, author: string, comment: string}) => void; // データを渡すためのコールバック関数
}

export const QuoteButton: React.FC<QuoteButtonProps> = ({ emotionLevel, onQuoteFetch }) => {
  const [error, setError] = useState<string>('');

  const fetchQuote = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/quotes?emotion=${emotionLevel}`);
      if (!response.ok) {
        throw new Error('名言の取得に失敗しました');
      }
      const data = await response.json();
      onQuoteFetch(data); // 引用データを親コンポーネントに渡す
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
      <button onClick={fetchQuote}>感情レベル {emotionLevel}</button>
      {error && <p>Error: {error}</p>}
    </div>
  );
};



