import React from 'react'
import App from './App'
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { createRoot } from 'react-dom/client'

const container = document.getElementById('root')!
const root = createRoot(container)

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
)
