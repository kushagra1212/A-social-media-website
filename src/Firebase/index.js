import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FAPIKEY,
  authDomain: process.env.REACT_APP_AUTHDOM,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_SB,
  messagingSenderId: process.env.REACT_APP_MSID,
  appId:  process.env.REACT_APP_APPID,
  measurementId:  process.env.REACT_APP_MID
};

// Initialize Firebase
const  firebaseApp=firebase.initializeApp(firebaseConfig);


export {  firebaseApp,firebase as default };