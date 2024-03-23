"use client";
import type { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { QuoteButton } from './_components/button';
import QuoteDisplay from './_components/quote';
import { log } from './_utils/logger';

const Home: NextPage = () => {
  const [quoteData, setQuoteData] = useState({
    quote: '',
    author: '',
    comment: ''
  });

  const handleQuoteFetch = (data: {quote: string, author: string, comment: string}) => {
    setQuoteData(data);
    log('Quote fetched:', data);  // デバッグ情報をログ出力
  };

  return (
    <div style={{ position: 'relative' }}>
      <h1>名言アプリ</h1>
      <div style={{ position: 'absolute', top: 0, right: 0, margin: '10px' }}>
        <Link href="/login" passHref>
          <button style={{ padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            管理画面へ
          </button>
        </Link>
      </div>
      <QuoteButton emotion="🥹" onQuoteFetch={handleQuoteFetch} />
      <QuoteButton emotion="😢" onQuoteFetch={handleQuoteFetch} />
      <QuoteButton emotion="😭" onQuoteFetch={handleQuoteFetch} />
      <QuoteDisplay quote={quoteData.quote} author={quoteData.author} comment={quoteData.comment} />
    </div>
  );
};

export default Home;




