import firebase from 'firebase/app';
import 'firebase/database';


const firebaseConfig = {
    apiKey: "AIzaSyDjYaj4383HFWG_y92RKW7F-PR-zbzze34",
    authDomain: "chatapp-bcb75.firebaseapp.com",
    databaseURL: "https://chatapp-bcb75-default-rtdb.firebaseio.com",
    projectId: "chatapp-bcb75",
    storageBucket: "chatapp-bcb75.appspot.com",
    messagingSenderId: "681062169087",
    appId: "1:681062169087:web:74b04cc842e47b13040fca",
    measurementId: "G-7SEB2M5JDZ"
};

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();
