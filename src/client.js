import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import AppWrapper from './app.jsx'

const jsx = (
  <Router>
    <AppWrapper />
  </Router>
)

const app = document.getElementById('app')
ReactDOM.hydrate(jsx, app)
