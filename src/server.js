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
  // const context = {}

  const route = routes.filter(route => matchPath(req.url, route)) // filter matching paths

  const components = route.map(route => route.component) // map to components
  const componentsNeedingData = getComponentsWithDataFetch(components[0])

  // check if components have data requirement
  const dataRequirements = componentsNeedingData.map(comp => comp.dataFetch().then(data => {
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

function getComponentsWithDataFetch (C) {
  let needsData = []

  if (C && C.dataFetch) {
    console.log('adding ', C.name)
    needsData.push(C)
  }

  if (C) {
    try {
      var A = new C().render()
      needsData = needsData.concat(getChildrenWithDataFetch(A))
    } catch (error) {
      console.error(error)
    }
  }

  return needsData
}

function getChildrenWithDataFetch (C) {
  let needsData = []

  try {
    C.props.children.forEach(Item => {
      if (Item.type && Item.type.dataFetch) {
        needsData.push(Item.type)
      }

      needsData = needsData.concat(getChildrenWithDataFetch(Item))
    })
  } catch (error) {
    console.error(error)
  }

  return needsData
}
