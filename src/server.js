import express from 'express'
import path from 'path'

import React from 'react'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import AppWrapper from './app.jsx'
import routes from './routes.js'
import fs from 'fs'

const app = express()
const sheet = new ServerStyleSheet()

app.get('/*.js', function (req, res, next) {
  req.url = `${req.url}.gz`

  res.set('Content-Encoding', 'gzip')
  res.set('Content-Type', 'text/javascript')
  next()
})

app.get('/sitemap.xml', function (req, res, next) {
  res.set('Content-Type', 'text/xml')
  res.writeHead(200, { 'Content-Type': 'text/xml' })
  res.end(fs.readFileSync(path.resolve(__dirname, '../sitemap.xml')))
})

app.get('/robots.txt', function (req, res, next) {
  res.set('Content-Type', 'text/xml')
  res.writeHead(200, { 'Content-Type': 'text/xml' })
  const robot = `
  User-Agent: *
  Disallow: 
  Sitemap: https://www.santapi.es/sitemap.xml`
  res.end(robot)
})

app.use(express.static(path.resolve(__dirname, '../dist')))

app.get('/*', (req, res) => {
  // console.log(req.headers['accept-language'])

  // setting the default language here: url param || browser pref || en
  var lang = req.params[0] || req.acceptsLanguages('de', 'it', 'es', 'en') || 'en'
  const route = routes.filter(route => matchPath(req.url, route)) // filter matching paths

  const dataRequirements = route.map(route => route.component) // map to components
    .filter(comp => comp.dataFetch) // check if components have data requirement
    .map(comp => comp.dataFetch(lang).then(data => {
      return {
        [comp.name]: data
      }
    })) // dispatch data requirement

  Promise.all(dataRequirements).then((data) => {
    data.lang = lang
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
    res.end(htmlTemplate(reactDom, styleTags, data, lang))
  })
})

app.listen(3000)

function htmlTemplate (reactDom, styleTags, routeData, lang) {
  return `
    <!DOCTYPE html>
    <html lang='${lang}'>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Santa Pi</title>

      <meta name="description" content=" Santa Pi - italian restaurant in Sineu (Mallorca)" />
      <meta name="keywords" content="Santa Pi, pizza, pizzeria, restaurant, ristorante, italian, italiano, napoletana, Sineu, Mallorca, cucina tipica" />
      <meta name="google-site-verification" content="APEmdx-7C-wy8WkQCDIX1jebHb6ajaKgcan0h92lI10" />

      <link href="assets/base.css" rel="stylesheet" type="text/css"></link>
      <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png">
      <link rel="manifest" href="/assets/site.webmanifest">
      <link rel="mask-icon" href="/assets/safari-pinned-tab.svg" color="#5bbad5">
      <link rel="shortcut icon" href="/assets/favicon.ico">
      <meta name="msapplication-TileColor" content="#da532c">
      <meta name="msapplication-config" content="/assets/browserconfig.xml">
      <meta name="theme-color" content="#000000">      
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

      <!-- Global site tag (gtag.js) - Google Analytics -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-130562434-1"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', 'UA-130562434-1');
      </script>
      
    </body>
    </html>
  `
}
