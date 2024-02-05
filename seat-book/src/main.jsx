import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.jsx'
import './styles/index.css'
import {UserAuthContextProvider} from './context/UserAuthContext.jsx'
// import { Router } from 'react-router-dom'
// import {Provider} from 'react-redux'
// import store from './redux/app/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserAuthContextProvider>
    <App />
  </UserAuthContextProvider>
    
  
)
