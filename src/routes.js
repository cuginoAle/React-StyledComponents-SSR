import Home from './pages/Home.jsx'
import P404 from './pages/p404.jsx'

export default [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/it',
    component: Home,
    exact: true
  },
  {
    path: '/en',
    component: Home,
    exact: true
  },
  {
    path: '/de',
    component: Home,
    exact: true
  },
  {
    path: '/es',
    component: Home,
    exact: true
  },
  {
    path: '*',
    component: P404
  }
]
