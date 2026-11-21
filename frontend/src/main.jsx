// main.jsx is where React starts.
// It finds <div id="root"> in index.html and puts our App inside it.
// You usually never need to change this file.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
