var chokidar = require('chokidar')
const { exec } = require('child_process')

chokidar
  .watch([
    'dist/app.bundle.js'
  ], {
    ignoreInitial: true
  })
  .on('all', (event, path) => {
    console.log(event, path)
    exec(`gzip -f < dist/app.bundle.js > dist/app.bundle.js.gz`)
  })
