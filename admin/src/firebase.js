import firebase from "firebase";

const firebaseConfig = {

  apiKey: "AIzaSyAV1DbG9kaW8NH1ntAVcNkfZlElO-6pKs0",

  authDomain: "ottplatform-a1795.firebaseapp.com",

  projectId: "ottplatform-a1795",

  storageBucket: "ottplatform-a1795.appspot.com",

  messagingSenderId: "762863710430",

  appId: "1:762863710430:web:dfa2a29a2823be3700124f",

  measurementId: "G-NJM8B784BV"

};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
