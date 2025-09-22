import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.tsx'
import { ThemeProvider } from "./contexts/theme-provider.tsx"
import { MessagesProvider } from "./contexts/messages-provider.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <MessagesProvider>
        <App />
      </MessagesProvider>
    </ThemeProvider>
  </StrictMode>,
)
