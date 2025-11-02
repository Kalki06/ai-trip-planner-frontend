import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
// ⚠️ REPLACE THESE WITH YOUR ACTUAL VALUES FROM api-keys.txt
const firebaseConfig = {
  apiKey: "AIzaSyDhWcnQnE2spMqQTTnrJwBQi8695FFIsvw",
  authDomain: "ai-trip-planner-186d6.firebaseapp.com",
  projectId: "ai-trip-planner-186d6",
  storageBucket: "ai-trip-planner-186d6.firebasestorage.app",
  messagingSenderId: "1050561172191",
  appId: "1:1050561172191:web:81c5a031610fc362a08f6a"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore Database
export const db = getFirestore(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);