import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const env = import.meta.env;
const hasKeys = !!env.VITE_FIREBASE_API_KEY && env.VITE_FIREBASE_API_KEY !== 'undefined';

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || "mock-key",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID || "glasstech-mock",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID
};

let app, auth, db, storage, isFirebaseEnabled = false;

try {
  if (hasKeys) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    isFirebaseEnabled = true;
  } else {
    // Return null so consumers can guard explicitly
    app = null; auth = null; db = null; storage = null;
  }
} catch (e) {
  console.warn("Firebase initialization failed:", e);
  app = null; auth = null; db = null; storage = null;
}

export { auth, db, storage, isFirebaseEnabled };

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadFile = async (bucket, path, file) => {
  const fileToBase64 = (f) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(f);
  });

  if (!storage) {
    return await fileToBase64(file);
  }
  
  try {
    const storageRef = ref(storage, `${bucket}/${path}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.warn("Firebase upload failed (likely due to mock credentials). Falling back to local data encoding.", error);
    return await fileToBase64(file);
  }
};
