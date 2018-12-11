import Home from './pages/Home.jsx'
// import About from './pages/About.jsx'
// import Contact from './pages/Contact.jsx'
// import P404 from './pages/p404.jsx'

export default [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/:lang',
    component: Home
  }
  // {
  //   path: '/about',
  //   component: About,
  //   exact: true
  // },
  // {
  //   path: '/contact',
  //   component: Contact,
  //   exact: true
  // },
  // {
  //   component: P404
  // }
]
