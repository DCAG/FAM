import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'

import { AuthProvider } from "./utils/AuthContext";
import ProtectedRoutes from './utils/ProtectedRoutes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <ProtectedRoutes>
        <App />
      </ProtectedRoutes>
    </AuthProvider>
  </BrowserRouter>,
)
