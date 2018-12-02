import React from 'react'
import 'babel-polyfill'
import {
  // Link,
  Switch,
  Route } from 'react-router-dom'
import routes from './routes'

export default (props) => {
  return (
    <div>
      {/* <div>
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
        <Link to='/contact'>Contact</Link>
      </div> */}
      <Switch>
        { routes.map((routeProp) => {
          const Component = routeProp.component
          // return (<Route key={routeProp.path} {...routeProp} />)
          return (<Route key={routeProp.path} {...routeProp} component={(c) => {
            return <Component {...c} clientData={props.clientData} />
          }} />)
        }) }
      </Switch>
    </div>
  )
}
