import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB8tj9LmjimhOZs7ZVRGtFwe-Lm6gNYh4M',
  authDomain: 'adam-swimcoach-9bc66.firebaseapp.com',
  projectId: 'adam-swimcoach-9bc66',
  storageBucket: 'adam-swimcoach-9bc66.appspot.com',
  messagingSenderId: '581254447452',
  appId: '1:581254447452:web:2abf2d6f3f3db3e2238199',
  measurementId: 'G-M0TS845KXG'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const firestoreDatabase = getFirestore(app)

export default firestoreDatabase
