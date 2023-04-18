
import { dev } from "$app/environment";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, browserLocalPersistence, setPersistence, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

let API_KEY: string;
let AUTH_DOMAIN: string;
let PROJECT_ID: string;
let STORAGE_BUCKET: string;
let MESSAGING_SENDER_ID: string;
let APP_ID: string;
if (dev) {
  const {
    PUBLIC_FB_API_KEY,
    PUBLIC_FB_AUTH_DOMAIN,
    PUBLIC_FB_PROJECT_ID,
    PUBLIC_FB_STORAGE_BUCKET,
    PUBLIC_FB_MESSAGING_SENDER_ID,
    PUBLIC_FB_APP_ID
  } = await import("$env/static/public");
  API_KEY = PUBLIC_FB_API_KEY;
  AUTH_DOMAIN = PUBLIC_FB_AUTH_DOMAIN;
  PROJECT_ID = PUBLIC_FB_PROJECT_ID;
  STORAGE_BUCKET = PUBLIC_FB_STORAGE_BUCKET;
  MESSAGING_SENDER_ID = PUBLIC_FB_MESSAGING_SENDER_ID;
  APP_ID = PUBLIC_FB_APP_ID;
} 
  else {
    API_KEY = `${process.env.APIKEY}`;
    AUTH_DOMAIN = `${process.env.AUTHDOMAIN}`;
    PROJECT_ID = `${process.env.PROJECTID}`;
    STORAGE_BUCKET = `${process.env.STORAGEBUCKET}`;
    MESSAGING_SENDER_ID = `${process.env.MESSAGINGSENDERID}`;
    APP_ID = `${process.env.APPID}`;
}

// ------------------------------------------------------------

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);

export const signUp = async (name: string, email: string, password: string) => {
  setPersistence(auth, browserLocalPersistence);
  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
    })
    .catch((error) => {
      console.log(error.message)
    });
};

export const logOut = () => {
  signOut(auth)
    .then(() => {})
    .catch((error) => console.log(error.message));
}