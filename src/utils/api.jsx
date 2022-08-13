import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBb9RE_wfZtN1TggXe2o67-IMrO2VVHEsU",
  authDomain: "appdistribuidas-f6b1b.firebaseapp.com",
  projectId: "appdistribuidas-f6b1b",
  storageBucket: "appdistribuidas-f6b1b.appspot.com",
  messagingSenderId: "189877559264",
  appId: "1:189877559264:web:f4f1dcc5a2b14e33b65585"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
