const { app, BrowserWindow, dialog } = require('electron')

app.on('window-all-closed', () => {
  console.log('window-all-closed')
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// quit events
app.on('before-quit', () => console.log('before-quit'))
app.on('will-quit', () => console.log('will-quit'))
app.on('quit', () => console.log('quit'))

app.on('ready', () => {
  for (let i = 0; i < 2; i++) {
    let win = new BrowserWindow()

    win.on('close', (e) => {
      e.preventDefault()

      dialog.showMessageBox(win, {
        buttons: ['Yes', 'No'],
        message: 'Are you sure?',
      }, (ret) => {
        if (ret === 0) win.destroy()
      })
    })

    win.on('closed', () => console.log('window closed'))
  }
})
