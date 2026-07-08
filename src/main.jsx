import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './state/cartContext.jsx'
import { LanguageProvider } from './state/languageContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

// Tu Client ID de Google Cloud Console
const GOOGLE_CLIENT_ID = "499813422554-jbtfi6rkfj5qvfl5cfpa6328j2si2jh5.apps.googleusercontent.com";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <LanguageProvider>
                <CartProvider>
                    <App />
                </CartProvider>
            </LanguageProvider>
        </GoogleOAuthProvider>
    </StrictMode>
)