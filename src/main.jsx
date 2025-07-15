import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Contextshare from './context/Contextshare.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Contextshare>
        <GoogleOAuthProvider clientId='259971058017-l7g9129itdjrrekevna720ldtc1i4btf.apps.googleusercontent.com'><App /></GoogleOAuthProvider>
      </Contextshare>
    </BrowserRouter>
  </StrictMode>,
)
