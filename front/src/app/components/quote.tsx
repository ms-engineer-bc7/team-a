import React from 'react';

interface QuoteDisplayProps {
  quote: string;
  author?: string; // authorとcommentはオプショナル（存在しない場合がある）にする
  comment?: string;
}

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ quote, author, comment }) => {
  return (
    <div>
      {/* 引用文は必ず表示する */}
      <p>{`引用文: "${quote}"`}</p>
      
      {/* 著者名が空でない場合のみ表示する */}
      {author && <p>{`著者: ${author}`}</p>}
      
      {/* コメントが空でない場合のみ表示する */}
      {comment && <p>{`コメント: ${comment}`}</p>}
    </div>
  );
};

export default QuoteDisplay;
