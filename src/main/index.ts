/**
 * electron main script
 */

import * as path from 'path'
import { BrowserWindow } from 'electron'


/// code

function createWindow(clearContext) {
  const window = new BrowserWindow({
    height: 480,
    width: 320,
    frame: false,
    titleBarStyle: 'hidden'
  })

  if('production' !== process.env.NODE_ENV) {
    window.webContents.openDevTools()
  }

  window.loadURL(
    'production' !== process.env.NODE_ENV
      ? 'http://localhost:8080'
      : path.resolve('./scaffold/build/index.html')
  )

  window.on('closed', () => {
    clearContext && clearContext()
  })

  window.webContents.on('devtools-opened', () => {
    window.focus()
    setImmediate(() => {
      window.focus()
    })
  })

  return window
}


/// export

export default createWindow
