import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../../firebase'; // Firebaseの設定ファイルをインポート

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLoginWithEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard'); // ログイン成功後に管理画面へリダイレクト
    } catch (error) {
      console.error('ログインエラー:', error);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/dashboard'); // ログイン成功後に管理画面へリダイレクト
    } catch (error) {
      console.error('Googleログインエラー:', error);
    }
  };

  return (
    <div>
      <h1>ログイン</h1>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLoginWithEmail}>メールでログイン</button>
      <button onClick={handleLoginWithGoogle}>Googleアカウントでログイン</button>
    </div>
  );
};

export default LoginPage;