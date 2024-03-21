import type { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { QuoteButton } from './components/button';
import QuoteDisplay from './components/quote'; // 引用データを表示するコンポーネントをインポート

const Home: NextPage = () => {
  const [quoteData, setQuoteData] = useState({
    quote: '',
    author: '',
    comment: ''
  });

  const handleQuoteFetch = (data: {quote: string, author: string, comment: string}) => {
    setQuoteData(data);
  };

  return (
    <div style={{ position: 'relative' }}>
      <h1>名言アプリ</h1>
      <div style={{ position: 'absolute', top: 0, right: 0, margin: '10px' }}>
        <Link href="/admin" passHref>
          <button style={{ padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            管理画面へ
          </button>
        </Link>
      </div>
      <QuoteButton emotionLevel={1} onQuoteFetch={handleQuoteFetch} />
      <QuoteButton emotionLevel={2} onQuoteFetch={handleQuoteFetch} />
      <QuoteButton emotionLevel={3} onQuoteFetch={handleQuoteFetch} />
      <QuoteDisplay quote={quoteData.quote} author={quoteData.author} comment={quoteData.comment} />
    </div>
  );
};

export default Home;

