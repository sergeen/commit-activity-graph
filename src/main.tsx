import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CommitActivityContextProvider } from './CommitActivityContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CommitActivityContextProvider>
      <App />
    </CommitActivityContextProvider>
  </StrictMode>,
)
