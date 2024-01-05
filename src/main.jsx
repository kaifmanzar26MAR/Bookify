import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { FirebaseProvider } from './Context/Firebase'
import {BrowserRouter} from 'react-router-dom'
ReactDOM.createRoot(document.getElementById('root')).render(
  <FirebaseProvider>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </FirebaseProvider>
)
