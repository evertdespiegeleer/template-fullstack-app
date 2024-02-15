import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css'

import './config.js'
import './apiclient.config.js'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
