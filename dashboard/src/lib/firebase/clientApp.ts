
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, browserLocalPersistence, setPersistence, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import {
  PUBLIC_FB_API_KEY,
  PUBLIC_FB_AUTH_DOMAIN,
  PUBLIC_FB_PROJECT_ID,
  PUBLIC_FB_STORAGE_BUCKET,
  PUBLIC_FB_MESSAGING_SENDER_ID,
  PUBLIC_FB_APP_ID
} from "$env/static/public";

const firebaseConfig = {
  apiKey: PUBLIC_FB_API_KEY,
  authDomain: PUBLIC_FB_AUTH_DOMAIN,
  projectId: PUBLIC_FB_PROJECT_ID,
  storageBucket: PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: PUBLIC_FB_MESSAGING_SENDER_ID,
  appId: PUBLIC_FB_APP_ID
};

export const app = initializeApp(firebaseConfig);

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