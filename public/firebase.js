import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCI2M-U0IANIzfidTnhgWxtFH1pSSc865k",
  authDomain: "keyper-bookmarks.firebaseapp.com",
  databaseURL: "https://keyper-bookmarks.firebaseio.com",
  projectId: "keyper-bookmarks",
  storageBucket: "keyper-bookmarks.appspot.com",
  messagingSenderId: "948013461969",
  appId: "1:948013461969:web:7eb9ab0e0053a87b25b0f0",
  measurementId: "G-BCCLX6BC6Q",
};

firebase.initializeApp(config);

export default firebase;
