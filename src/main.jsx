import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// /test is an intentional full-fidelity mirror of the main application.
// Keeping both paths on the same component guarantees that design, data,
// controls, persistence, pagination, and printing remain exactly identical.
const pages = {
  '/': App,
  '/test': App,
}
const Page = pages[window.location.pathname] ?? App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
