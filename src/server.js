import express from 'express'
import path from 'path'

import React from 'react'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import AppWrapper from './app.jsx'
import routes from './routes.js'

const app = express()
const sheet = new ServerStyleSheet()

app.use(express.static(path.resolve(__dirname, '../dist')))

app.get('/*', (req, res) => {
  const route = routes.filter(route => matchPath(req.url, route)) // filter matching paths

  const dataRequirements = route.map(route => route.component) // map to components
    .filter(comp => comp.dataFetch) // check if components have data requirement
    .map(comp => comp.dataFetch().then(data => {
      return {
        [comp.name]: data
      }
    })) // dispatch data requirement

  Promise.all(dataRequirements).then((data) => {
    const jsx = (
      <StaticRouter context={{ fetched: data }} location={req.url}>
        <StyleSheetManager sheet={sheet.instance}>
          <AppWrapper />
        </StyleSheetManager>
      </StaticRouter>
    )

    const reactDom = renderToString(jsx)
    const styleTags = sheet.getStyleTags() // or sheet.getStyleElement();

    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(htmlTemplate(reactDom, styleTags, data))
  })
})

app.listen(3000)

function htmlTemplate (reactDom, styleTags, routeData) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>React SSR!</title>
      <link href="assets/base.css" rel="stylesheet" type="text/css"></link>
      ${styleTags}
    </head>
    
    <body>
      <div id="app">${reactDom}</div>
      <script>
      // WARNING: See the following for security issues around embedding JSON in HTML:
      // http://redux.js.org/recipes/ServerRendering.html#security-considerations
      window.__ROUTE_DATA__ = ${JSON.stringify(routeData).replace(
    /</g,
    '\\u003c'
  )}
      </script>      
      <script src="./app.bundle.js"></script>
    </body>
    </html>
  `
}
