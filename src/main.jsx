import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initMonitoring } from './lib/monitoring.js'

// Start error monitoring as early as possible. No-op unless VITE_SENTRY_DSN is
// set in a production build, so this is safe in dev and DSN-less deploys.
initMonitoring()

createRoot(document.getElementById('root')).render(
    <App />
)
