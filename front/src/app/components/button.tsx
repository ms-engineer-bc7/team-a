"use client";
import { useState } from 'react';

interface QuoteButtonProps {
  emotionLevel: number;
}

export const QuoteButton: React.FC<QuoteButtonProps> = ({ emotionLevel }) => {
  const [quote, setQuote] = useState('');

  const fetchQuote = async () => {
    const response = await fetch(`http://localhost:5000/quotes?emotion=${emotionLevel}`);
    const data = await response.json();
    setQuote(data.quote);
  };

  return (
    <div>
      <button onClick={fetchQuote}>感情レベル {emotionLevel}</button>
      <p>{quote}</p>
    </div>
  );
};

