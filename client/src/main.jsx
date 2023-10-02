import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/AuthProvider.jsx'
import PacientesProvider from './context/PacientesProvider.jsx'

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <App />
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);