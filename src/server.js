import express from 'express'
import path from 'path'

import React from 'react'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import AppWrapper from './app.jsx'

const app = express()
const sheet = new ServerStyleSheet()

app.use(express.static(path.resolve(__dirname, '../dist')))

app.get('/*', (req, res) => {
  const context = {}
  const jsx = (
    <StaticRouter context={context} location={req.url}>
      <StyleSheetManager sheet={sheet.instance}>
        <AppWrapper />
      </StyleSheetManager>
    </StaticRouter>
  )
  const reactDom = renderToString(jsx)
  const styleTags = sheet.getStyleTags() // or sheet.getStyleElement();

  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end(htmlTemplate(reactDom, styleTags))
})

app.listen(3000)

function htmlTemplate (reactDom, styleTags) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>React SSR!</title>
      ${styleTags}
    </head>
    
    <body>
      <div id="app">${reactDom}</div>
      <script src="./app.bundle.js"></script>
    </body>
    </html>
  `
}
