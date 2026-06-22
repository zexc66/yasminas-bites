import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app'
import { getAuth, Auth } from 'firebase/auth'
import { getFirestore, Firestore } from 'firebase/firestore'

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY

// Only initialize Firebase when a real API key is present.
// During Vercel build (SSR prerender) placeholder keys would throw.
const isConfigured = apiKey && !apiKey.startsWith('your_')

let app: FirebaseApp | null = null
let auth: Auth
let db: Firestore

if (isConfigured) {
  const firebaseConfig = {
    apiKey,
    authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  }
  app = getApps().length ? getApp() : initializeApp(firebaseConfig)
  auth = getAuth(app)
  db   = getFirestore(app)
} else {
  // Stub exports so the rest of the codebase can import without crashing.
  // Auth-dependent features will simply be unavailable until env vars are set.
  auth = null as unknown as Auth
  db   = null as unknown as Firestore
}

export { auth, db }
