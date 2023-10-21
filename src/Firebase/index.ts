import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import {
  REACT_APP_APPID,
  REACT_APP_AUTHDOM,
  REACT_APP_FAPIKEY,
  REACT_APP_MID,
  REACT_APP_MSID,
  REACT_APP_PROJECTID,
  REACT_APP_SB,
} from "../utils/constants/env";

const firebaseConfig = {
  apiKey: REACT_APP_FAPIKEY,
  authDomain: REACT_APP_AUTHDOM,
  projectId: REACT_APP_PROJECTID,
  storageBucket: REACT_APP_SB,
  messagingSenderId: REACT_APP_MSID,
  appId: REACT_APP_APPID,
  measurementId: REACT_APP_MID,
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export { firebaseApp, firebase as default };
