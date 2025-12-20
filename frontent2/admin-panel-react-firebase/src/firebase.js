// Import Firebase SDK modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getMessaging } from "firebase/messaging";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAp32x4fIiIqDVABASi4wO-VFT7ED1nPmg",
  authDomain: "coc-hackathon.appspot.com",
  projectId: "coc-hackathon",
  storageBucket: "coc-hackathon.firebasestorage.app",
  messagingSenderId: "884696519488",
  appId: "1:884696519488:web:4d859317252e1f4d48a0a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export all required Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// export const messaging = getMessaging(app);

// Default export
export default app;
