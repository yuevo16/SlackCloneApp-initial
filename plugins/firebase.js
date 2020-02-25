// firebase全般の機能を利用するために必要
import firebase from 'firebase/app'
//ログイン機能を使うために必要
import 'firebase/auth'
//データベース機能を使うために読み込み
import 'firebase/firestore'

//自分の環境を利用できるようにするためのapikeyなどを読み込ませている
if (!firebase.apps.length) {
 const config = {
   apiKey: "AIzaSyBpTa4Xq6UV_OQI4Tarz_KqnJmz8VBl1NY",
   authDomain: "slack-clone-app-8cf1e.firebaseapp.com",
   databaseURL: "https://slack-clone-app-8cf1e.firebaseio.com",
   projectId: "slack-clone-app-8cf1e",
   storageBucket: "slack-clone-app-8cf1e.appspot.com",
   messagingSenderId: "257520059391"
 }
 firebase.initializeApp(config)
}

//データベースを定義
const db = firebase.firestore()
export {
 firebase,
 db
}