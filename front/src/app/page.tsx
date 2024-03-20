import type { NextPage } from 'next';
import Link from 'next/link'; // Linkコンポーネントをインポート
import { QuoteButton } from './components/button';

const Home: NextPage = () => {
  return (
    <div style={{ position: 'relative' }}>
      <h1>名言アプリ</h1>
      <div style={{ position: 'absolute', top: 0, right: 0, margin: '10px' }}>
        {/* 管理画面へのリンクを配置 */}
        <Link href="/admin" passHref>
          <button style={{ padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            管理画面へ
          </button>
        </Link>
      </div>
      <QuoteButton emotionLevel={1} />
      <QuoteButton emotionLevel={2} />
      <QuoteButton emotionLevel={3} />
    </div>
  );
};

export default Home;
