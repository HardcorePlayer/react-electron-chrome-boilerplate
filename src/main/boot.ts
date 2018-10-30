/**
 * electron main script
 */

import { app } from 'electron'


/// code

let mainWindow = null

function main() {
  const createWindow = require('./').default

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    if (mainWindow === null) {
      mainWindow = createWindow(cleanup)
    }
  })

  app.on('ready', () => {
    mainWindow = createWindow(cleanup)
  })
}

function cleanup() {
  mainWindow = null
  app.quit()
  // app.exit(0)
}


/// run

if (module.hot) {
  module.hot.accept('./', () => {
    app.relaunch()
    cleanup()
    main()
  })
}

main()
