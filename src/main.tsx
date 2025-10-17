import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { IdleDefense } from './components/IdleDefense.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IdleDefense />
  </StrictMode>,
)
