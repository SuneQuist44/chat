import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB5Hb2-BSQ2ntknLNxxcHEyG5kV5Z926lo",
    authDomain: "chat-8ab51.firebaseapp.com",
    databaseURL: "https://chat-8ab51.firebaseio.com",
    projectId: "chat-8ab51",
    storageBucket: "chat-8ab51.appspot.com",
    messagingSenderId: "138299176646",
    appId: "1:138299176646:web:65376f98fa90ca562789c7"
};

const fire = firebase.initializeApp(firebaseConfig);

const auth = fire.auth();
const db = firebase.firestore();

export { auth, db };