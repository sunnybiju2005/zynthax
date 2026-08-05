import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDKjjQZLL-H9uvoNWXYguQpQgmXD5lZQ2M",
  authDomain: "zynthax-digital-solutions.firebaseapp.com",
  projectId: "zynthax-digital-solutions",
  storageBucket: "zynthax-digital-solutions.firebasestorage.app",
  messagingSenderId: "209277785818",
  appId: "1:209277785818:web:627dd5ceb3eab81df277e3",
  measurementId: "G-S4SLTDZZJZ"
};

// Initialize Firebase safely (works in both client & server/SSR contexts)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

// Analytics is browser-only — guard against SSR / Node environments
let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, db, analytics };
