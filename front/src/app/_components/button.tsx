"use client";
import { useState } from 'react';
import { EMOTION_MAP, API_BASE_URL } from '../_utils/constants';

// データを渡すためのコールバック関数
interface QuoteButtonProps {
  emotion: string; 
  onQuoteFetch: (data: {quote: string, author: string, comment: string}) => void; 
}

export const QuoteButton: React.FC<QuoteButtonProps> = ({ emotion, onQuoteFetch }) => {
  const [error, setError] = useState<string>('');

  const fetchQuote = async () => {
    try {
      const emotionLevel = EMOTION_MAP[emotion];
      const response = await fetch(`${API_BASE_URL}/quotes?emotion=${emotionLevel}`);
      if (!response.ok) {
        throw new Error('名言の取得に失敗しました');
      }
      const data = await response.json();
      console.log(data);//取得出来ているか確認
      // emotion_id が emotionLevel と一致する名言の配列を作る
    const matchingQuotes = data.filter((q: any) => q.emotion_id === emotionLevel);
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



