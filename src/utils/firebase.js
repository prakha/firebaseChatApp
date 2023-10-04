import firebase from 'firebase/app';
import 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB72ZoqLcPCS46ds_f3U9vCd4HFd4nWMvg",
  authDomain: "chat-app-2-266f1.firebaseapp.com",
  projectId: "chat-app-2-266f1",
  storageBucket: "chat-app-2-266f1.appspot.com",
  messagingSenderId: "372890410955",
  appId: "1:372890410955:web:0d651bab0c80165c58204e",
  measurementId: "G-C54YJTL877"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebaseApp.database();

export { database };

