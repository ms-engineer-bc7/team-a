'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // 追加
// import { useRouter } from 'next/router';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider , createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../../firebase'; // Firebaseの設定ファイルをインポート
import { log } from '../_utils/logger';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newEmail, setNewEmail] = useState(''); // 新しいstateを追加
  const [newPassword, setNewPassword] = useState(''); // 新しいstateを追加
  const router = useRouter();

  const handleLoginWithEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      log('User logged in with email:', email); // ログ出力
      router.push('/admin'); // ログイン成功後に管理画面へリダイレクト
    } catch (error) {
      log('Login error:', error); // ログ出力
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      log('User logged in with Google'); // ログ出力
      router.push('/admin'); // ログイン成功後に管理画面へリダイレクト
    } catch (error) {
      log('Google login error:', error); // ログ出力
    }
  };

  // 新規登録処理を追加
  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // 新規登録成功時にメール認証を送信
      await sendEmailVerification(userCredential.user);
      log('User signed up and email verification sent:', newEmail); // ログ出力
      // メール認証送信後、管理画面へリダイレクト
      router.push('/admin'); // 新規登録成功後に管理画面へリダイレクト
    } catch (error) {
      log('Sign up error:', error); // ログ出力
    }
  };

  return (
    <div>
      <h1>ログイン情報を入力してください</h1>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLoginWithEmail}>メールでログイン</button>
      <div>
        <button onClick={handleLoginWithGoogle}>Googleアカウントでログイン</button>
      </div>
      {/* 新規登録ボタンを追加 */}
      <div>
      <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />{/* 新しいstateを使用 */}
      <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />{/* 新しいstateを使用 */}
      <button onClick={handleSignUp}>新規登録</button>
      </div>
      <button onClick={() => router.push('/')}>TOPへ戻る</button>
    </div>
  );
};

export default LoginPage;