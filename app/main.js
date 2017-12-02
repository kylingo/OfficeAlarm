const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
//noinspection JSAnnotator
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// 自定义菜单
const Menu = electron.Menu
let template = [{
    label: '编辑',
    submenu: [{
        label: '撤销',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
    }, {
        label: '重做',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo'
    }]
}]
// app.on('ready', function () {
//     const customMenu = Menu.buildFromTemplate(template)
//     Menu.setApplicationMenu(customMenu)
// })

// 上下文菜单
const MenuItem = electron.MenuItem
const ipc = electron.ipcMain
const menu = new Menu()
menu.append(new MenuItem({label:'Menu1'}))
menu.append(new MenuItem({type: 'separator'}))
menu.append(new MenuItem({label: 'Menu2'}))
menu.append(new MenuItem({label: 'Menu3', type: 'checkbox', checked: true}))

app.on('browser-window-created', function (event, win) {
    win.webContents.on('context-menu', function (e, params) {
        menu.popup(win, params.x, params.y)
    })
})
ipc.on('show-context-menu', function (event) {
    const win = BrowserWindow.fromWebContents(event.sender)
    menu.popup(win)
})