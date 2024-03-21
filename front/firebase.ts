// firebase.ts
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import firebaseConfig from './firebaseConfig';// Firebaseプロジェクトの設定


// Firebaseアプリの初期化
const app = initializeApp(firebaseConfig);
// 認証サービスのインスタンスを取得
const auth = getAuth(app);
// Google認証プロバイダのインスタンスを作成
const googleAuthProvider = new GoogleAuthProvider();

const analytics = getAnalytics(app);

// 必要に応じて他のFirebaseサービスのインスタンスをここに追加

// 使用するサービスをエクスポート
export { auth };
