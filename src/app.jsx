import React from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import routes from './routes'

export default (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <div>
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
        <Link to='/contact'>Contact</Link>
      </div>
      <Switch>
        { routes.map(({ path, exact, component: Component }) => {
          return <Route key={path} path={path} exact={exact} render={() => <Component data={props.data} />} />
        }) }
      </Switch>
    </div>
  )
}
