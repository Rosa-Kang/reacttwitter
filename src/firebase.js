import * as firebase from 'firebase/app';

 const firebaseConfig = {
    apiKey: "AIzaSyCTZxBgqhsQ4Ge1mDFb28Ykaet9FEHK-uM",
    authDomain: "reacttwitter-be4ad.firebaseapp.com",
    projectId: "reacttwitter-be4ad",
    storageBucket: "reacttwitter-be4ad.appspot.com",
    messagingSenderId: "760113574330",
    appId: "1:760113574330:web:56d550a6a327baec826d83"
  };
  
  export default firebase.initializeApp(firebaseConfig);