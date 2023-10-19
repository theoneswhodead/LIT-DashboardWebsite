import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.tsx'
import { DiscordAuthContextProvider } from './context/DiscordAuthContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <DiscordAuthContextProvider>
        <App />
      </DiscordAuthContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
