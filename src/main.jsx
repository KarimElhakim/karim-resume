import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './utils/performanceTest' // Initialize performance testing
import { componentCoordinator } from './utils/componentCoordinator'

// Expose coordinator to window for debugging
if (typeof window !== 'undefined') {
  window.componentCoordinator = componentCoordinator;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
