import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import AppWrapper from './app.jsx'

const Jsx = (props) => {
  const routeData = window.__ROUTE_DATA__

  return (
    <Router>
      <AppWrapper clientData={routeData} />
    </Router>
  )
}

const app = document.getElementById('app')
ReactDOM.hydrate(<Jsx />, app)
